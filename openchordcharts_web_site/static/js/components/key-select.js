'use strict';


var React = require('react');


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
          {keys.map((key, idx) => <option key={idx}>{key}</option>)}
        </select>
      </div>
    );
  },
});


module.exports = KeySelect;
