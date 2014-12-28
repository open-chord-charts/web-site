'use strict';


var React = require('react'),
  {RouteHandler} = require('react-router');

var NavBar = require('./navbar');


        // {
        //   chart ? (
        //     <ChartPage
        //       chartKey={this.state.selectedKey || chart.key}
        //       composers={chart.composers}
        //       compositionYear={chart.compositionYear}
        //       genre={chart.genre}
        //       interpretations={chart.interpretations}
        //       onKeyChange={this.handleKeyChange}
        //       ownerUsername={chart.ownerUsername}
        //       parts={chart.parts}
        //       slug={chart.slug}
        //       structure={chart.structure}
        //       title={chart.title}
        //     />
        //   ) : (
        //     <p>Loading...</p>
        //   )
        // }


var App = React.createClass({
  componentDidMount: function() {
    var timer;
    global.loadingEvents.on('loadStart', () => {
      clearTimeout(timer);
      // for slow responses, indicate the app is thinking
      // otherwise its fast enough to just wait for the
      // data to load
      timer = setTimeout(() => {
        this.setState({loading: true});
      }, 300);
    });
    global.loadingEvents.on('loadEnd', () => {
      clearTimeout(timer);
      this.setState({loading: false});
    });
  },
  getInitialState: function() {
    return {loading: false};
  },
  handleKeyChange: function(value) {
    this.setState({selectedKey: value});
  },
  render: function() {
    return (
      <div>
        <NavBar />
        <div className='container'>
          <RouteHandler {...this.props} />
        </div>
      </div>
    );
  },
});


module.exports = App;
