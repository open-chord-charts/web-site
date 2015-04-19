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


var {DefaultRoute, NotFoundRoute, Redirect, Route} = require('react-router');
var React = require('react');

var AboutPage = require('./components/pages/about-page');
var AccountHandler = require('./components/route-handlers/account-handler');
var App = require('./components/app');
var ChartHandler = require('./components/route-handlers/chart-handler');
var ChartsHandler = require('./components/route-handlers/charts-handler');
var NotFoundPage = require('./components/pages/not-found-page');
var RegisterHandler = require('./components/route-handlers/register-handler');


const debug = require("debug")("app:routes");


function fetchData(matchedRoutes, params, query) {
  var data = {};
  var errors = {};
  return Promise.all(
    matchedRoutes
      .filter(route => route.handler.fetchData)
      .map(
        route => route.handler.fetchData(params, query)
          .then(handlerData => { data[route.name] = handlerData; })
          .catch(error => {
            debug("error", error);
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


var routes = (
  <Route handler={App}>
    <NotFoundRoute handler={NotFoundPage} />
    <Route name='about' handler={AboutPage} />
    <Route name='account' path='accounts/:slug' handler={AccountHandler} />
    <Route path='charts'>
      <Route name='chart' path=':slug' handler={ChartHandler} />
      <DefaultRoute name='charts' handler={ChartsHandler} />
    </Route>
    <Route name='register' path='register' handler={RegisterHandler} />
    <Redirect from='/' to='charts' />
  </Route>
);


export default {fetchData, routes};
