/** @jsx React.DOM */
'use strict';


var React = require('react');


var NotFound = React.createClass({
  render: function() {
    return (
      <div>
        <div className='page-header'>
          <h1>Not found</h1>
        </div>
      </div>
    );
  },
});


module.exports = NotFound;
