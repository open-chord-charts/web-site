/** @jsx React.DOM */
'use strict';


var React = require('react');

var model = require('../model');


var KeySelect = React.createClass({
  propTypes: {
    onChange: React.PropTypes.func.isRequired,
    value: React.PropTypes.string.isRequired,
  },
  handleChange: function(event) {
    this.props.onChange(event.target.value);
  },
  render: function() {
    return (
      <select className='form-control' onChange={this.handleChange} value={this.props.value}>
        {model.chromaticKeys.map((key, idx) => <option key={idx}>{key}</option>)}
      </select>
    );
  },
});


module.exports = KeySelect;
