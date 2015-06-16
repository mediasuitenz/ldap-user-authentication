var userGroups;

module.exports = function (config) {
  userGroups = config.mockUserToGroup;

  return {
    getUserGroups: mockGetUserGroups
  }
}

function mockGetUserGroups(username, callback) {
  callback(null, [userGroups[username]])
}
