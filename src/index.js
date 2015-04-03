/*
Open Chord Charts -- Database of free chord charts
By: Christophe Benz <contact@openchordcharts.org>

Copyright (C) 2012, 2013, 2014, 2015 Christophe Benz
https://github.com/openchordcharts/

This file is part of Open Chord Charts.

Open Chord Charts is free software; you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

Open Chord Charts is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.

@flow weak
*/


'use strict';


// Polyfills, loaded at the very first.
require('babel-core/polyfill');
require('isomorphic-fetch');


// Require react-style before react: https://github.com/js-next/react-style/issues/82
require('react-style');

var EventEmitter = require('events').EventEmitter;
var React = require('react');
var Router = require('react-router');

var routes = require('./routes');


function bootstrapApplication() {
  global.authEvents = new EventEmitter();
  global.loadingEvents = new EventEmitter();

  var appMountPointElement = document.getElementById('app-mount-point');
  var router = Router.create({routes});
  router.run((Handler, state) => {
    React.render(<Handler />, appMountPointElement);
    global.loadingEvents.emit('loadStart');
    fetchData(state.routes, state.params, state.query)
      .then(
        (data) => {
          React.render(<Handler {...data} />, appMountPointElement);
        },
        (errors) => {
          React.render(<Handler errors={errors} />, appMountPointElement);
        }
      )
      .then(() => {
        global.loadingEvents.emit('loadEnd');
      });
  });
}


function fetchData(routes, params, query) {
  var data = {};
  var errors = {};
  return Promise.all(
    routes
      .filter(route => route.handler.fetchData)
      .map(
        route => route.handler.fetchData(params, query)
          .then(handlerData => { data[route.name] = handlerData; })
          .catch(error => {
            console.error(error);
            errors[route.name] = error;
          })
      )
  ).then(() => {
    if (Object.keys(errors).length > 0) {
      throw errors;
    }
    return data;
  });
}


bootstrapApplication();
