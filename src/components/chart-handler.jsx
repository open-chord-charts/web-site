/*
Open Chord Charts -- Database of free chord charts
By: Christophe Benz <contact@openchordcharts.org>

Copyright (C) 2012, 2013, 2014 Christophe Benz
https://gitorious.org/open-chord-charts/

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

var Chart = require('./chart'),
  NotFound = require('./not-found'),
  propTypes = require('../prop-types'),
  webservices = require('../webservices');


var ChartHandler = React.createClass({
  propTypes: {
    appState: React.PropTypes.shape({
      loading: React.PropTypes.bool,
      loggedInUsername: React.PropTypes.string,
    }).isRequired,
    chart: propTypes.chart,
  },
  statics: {
    fetchData(params) {
      return webservices.fetchChart(params.slug);
    },
  },
  render() {
    return this.props.chart ? (
      <Chart chart={this.props.chart} loggedInUsername={this.props.appState.loggedInUsername} />
    ) : (
      <NotFound />
    );
  },
});


module.exports = ChartHandler;
