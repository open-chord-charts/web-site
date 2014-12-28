'use strict';


var React = require('react'),
  {Link} = require('react-router');

var webservices = require('../webservices');


var Charts = React.createClass({
  statics: {
    fetchData: function() {
      return webservices.fetchCharts();
    },
  },
  render: function() {
    var charts = this.props.data.charts;
    return (
      <div>
        <div className="page-header">
          <h1>List of charts</h1>
        </div>
        <ul>
          {
            charts.map((chart, idx) => (
              <li key={idx}>
                <Link to='chart' params={chart}>{chart.title}</Link>
              </li>
            ))
          }
        </ul>
      </div>
    );
  },
});


module.exports = Charts;
