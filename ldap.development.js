var userGroups;

module.exports = function (config) {
  userGroups = config.mockUserToGroup;

  return {
    getUserGroups: mockGetUserGroups,
    getAllUsers: mockGetAllUsers,
    getUserEmail: mockGetUserEmail,
    getUser: mockGetUser,
    getUsersForGroup: mockGetUsersForGroup,
    getAllManagers: mockGetAllManagers
  }
}

function mockGetUserGroups(username, callback) {
  callback(null, [userGroups[username]])
}

var users = {
  administrators: [
    {
      sAMAccountName: 'taytay',
      cn: 'Taylor Swift'
    },
    {
      sAMAccountName: 'verminsupreme',
      cn: 'Vermin Love Supreme'
    }
  ],
  officers: [
    {
      sAMAccountName: 'agrant',
      cn: 'Alex Grant'
    },
    {
      sAMAccountName: 'hightower',
      cn: 'High Tower'
    }
  ],
  managers: [
    {
      sAMAccountName: 'bambam',
      cn: 'Robert Smith'
    },
    {
      sAMAccountName: 'leroy',
      cn: 'Leroy Jenkins'
    },
    {
      sAMAccountName: 'drseuss',
      cn: 'Dr Seuss'
    },
    {
      sAMAccountName: 'hillaryclinton',
      cn: 'Hillary Clinton'
    }
  ]
}

var allUsers = users.administrators.concat(users.officers, users.managers)

function mockGetAllUsers(callback) {
  callback(null, allUsers)
}

function mockGetUserEmail(username, callback) {
  callback(null, 'developers@mediasuite.co.nz')
}

var usersByName = allUsers.reduce(function (current, user) {
  current[user.sAMAccountName] = user
  return current
}, {})

function mockGetUser(id, callback) {
  callback(null, usersByName[id])
}

function mockGetUsersForGroup(group, callback) {
  callback(null, users[group])
}

function mockGetAllManagers(callback) {
  callback(null, users.managers)
}
