'use strict';


var webservices = require('./webservices');


function login() {
  return webservices.login().then((res) => {
    if (res.login === 'ok') {
      sessionStorage.loggedInUsername = res.userName;
      global.authEvents.emit('loggedIn');
      return true;
    } else {
      logout();
      return false;
    }
  });
}


function logout() {
  return webservices.logout().then((res) => {
    delete sessionStorage.loggedInUsername;
    global.authEvents.emit('loggedOut');
  });
}


module.exports = {login, logout};
