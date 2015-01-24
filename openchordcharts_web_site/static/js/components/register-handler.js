/** @jsx React.DOM */
'use strict';


var React = require('react');

var propTypes = require('../prop-types'),
  RegisterForm = require('./register-form');


var RegisterHandler = React.createClass({
  propTypes: {
    appState: propTypes.appState.isRequired,
  },
  render: function() {
    return (
      <div>
        <div className="page-header">
          <h1>Registration form</h1>
        </div>
        {
          this.props.appState.loggedInUsername ? (
            <p>Please sign out first.</p>
          ) : (
            <RegisterForm />
          )
        }
      </div>
    );
  }
});


module.exports = RegisterHandler;
