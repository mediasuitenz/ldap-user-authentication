var ActiveDirectory = require('activedirectory')

var ad
var groupNames

function getGroupNames(config) {
  return Object.key(config.roles).map(function (key) {
    return config.roles[key];
  })
}

module.exports = function (ldapConfig) {
  groupNames = getGroupNames(ldapConfig)
  ad = new ActiveDirectory(ldapConfig)

  return {
    getUserGroups: getUserGroups
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
    if (err)
      return callback(err)

    if (!groups)
      return callback(null, [])

    callback(null, groups
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
