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
var {RaisedButton} = require('material-ui');

var auth = require('../../auth');
var ChartsList = require('../charts-list');
var propTypes = require('../../prop-types');
var webservices = require('../../webservices');


var ChartsHandler = React.createClass({
  contextTypes: {
    router: React.PropTypes.func.isRequired,
  },
  propTypes: {
    appState: propTypes.appState.isRequired,
    charts: React.PropTypes.arrayOf(propTypes.chart),
    errors: React.PropTypes.object,
  },
  statics: {
    fetchData(params, query) {
      // query is used when user clicks on chart owner, to open a list of charts belonging to this owner.
      return webservices.fetchCharts(query);
    },
  },
  handleLoginTouchTap() {
    auth.login();
  },
  handleLogoutTouchTap() {
    auth.logout();
  },
  render() {
    var {router} = this.context;
    var query = router.getCurrentQuery();
    var content;
    if (this.props.appState.loading) {
      content = this.props.appState.loading === 'slow' ? (
        <p>Loading…</p>
      ) : null;
    } else if (this.props.errors && this.props.errors.charts) {
      content = (
        <div className='alert alert-danger'>
          Unable to fetch data from API.
        </div>
      );
    } else {
      content = (
        <div className='clearfix'>
          <ChartsList charts={this.props.charts} />
          <div style={{float: 'right', marginTop: 24}}>
            {
              this.props.appState.loggedInUsername ?
                <RaisedButton label='Logout' onTouchTap={this.handleLogoutTouchTap} /> :
                <RaisedButton label='Login' onTouchTap={this.handleLoginTouchTap} />
            }
          </div>
        </div>
      );
    }
    return (
      <div>
        {query.owner && <h2>belonging to {query.owner}</h2>}
        {content}
      </div>
    );
  },
});


module.exports = ChartsHandler;
