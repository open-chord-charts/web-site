/** @jsx React.DOM */
'use strict';


var React = require('react');

var KeySelect = require('./key-select');


var ChordEditToolbar = React.createClass({
  propTypes: {
    chordKey: React.PropTypes.string.isRequired,
    onChordChange: React.PropTypes.func.isRequired,
  },
  render: function() {
    return (
      <KeySelect onChange={this.props.onChordChange} value={this.props.chordKey} />
    );
  },
});


module.exports = ChordEditToolbar;
