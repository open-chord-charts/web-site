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
  },
  getInitialState: function() {
    return {loading: false};
  },
  handleKeyChange: function(value) {
    this.setState({selectedKey: value});
  },
  render: function() {
    return (
      <div>
        <NavBar />
        <div className='container'>
          <RouteHandler {...this.props} />
        </div>
      </div>
    );
  },
});


module.exports = App;
