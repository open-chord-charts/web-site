'use strict';


var React = require('react');

var webservices = require('../webservices');


var Account = React.createClass({
  statics: {
    fetchData: function(params) {
      return webservices.fetchAccount(params.slug);
    },
  },
  render: function() {
    return (
      <div>
        <div className='page-header'>
          <h1>Account</h1>
        </div>
      </div>
    );
  },
});


module.exports = Account;
