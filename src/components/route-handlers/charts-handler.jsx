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

var ChartsList = require('../charts-list'),
  propTypes = require('../../prop-types'),
  webservices = require('../../webservices');


var ChartsHandler = React.createClass({
  contextTypes: {
    router: React.PropTypes.func.isRequired
  },
  propTypes: {
    appState: propTypes.appState.isRequired,
    charts: React.PropTypes.arrayOf(propTypes.chart),
    errors: React.PropTypes.object,
  },
  statics: {
    fetchData(params, query) {
      return webservices.fetchCharts(query);
    },
  },
  render() {
    var error = this.props.errors && this.props.errors.charts;
    var {router} = this.context;
    var params = router.getCurrentParams();
    var content;
    if (this.props.appState.loading) {
      content = this.props.appState.loading === 'slow' ? (
        <p>Loading…</p>
      ) : null;
    } else if (error) {
      content = (
        <div className='alert alert-danger'>
          Unable to fetch charts: "{error.message}".
        </div>
      );
    } else {
      content = (
        <ChartsList charts={this.props.charts} owner={params.owner} />
      );
    }
    return (
      <div>
        <div className="page-header">
            <h1>Charts {this.props.owner && <small>of {this.props.owner}</small>}</h1>
        </div>
        {content}
      </div>
    );
  },
});


module.exports = ChartsHandler;
