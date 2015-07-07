var userGroups;

module.exports = function (config) {
  userGroups = config.mockUserToGroup;

  return {
    getUserGroups: mockGetUserGroups,
    getAllUsers: mockGetAllUsers,
    getUserEmail: mockGetUserEmail
  }
}

function mockGetUserGroups(username, callback) {
  callback(null, [userGroups[username]])
}

function mockGetAllUsers(callback) {
  callback(null, [
      {
        id: 'taytay',
        name: 'Taylor Swift'
      },
      {
        id: 'agrant',
        name: 'Alex Grant'
      }
    ])
}

function mockGetUserEmail(username, callback) {
  callback(null, 'developers@mediasuite.co.nz')
}
