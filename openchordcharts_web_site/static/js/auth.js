'use strict';


var webservices = require('./webservices');


function forgetCredentials() {
  delete sessionStorage.loggedInUsername;
  global.authEvents.emit('loggedOut');
}


function login() {
  return webservices.login().then((res) => {
    if (res.login === 'ok') {
      sessionStorage.loggedInUsername = res.username;
      global.authEvents.emit('loggedIn');
      return true;
    } else {
      forgetCredentials();
      return false;
    }
  });
}


function logout() {
  // TODO simplify promises construct
  return webservices.logout().catch(() => {
    forgetCredentials();
  }).then(() => {
    forgetCredentials();
  });
}


module.exports = {login, logout};
