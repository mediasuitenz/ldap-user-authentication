var ActiveDirectory = require('activedirectory')

var ad
var groupNames
var allUserGroup
var managerGroup

function getGroupNames (config) {
  return Object.keys(config.roles).map(function (key) {
    return config.roles[key]
  })
}

module.exports = function (ldapConfig) {
  groupNames = getGroupNames(ldapConfig)
  allUserGroup = ldapConfig.allUserGroup
  managerGroup = ldapConfig.roles.MANAGER
  ad = new ActiveDirectory(ldapConfig)

  return {
    getUserGroups: getUserGroups,
    getAllUsers: function (callback) { ad.getUsersForGroup(allUserGroup, callback) },
    getUserEmail: getUserEmail,
    getUser: function (username, callback) { ad.findUser(username, callback) },
    getAllManagers: function (callback) { ad.getUsersForGroup(managerGroup, callback) },
    getUsersForGroup: function (group, callback) { ad.getUsersForGroup(group, callback) },
    findUsers: function (query, callback) { ad.findUsers(query, true, callback) }
  }
}

/**
 * Gets all groups for a user filtered down to the roles in ldapconfig.json
 * @param  {string}   username sAMAccountName, eg: jamestaylor
 * @param  {Function} callback Node style callback (err, data)
 * @return {[string]} a list of group names, eg: 'developers'
 */
function getUserGroups (username, callback) {
  ad.getGroupMembershipForUser({ attributes: ['cn'] }, username, function (err, groups) {
    if (!groups) {
      groups = []
    }
    callback(err, groups
      .reduce(function (prev, group) { return prev.concat(group['cn']) }, [])
      .filter(function (groupName) {
        for (var i = 0; i < groupNames.length; i++) {
          if (groupNames[i] === groupName) return true
        }
        return false
      }))
  })
}

function getUserEmail (username, callback) {
  ad.findUser(username, function (error, data) {
    callback(error, data ? data['mail'] : null)
  })
}
