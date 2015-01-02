'use strict';


var React = require('react'),
  {Navigation} = require('react-router');

var auth = require('../auth');

var cx = React.addons.classSet;


var Login = React.createClass({
  mixins: [Navigation],
  statics: {
    attemptedTransition: null
  },
  getInitialState: function() {
    return {error: false};
  },
  handleSubmit: function(event) {
    event.preventDefault();
    var username = this.refs.username.getDOMNode().value;
    var password = this.refs.password.getDOMNode().value;
    var remember = this.refs.remember.getDOMNode().checked;
    auth.login(username, password, remember).then((loggedIn) => {
      if ( ! loggedIn) {
        return this.setState({error: true});
      }
      if (Login.attemptedTransition) {
        var transition = Login.attemptedTransition;
        Login.attemptedTransition = null;
        transition.retry();
      } else {
        this.replaceWith('/');
      }
    });
  },
  render: function() {
    return (
      <div>
        <div className="page-header">
          <h1>Please sign in</h1>
        </div>
        <form onSubmit={this.handleSubmit}>
          {this.state.error && <p className='text-danger'>Bad login information</p>}
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
          <div className='checkbox'>
            <label>
              <input ref='remember' type='checkbox' /> Remember me
            </label>
          </div>
          <button className='btn btn-primary' type='submit'>Sign in</button>
        </form>
      </div>
    );
  }
});


module.exports = Login;
