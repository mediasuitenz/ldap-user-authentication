var userGroups;

module.exports = function (config) {
  userGroups = config.mockUserToGroup;

  return {
    getUserGroups: mockGetUserGroups,
    getAllUsers: mockGetAllUsers
  }
}

function mockGetUserGroups(username, callback) {
  callback(null, [userGroups[username]])
}

function mockGetAllUsers(callback) {
  callback(null, [
      {
        id: 'jtaylor',
        name: 'James Taylor'
      },
      {
        id: 'agrant',
        name: 'Alex Grant'
      }
    ])
}
