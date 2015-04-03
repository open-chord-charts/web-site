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


var {RouteHandler} = require('react-router');
var {Typography} = require('react-material').style;
var React = require('react');
var StyleSheet = require('react-style');

var Navigation = require('./navigation');


var App = React.createClass({
  contextTypes: {
    router: React.PropTypes.func.isRequired,
  },
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
      edited: false, // Is current displayed chart edited.
      loading: true,
      loggedInUsername: sessionStorage.loggedInUsername || null,
    };
  },
  handleEdit() {
    this.setState({edited: true});
  },
  handleSave() {
    // TODO Really save chart.
    this.setState({edited: false});
  },
  render() {
    var {router} = this.context;
    var query = router.getCurrentQuery();
    var {chart} = this.props;
    var title = router.isActive('about') ? 'About' :
      router.isActive('chart') ? (chart ? `${chart.title}${this.state.edited ? ' (edit mode)' : ''}` : null) :
      router.isActive('charts') ? (query.owner ? `Charts of ${query.owner}` : 'Charts') :
      router.isActive('register') ? 'Register' :
      'Open Chord Charts';
    var isChartRoute = router.isActive('chart');
    var onEdit = isChartRoute && ! this.state.edited ? this.handleEdit : null;
    var onSave = isChartRoute && this.state.edited ? this.handleSave : null;
    return (
      <div styles={{fontFamily: Typography.fontFamily}}>
        <Navigation
          edited={this.state.edited}
          loggedInUsername={this.state.loggedInUsername}
          onEdit={onEdit}
          onSave={onSave}
          title={title}
        />
        <div styles={Styles.belowNavigation}>
          <RouteHandler {...this.props} appState={this.state} />
        </div>
      </div>
    );
  },
});


var Styles = StyleSheet.create({
  belowNavigation: {
    paddingTop: 56,
  },
});


module.exports = App;
