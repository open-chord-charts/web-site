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


var React = require('react'),
  {Link} = require('react-router');

var propTypes = require('../prop-types');


var ChartsList = React.createClass({
  propTypes: {
    charts: React.PropTypes.arrayOf(propTypes.chart),
    owner: React.PropTypes.string,
  },
  render() {
    return this.props.charts ? (
      <ul>
        {
          this.props.charts.map((chart, idx) => (
            <li key={idx}>
              <Link to='chart' params={chart}>{chart.title}</Link>
            </li>
          ))
        }
      </ul>
    ) : (
      <p>No charts!</p>
    );
  },
});


module.exports = ChartsList;
