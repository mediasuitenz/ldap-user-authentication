var userGroups;

module.exports = function (config) {
  userGroups = config.mockUserToGroup;

  return {
    getUserGroups: mockGetUserGroups,
    getAllUsers: mockGetAllUsers,
    getUserEmail: mockGetUserEmail,
    getUser: mockGetUser
  }
}

function mockGetUserGroups(username, callback) {
  callback(null, [userGroups[username]])
}

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

function mockGetAllUsers(callback) {
  callback(null, users)
}

function mockGetUserEmail(username, callback) {
  callback(null, 'developers@mediasuite.co.nz')
}

var usersByName = { 'taytay': users[0], 'agrant': users[1] }

function mockGetUser(id, callback) {
  callback(null, usersByName[id])
}
