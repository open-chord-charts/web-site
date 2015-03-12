/*
Open Chord Charts -- Database of free chord charts
By: Christophe Benz <contact@openchordcharts.org>

Copyright (C) 2012, 2013, 2014 Christophe Benz
https://gitorious.org/open-chord-charts/

This file is part of Open Chord Charts.

Open Chord Charts is free software; you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

Open Chord Charts is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.

@flow weak
*/


'use strict';


var React = require('react'),
  {Navigation} = require('react-router');

var webservices = require('../webservices');

var cx = React.addons.classSet;


var RegisterForm = React.createClass({
  mixins: [Navigation],
  statics: {
    attemptedTransition: null
  },
  getInitialState() {
    return {error: null};
  },
  handleSubmit(event) {
    event.preventDefault();
    var username = this.refs.username.getDOMNode().value;
    var password = this.refs.password.getDOMNode().value;
    var email = this.refs.email.getDOMNode().value;
    webservices.register(username, password, email).then((res) => {
      if (res.register === 'ok') {
        alert('Congratulations! You are now registered. Please sign in to continue.');
        if (RegisterForm.attemptedTransition) {
          var transition = RegisterForm.attemptedTransition;
          RegisterForm.attemptedTransition = null;
          transition.retry();
        } else {
          this.replaceWith('/');
        }
      } else {
        this.setState({error: res.error});
      }
    });
  },
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.state.error && <p className='text-danger'>{this.state.error.message}</p>}
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
          {
            this.state.error && this.state.error.errors.email && (
              <p className='text-danger help-block'>{this.state.error.errors.email}</p>
            )
          }
        </div>
        <button className='btn btn-primary' type='submit'>Register</button>
      </form>
    );
  }
});


module.exports = RegisterForm;
