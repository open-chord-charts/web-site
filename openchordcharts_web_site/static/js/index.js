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


global.authEvents = new EventEmitter();
global.loadingEvents = new EventEmitter();


function bootstrap() {
  var appElement = document.getElementById('app');
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
    global.loadingEvents.emit('loadStart');
    fetchData(state.routes, state.params, state.query)
    .then((data) => {
      global.loadingEvents.emit('loadEnd');
      React.render(<Handler {...data} />, appElement);
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


bootstrap();
