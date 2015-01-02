'use strict';


var webservices = require('./webservices');


function login(username, password, remember) {
  return webservices.login(username, password).then((res) => {
    if (res.login === 'ok') {
      if (remember) {
        localStorage.loggedIn = true;
      }
      global.authEvents.emit('loggedIn');
      return true;
    } else {
      logout();
      return false;
    }
  });
}


function logout() {
  delete localStorage.loggedIn;
  global.authEvents.emit('loggedOut');
}


module.exports = {login, logout};
