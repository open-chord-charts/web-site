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


// var {Link} = require("react-router");
var React = require("react");
import {Arrow, Button, Group, Navbar} from "rebass";
var {Item, Spacer} = Navbar;

var auth = require("../auth");


var Header = React.createClass({
  contextTypes: {
    router: React.PropTypes.func.isRequired,
  },
  propTypes: {
    loggedInUsername: React.PropTypes.string,
  },
  handleLogin(event) {
    event.preventDefault();
    auth.login();
  },
  handleLogout() {
    event.preventDefault();
    auth.logout();
  },
  handleTransitionTo(routeName) {
    var {router} = this.context;
    return function handleTransitionToClick(event) {
      event.preventDefault();
      router.transitionTo(routeName);
    };
  },
  render() {
    return (
      <Navbar color="aqua">
        <Item label="Open Chord Charts" onClick={this.handleTransitionTo("/")} />
        <Item label="Charts" onClick={this.handleTransitionTo("charts")} />
        <Item label="About" onClick={this.handleTransitionTo("about")} />
        <Spacer />
        <Group className="px2 py1">
          <input className="field-dark" placeholder="Search" type="text" />
          <Button className="white bg-darken-3">Go</Button>
        </Group>
        <Spacer />
        {
          this.props.loggedInUsername ? (
            <Item label={`Logout (${this.props.loggedInUsername})`} onClick={this.handleLogout} />
          ) : (
            <Item label="Login" onClick={this.handleLogin} />
          )
        }
      </Navbar>
    );
  },
});


module.exports = Header;
