var userGroups
var users = [
    {
      sAMAccountName: 'taytay',
      cn: 'Taylor Swift'
    },
    {
      sAMAccountName: 'agrant',
      cn: 'Alex Grant'
    }
]
var userByName = { 'taytay': users[0], 'agrant': users[1] }

module.exports = function (config) {
  userGroups = config.mockUserToGroup

  return {
    getUserGroups: (username, callback) => callback(null, [userGroups[username]]),
    getAllUsers: callback => callback(null, users),
    getUserEmail: (username, callback) => callback(null, 'developers@mediasuite.co.nz'),
    getUserName: (id, callback) => callback(null, usersByName[id])
  }
}
