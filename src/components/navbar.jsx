/*
Open Chord Charts -- Database of free chord charts
By: Christophe Benz <contact@openchordcharts.org>

Copyright (C) 2012, 2013, 2014, 2015 Christophe Benz
https://github.com/openchordcharts/

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


var {Link} = require('react-router');
var classNames = require('classnames');
var React = require('react/addons');

var auth = require('../auth');
var propTypes = require('../prop-types');


var NavBar = React.createClass({
  contextTypes: {
    router: React.PropTypes.func.isRequired,
  },
  propTypes: {
    appState: propTypes.appState.isRequired,
    loggedInUsername: React.PropTypes.string,
  },
  handleSignInClick(evt) {
    evt.preventDefault();
    auth.login();
  },
  handleSignOutClick(evt) {
    evt.preventDefault();
    auth.logout();
  },
  render() {
    var {router} = this.context;
    var params = router.getCurrentParams();
    return (
      <nav className="navbar navbar-default navbar-static-top">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link className="navbar-brand" to='charts'>Open Chord Charts</Link>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
              <li className={classNames({active: router.isActive('charts') && ! params.owner})}>
                <Link to='charts'>Charts</Link>
              </li>
              <li className={classNames({active: router.isActive('about')})}><Link to='about'>About</Link></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              {this.props.appState.loading === 'slow' && <li><p className='navbar-text'>Loading…</p></li>}
              {
                this.props.loggedInUsername ? (
                  <li><a href='#' onClick={this.handleSignOutClick}>Sign Out ({this.props.loggedInUsername})</a></li>
                ) : [
                  (
                    <li className={classNames({active: router.isActive('register')})} key='register'>
                      <Link to='register'>Register</Link>
                    </li>
                  ),
                  (<li key='sign-in'><a href='#' onClick={this.handleSignInClick}>Sign In</a></li>),
                ]
              }
            </ul>
          </div>
        </div>
      </nav>
    );
  }
});


module.exports = NavBar;
