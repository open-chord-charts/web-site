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


var {RaisedButton} = require('material-ui');
var React = require('react');

var ChartsList = require('./charts-list');
var propTypes = require('../prop-types');


var ChartsPage = React.createClass({
  propTypes: {
    charts: React.PropTypes.arrayOf(propTypes.chart),
    loggedInUsername: React.PropTypes.string,
  },
  handleItemTouchTap(item) {
    this.context.router.transitionTo('chart', {slug: item.slug});
  },
  render() {
    return (
      <div className='charts-page'>
        <ChartsList charts={this.props.charts} />
        <div style={{float: 'right', marginTop: 24}}>
          {
            this.props.loggedInUsername ?
              <RaisedButton label='Logout' onTouchTap={this.handleLogoutTouchTap} /> :
              <RaisedButton label='Login' onTouchTap={this.handleLoginTouchTap} />
          }
        </div>
      </div>
    );
  },
});


module.exports = ChartsPage;
