'use strict';


var React = require('react'),
  {Link, State} = require('react-router');

var webservices = require('../webservices');


var Charts = React.createClass({
  mixins: [State],
  propTypes: {
    charts: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  },
  statics: {
    fetchData: function(params, query) {
      return webservices.fetchCharts({ownerSlug: query.owner});
    },
  },
  render: function() {
    var query = this.getQuery();
    return (
      <div>
        <div className="page-header">
          <h1>List of charts {query.owner && <small>of {query.owner}</small>}</h1>
        </div>
        <ul>
          {
            this.props.charts.map((chart, idx) => (
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
