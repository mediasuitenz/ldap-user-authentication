'use strict';

var ldap;
var app;
var ldapConfig;

function getUserInfo(req, res, next) {
  var username;
  if (ldapConfig.mock)
    username = ldapConfig.mockUsername;
  else
    username = req.headers['x-iisnode-auth_user'].split('\\')[1];

  ldap.getUserGroups(username, function (err, groups) {

    if (err)
      return next(err);

    if (!groups[0])
      return next(new Error(
        username + ' has not been given access to this app'
      ));

    app.set('user', {
      name: username,
      group: groups[0]
    });

    next();
  });
}

module.exports = function (expressApp, config) {
  if (!config)
    console.error('\nldapconfig.json is missing! Please copy ldapconfig-example.json in to your server/ directory and make the appropriate changes.');
  app = expressApp;
  ldapConfig = config;
  var ldapLibrary = ldapConfig.mock ?
    require('./ldap.development') :
    require('./ldap.production');
  ldap = ldapLibrary(ldapConfig);

  return {
    getUserInfo: getUserInfo
  };
};
