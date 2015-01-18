'use strict';


var EventEmitter = require('events').EventEmitter,
  React = require('react'),
  Router = require('react-router'),
  {DefaultRoute, NotFoundRoute, Route} = Router,
  whenKeys = require('when/keys');

var About = require('./components/about'),
  Account = require('./components/account'),
  App = require('./components/app'),
  Chart = require('./components/chart'),
  Charts = require('./components/charts'),
  NotFound = require('./components/not-found');


global.authEvents = new EventEmitter();
global.loadingEvents = new EventEmitter();


function bootstrap() {
  var appElement = document.getElementById('app');
  // TODO add a ChartHandler to handle not found
  var routes = (
    <Route handler={App}>
      <NotFoundRoute handler={NotFound} />
      <Route name='about' handler={About} />
      <Route name='account' path='accounts/:slug' handler={Account} />
      <Route name='chart' path='charts/:slug' handler={Chart} />
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
