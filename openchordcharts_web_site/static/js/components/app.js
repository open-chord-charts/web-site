/** @jsx React.DOM */
'use strict';


var React = require('react'),
  {RouteHandler} = require('react-router');

var NavBar = require('./navbar');


var App = React.createClass({
  componentDidMount: function() {
    var timer;
    global.loadingEvents.on('loadStart', () => {
      clearTimeout(timer);
      // for slow responses, indicate the app is thinking
      // otherwise its fast enough to just wait for the
      // data to load
      timer = setTimeout(() => {
        this.setState({loading: true});
      }, 300);
    });
    global.loadingEvents.on('loadEnd', () => {
      clearTimeout(timer);
      this.setState({loading: false});
    });
    global.authEvents.on('loggedIn', () => {
      this.setState({loggedInUsername: sessionStorage.loggedInUsername});
    });
    global.authEvents.on('loggedOut', () => {
      this.setState({loggedInUsername: null});
    });
  },
  getInitialState: function() {
    return {
      loading: false,
      loggedInUsername: sessionStorage.loggedInUsername || null,
    };
  },
  render: function() {
    return (
      <div>
        <NavBar loading={this.state.loading} loggedInUsername={this.state.loggedInUsername} />
        <div className='container'>
          <RouteHandler {...this.props} appState={this.state} />
        </div>
      </div>
    );
  },
});


module.exports = App;
