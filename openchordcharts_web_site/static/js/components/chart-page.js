'use strict';


var React = require('react'),
  {Link} = require('react-router');

var Chart = require('./chart'),
  KeySelect = require('./key-select'),
  NotFound = require('./not-found'),
  webservices = require('../webservices');


var ChartPage = React.createClass({
  propTypes: {
    appState: React.PropTypes.shape({
      loading: React.PropTypes.bool,
      loggedIn: React.PropTypes.bool,
    }).isRequired,
    chart: React.PropTypes.shape({
      key: React.PropTypes.string.isRequired,
      composers: React.PropTypes.arrayOf(React.PropTypes.string),
      compositionYear: React.PropTypes.number,
      genre: React.PropTypes.string,
      interpretations: React.PropTypes.arrayOf(React.PropTypes.shape({
        externalLinks: React.PropTypes.arrayOf(React.PropTypes.string),
        interpreterName: React.PropTypes.string,
        year: React.PropTypes.number,
      })),
      owner: React.PropTypes.shape({
        slug: React.PropTypes.string.isRequired,
        username: React.PropTypes.string.isRequired,
      }).isRequired,
      parts: React.PropTypes.object.isRequired,
      slug: React.PropTypes.string.isRequired,
      structure: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
      title: React.PropTypes.string.isRequired,
    }),
  },
  statics: {
    fetchData: function(params) {
      return webservices.fetchChart(params.slug);
    },
  },
  getInitialState: function() {
    return this.props.chart ? {key: this.props.chart.key} : null;
  },
  handleKeyChange: function(value) {
    this.setState({key: value});
  },
  render: function() {
    var chart = this.props.chart;
    var loggedIn = this.props.appState.loggedIn;
    return chart ? (
      <div>
        <div className='page-header'>
          <h1>{chart.title}</h1>
        </div>
        {
          chart.composers && chart.compositionYear ? (
            <p>Composed by {chart.composers.join(', ')} in {chart.compositionYear}</p>
          ) : (
            chart.composers ? (
              <p>Composed by {chart.composers.join(', ')}</p>
            ) : chart.compositionYear ? (
              <p>Composed in {chart.compositionYear}</p>
            ) : null
          )
        }
        {chart.genre && <p>Genre: {chart.genre}</p>}
        <p>Interpretations: {JSON.stringify(chart.interpretations)}</p>
        <KeySelect onChange={this.handleKeyChange} value={this.state.key} />
        <Chart parts={chart.parts} structure={chart.structure} />
        <hr />
        {loggedIn && <button className='btn btn-danger'>Delete</button>}
        <p className='pull-right'>
          <Link to='charts' query={{owner: chart.owner.slug}}>{chart.owner.username}</Link>
        </p>
      </div>
    ) : (
      <NotFound />
    );
  },
});


module.exports = ChartPage;
