/** @jsx React.DOM */
'use strict';


var React = require('react');

var webservices = require('./webservices');


var Application = React.createClass({
  componentWillMount: function() {
    var slug = 'all-of-me';
    webservices.fetchChart(slug, this.handleFetchChartSuccess, this.handleFetchChartError);
  },
  getInitialState: function() {
    return {
      chart: null,
    };
  },
  handleFetchChartError: function(message) {
    console.error(message);
  },
  handleFetchChartSuccess: function(data) {
    this.setState({chart: data.chart});
  },
  handleKeyChange: function(value) {
    this.setState({selectedKey: value});
  },
  render: function() {
    var chart = this.state.chart;
    return (
      <div>
        <h1>Open Chord Charts</h1>
        {
          chart ? (
            <ChartPage
              chartKey={this.state.selectedKey || chart.key}
              composers={chart.composers}
              compositionYear={chart.compositionYear}
              genre={chart.genre}
              interpretations={chart.interpretations}
              onKeyChange={this.handleKeyChange}
              ownerUsername={chart.ownerUsername}
              parts={chart.parts}
              slug={chart.slug}
              structure={chart.structure}
              title={chart.title}
            />
          ) : (
            <p>Loading...</p>
          )
        }
      </div>
    );
  }
});


var ChartPage = React.createClass({
  propTypes: {
    chartKey: React.PropTypes.string.isRequired, // "key" is a reserved prop
    composers: React.PropTypes.arrayOf(React.PropTypes.string),
    compositionYear: React.PropTypes.number,
    genre: React.PropTypes.string,
    interpretations: React.PropTypes.arrayOf(React.PropTypes.shape({
      externalLinks: React.PropTypes.arrayOf(React.PropTypes.string),
      interpreterName: React.PropTypes.string,
      year: React.PropTypes.number,
    })),
    onKeyChange: React.PropTypes.func.isRequired,
    ownerUsername: React.PropTypes.string.isRequired,
    parts: React.PropTypes.object.isRequired,
    slug: React.PropTypes.string.isRequired,
    structure: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    title: React.PropTypes.string.isRequired,
  },
  render: function() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <p>Composers: {JSON.stringify(this.props.composers)}</p>
        <p>Composed in: {this.props.compositionYear}</p>
        <p>Genre: {this.props.genre}</p>
        <p>Owner username: {this.props.ownerUsername}</p>
        <p>Interpretations: {JSON.stringify(this.props.interpretations)}</p>
        <KeySelect onChange={this.props.onKeyChange} value={this.props.chartKey} />
        <Chart parts={this.props.parts} structure={this.props.structure} />
      </div>
    );
  }
});


var Chart = React.createClass({
  propTypes: {
    parts: React.PropTypes.object.isRequired,
    structure: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  },
  render: function() {
    return (
      <div>
        {
          this.props.structure.map(function(partName, idx) {
            return (
              <div key={idx}>
                {partName + ': ' + JSON.stringify(this.props.parts[partName])}
              </div>
            );
          }.bind(this))
        }
      </div>
    );
  }
});


var KeySelect = React.createClass({
  propTypes: {
    onChange: React.PropTypes.func.isRequired,
    value: React.PropTypes.string.isRequired,
  },
  handleChange: function(event) {
    this.props.onChange(event.target.value);
  },
  render: function() {
    var keys = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    return (
      <div className='form-inline'>
        <select className='form-control' onChange={this.handleChange} value={this.props.value}>
          {
            keys.map(function(key, idx) {
              return <option key={idx}>{key}</option>;
            }.bind(this))
          }
        </select>
      </div>
    );
  },
});


function bootstrap() {
  React.render(
    <Application />,
    document.getElementById('app')
  );
}


bootstrap();
