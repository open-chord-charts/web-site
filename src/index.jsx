/*
Open Chord Charts -- Database of free chord charts
By: Christophe Benz <contact@openchordcharts.org>

Copyright (C) 2012, 2013, 2014 Christophe Benz
https://gitorious.org/open-chord-charts/

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


var EventEmitter = require('events').EventEmitter,
  React = require('react'),
  Router = require('react-router'),
  {DefaultRoute, NotFoundRoute, Route} = Router,
  whenKeys = require('when/keys');

var About = require('./components/about'),
  Account = require('./components/account'),
  App = require('./components/app'),
  ChartHandler = require('./components/chart-handler'),
  Charts = require('./components/charts'),
  NotFound = require('./components/not-found'),
  RegisterHandler = require('./components/register-handler');


require('6to5-core/polyfill');


global.authEvents = new EventEmitter();
global.loadingEvents = new EventEmitter();


function bootstrapApplication() {
  var appMountPointElement = document.getElementById('app-mount-point');
  var routes = (
    <Route handler={App}>
      <NotFoundRoute handler={NotFound} />
      <Route name='about' handler={About} />
      <Route name='account' path='accounts/:slug' handler={Account} />
      <Route name='chart' path='charts/:slug' handler={ChartHandler} />
      <Route name='register' path='register' handler={RegisterHandler} />
      <DefaultRoute name='charts' handler={Charts} />
    </Route>
  );
  var router = Router.create({
    location: Router.HistoryLocation,
    routes: routes,
  });
  router.run((Handler, state) => {
    React.render(<Handler />, appMountPointElement);
    global.loadingEvents.emit('loadStart');
    fetchData(state.routes, state.params, state.query)
    .then((data) => {
      global.loadingEvents.emit('loadEnd');
      React.render(<Handler {...data} />, appMountPointElement);
    })
    .done();
  });
}


function fetchData(routes, params, query) {
  return whenKeys.all(routes.filter((route) => {
    return route.handler.fetchData;
  }).reduce((data, route) => {
    data[route.name] = route.handler.fetchData(params, query);
    return data;
  }, {}));
}


bootstrapApplication();
