var ActiveDirectory = require('activedirectory')

var ad
var groupNames
var allUserGroup

function getGroupNames(config) {
  return Object.keys(config.roles).map(function (key) {
    return config.roles[key];
  })
}

module.exports = function (ldapConfig) {
  groupNames = getGroupNames(ldapConfig)
  allUserGroup = ldapConfig.allUserGroup
  ad = new ActiveDirectory(ldapConfig)

  return {
    getUserGroups: getUserGroups,
    getAllUsers: getAllUsers,
    getUserEmail: getUserEmail
  }
}

/**
 * Gets all groups for a user filtered down to the roles in ldapconfig.json
 * @param  {string}   username sAMAccountName, eg: jamestaylor
 * @param  {Function} callback Node style callback (err, data)
 * @return {[string]} a list of group names, eg: 'developers'
 */
function getUserGroups(username, callback) {
  ad.getGroupMembershipForUser({ attributes: ['cn'] }, username, function(err, groups) {
    if (!groups)
      groups = []
    callback(err, groups
      .reduce(function(prev, group) { return prev.concat(group['cn']) }, [])
      .filter(function(groupName) {
        for (var i = 0; i < groupNames.length; i++) {
          if (groupNames[i] === groupName)
            return true
        }
        return false
      }))
  })
}

function getUserEmail(username, callback) {
  ad.findUser({attributes: 'mail'}, username, callback)
}

function getAllUsers(callback) {
  ad.getUsersForGroup({ attributes: ['cn', 'sAMAccountName'] }, allUserGroup, remapUsers)

  function remapUsers(err, data) {
    callback(err, data.map(function (user) {
      return { id: user.sAMAccountName, name: user.cn }
    }))
  }
}
