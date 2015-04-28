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


import {Link} from "react-router";
import React from "react";

import auth from "../auth";


var Header = React.createClass({
  contextTypes: {
    router: React.PropTypes.func,
  },
  propTypes: {
    loggedInUsername: React.PropTypes.string,
  },
  handleLogin() {
    auth.login();
  },
  handleLogout() {
    auth.logout();
  },
  render() {
    return (
      <div className="clearfix mb2 black bg-gray">
        <div className="left">
          <Link activeClassName="is-active" className="button py2 button-transparent" to="/">
            Open Chord Charts
          </Link>
          <Link activeClassName="is-active" className="button py2 button-transparent" to="charts">
            Charts
          </Link>
          <Link activeClassName="is-active" className="button py2 button-transparent" to="about">
            About
          </Link>
        </div>
        <div className="right">
          {
            this.props.loggedInUsername ? (
              <button className="py2 button-transparent" onClick={this.handleLogout}>
                {`Logout (${this.props.loggedInUsername})`}
              </button>
            ) : (
              <button className="py2 button-transparent" onClick={this.handleLogin}>Login</button>
            )
          }
        </div>
      </div>
    );
  },
});


module.exports = Header;
