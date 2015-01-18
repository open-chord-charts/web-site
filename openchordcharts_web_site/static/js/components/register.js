'use strict';


var React = require('react'),
  {Navigation} = require('react-router');

var webservices = require('../webservices');

var cx = React.addons.classSet;


var Register = React.createClass({
  mixins: [Navigation],
  statics: {
    attemptedTransition: null
  },
  getInitialState: function() {
    return {error: null};
  },
  handleSubmit: function(event) {
    event.preventDefault();
    var username = this.refs.username.getDOMNode().value;
    var password = this.refs.password.getDOMNode().value;
    var email = this.refs.email.getDOMNode().value;
    webservices.register(username, password, email).then((res) => {
      if (res.register === 'ok') {
        if (Register.attemptedTransition) {
          var transition = Register.attemptedTransition;
          Register.attemptedTransition = null;
          transition.retry();
        } else {
          this.replaceWith('/');
        }
      } else {
        this.setState({error: res.error.message});
      }
    });
  },
  render: function() {
    return (
      <div>
        <div className="page-header">
          <h1>Registration form</h1>
        </div>
        <form onSubmit={this.handleSubmit}>
          {this.state.error && <p className='text-danger'>{this.state.error}</p>}
          <div className={cx({'form-group': true, 'has-error': this.state.error})}>
            <label className='sr-only' htmlFor='inputUsername'>Username</label>
            <input className='form-control' id='inputUsername' placeholder='Username' ref='username' required />
          </div>
          <div className={cx({'form-group': true, 'has-error': this.state.error})}>
            <label htmlFor='inputPassword' className='sr-only'>Password</label>
            <input
              className='form-control'
              id='inputPassword'
              placeholder='Password'
              ref='password'
              required
              type='password'
            />
          </div>
          <div className={cx({'form-group': true, 'has-error': this.state.error})}>
            <label className='sr-only' htmlFor='inputEmail'>Email</label>
            <input className='form-control' id='inputEmail' placeholder='Email' ref='email' required type="email" />
          </div>
          <button className='btn btn-primary' type='submit'>Register</button>
        </form>
      </div>
    );
  }
});


module.exports = Register;
