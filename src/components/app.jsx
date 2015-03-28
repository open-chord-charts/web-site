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


var React = require('react');
var {RouteHandler} = require('react-router');

var NavBar = require('./navbar');


// Bootstrap

require('bootstrap/dist/css/bootstrap.css');
require('bootstrap/dist/js/bootstrap.js');


var App = React.createClass({
  componentDidMount() {
    var timer;
    global.loadingEvents.on('loadStart', () => {
      clearTimeout(timer);
      this.setState({loading: true});
      // for slow responses, indicate the app is thinking
      // otherwise its fast enough to just wait for the
      // data to load
      timer = setTimeout(() => {
        this.setState({loading: 'slow'});
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
  getInitialState() {
    return {
      loading: true,
      loggedInUsername: sessionStorage.loggedInUsername || null,
    };
  },
  render() {
    return (
      <div className='app'>
        <NavBar appState={this.state} loggedInUsername={this.state.loggedInUsername} />
        <div className='container'>
          <RouteHandler {...this.props} appState={this.state} />
        </div>
      </div>
    );
  },
});


module.exports = App;
