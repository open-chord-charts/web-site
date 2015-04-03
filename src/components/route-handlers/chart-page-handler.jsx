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

var ChartPage = require('../chart-page');
var NotFound = require('../not-found');
var propTypes = require('../../prop-types');
var webservices = require('../../webservices');


var ChartPageHandler = React.createClass({
  propTypes: {
    appState: propTypes.appState.isRequired,
    errors: React.PropTypes.object,
    chart: propTypes.chart,
  },
  statics: {
    fetchData(params) {
      return webservices.fetchChart(params.slug);
    },
  },
  render() {
    if (this.props.chart) {
      return (
        <ChartPage chart={this.props.chart} loggedInUsername={this.props.appState.loggedInUsername} />
      );
    } else if (this.props.appState.loading) {
      return this.props.appState.loading === 'slow' ? <h1>Loading…</h1> : null;
    } else if (this.props.errors && this.props.errors.chart) {
      return (
        <p>Unable to fetch data from API.</p>
      );
    } else {
      return (
        <NotFound />
      );
    }
  },
});


module.exports = ChartPageHandler;
