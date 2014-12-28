'use strict';


var EventEmitter = require('events').EventEmitter,
  React = require('react'),
  Router = require('react-router'),
  {DefaultRoute, Route} = Router,
  whenKeys = require('when/keys');

var About = require('./components/about'),
  App = require('./components/app'),
  ChartPage = require('./components/chart-page'),
  Charts = require('./components/charts');


global.loadingEvents = new EventEmitter();


function bootstrap() {
  var appElement = document.getElementById('app');
  var routes = (
    <Route name='app' path='/' handler={App}>
      <Route name='about' handler={About} />
      <Route name='chart' path=':slug' handler={ChartPage} />
      <DefaultRoute name='charts' handler={Charts} />
    </Route>
  );
  Router.run(routes, Router.HistoryLocation, function(Handler, state) {
    global.loadingEvents.emit('loadStart');
    fetchData(state.routes, state.params).then((data) => {
      global.loadingEvents.emit('loadEnd');
      React.render(<Handler data={data}/>, appElement);
    });
  });
}


function fetchData(routes, params) {
  return whenKeys.all(routes.filter((route) => {
    return route.handler.fetchData;
  }).reduce((data, route) => {
    data[route.name] = route.handler.fetchData(params);
    return data;
  }, {}));
}


bootstrap();
