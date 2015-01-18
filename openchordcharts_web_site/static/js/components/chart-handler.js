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
    fetchData: function(params) {
      return webservices.fetchChart(params.slug);
    },
  },
  render: function() {
    return this.props.chart ? (
      <Chart chart={this.props.chart} loggedInUsername={this.props.appState.loggedInUsername} />
    ) : (
      <NotFound />
    );
  },
});


module.exports = ChartHandler;
