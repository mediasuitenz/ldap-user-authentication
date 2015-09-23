var userGroups;

module.exports = function (config) {
  userGroups = config.mockUserToGroup;

  return {
    getUserGroups: mockGetUserGroups,
    getAllUsers: mockGetAllUsers,
    getUserEmail: mockGetUserEmail,
    getUser: mockGetUser,
    getUsersForGroup: mockGetUsersForGroup
  }
}

function mockGetUserGroups(username, callback) {
  callback(null, [userGroups[username]])
}

var users = [
    {
      sAMAccountName: 'taytay',
      cn: 'Taylor Swift',
      group: 'ADMIN'
    },
    {
      sAMAccountName: 'agrant',
      cn: 'Alex Grant',
      group: 'OFFICER'
    },
    {
      sAMAccountName: 'bambam',
      cn: 'Robert Smith',
      group: 'MANAGER'
    },
    {
      sAMAccountName: 'leroy',
      cn: 'Leroy Jenkins',
      group: 'MANAGER'
    },
    {
      sAMAccountName: 'drseuss',
      cn: 'Dr Seuss',
      group: 'MANAGER'
    },
    {
      sAMAccountName: 'hillaryclinton',
      cn: 'Hillary Clinton',
      group: 'MANAGER'
    },
    {
      sAMAccountName: 'verminsupreme',
      cn: 'Vermin Love Supreme',
      group: 'PRESIDENT'
    }
]

function mockGetAllUsers(callback) {
  callback(null, users)
}

function mockGetUserEmail(username, callback) {
  callback(null, 'developers@mediasuite.co.nz')
}

var usersByName = {
  taytay: users[0],
  agrant: users[1],
  bambam: users[2],
  leroy: users[3],
  drseuss: users[4],
  hillaryclinton: users[5],
  verminsupreme: users[6]
}

function mockGetUser(id, callback) {
  callback(null, usersByName[id])
}

function mockGetUsersForGroup(group, callback) {
  callback(null, users.filter(function(user) { return user.group === group }))
}
