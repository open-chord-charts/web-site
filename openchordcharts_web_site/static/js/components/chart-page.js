'use strict';


var React = require('react');

var Chart = require('./chart'),
  KeySelect = require('./key-select'),
  webservices = require('../webservices');


var ChartPage = React.createClass({
  // propTypes: {
  //   chartKey: React.PropTypes.string.isRequired, // "key" is a reserved prop
  //   composers: React.PropTypes.arrayOf(React.PropTypes.string),
  //   compositionYear: React.PropTypes.number,
  //   genre: React.PropTypes.string,
  //   interpretations: React.PropTypes.arrayOf(React.PropTypes.shape({
  //     externalLinks: React.PropTypes.arrayOf(React.PropTypes.string),
  //     interpreterName: React.PropTypes.string,
  //     year: React.PropTypes.number,
  //   })),
  //   onKeyChange: React.PropTypes.func.isRequired,
  //   ownerUsername: React.PropTypes.string.isRequired,
  //   parts: React.PropTypes.object.isRequired,
  //   slug: React.PropTypes.string.isRequired,
  //   structure: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  //   title: React.PropTypes.string.isRequired,
  // },
  statics: {
    fetchData: function(params) {
      return webservices.fetchChart(params.slug);
    },
  },
  render: function() {
    var chart = this.props.data.chart;
    return (
      <div>
        <div className='page-header'>
          <h1>{chart.title}</h1>
        </div>
        <p>Composers: {JSON.stringify(chart.composers)}</p>
        <p>Composed in: {chart.compositionYear}</p>
        <p>Genre: {chart.genre}</p>
        <p>Owner username: {chart.ownerUsername}</p>
        <p>Interpretations: {JSON.stringify(chart.interpretations)}</p>
        <Chart parts={chart.parts} structure={chart.structure} />
      </div>
    );
  },
});

        // <KeySelect onChange={chart.onKeyChange} value={chart.chartKey} />

module.exports = ChartPage;
