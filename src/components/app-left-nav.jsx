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


var {LeftNav, MenuItem} = require('material-ui');
var React = require('react');

var propTypes = require('../prop-types');


var AppLeftNav = React.createClass({
  contextTypes: {
    router: React.PropTypes.func.isRequired,
  },
  propTypes: {
    appState: propTypes.appState.isRequired,
  },
  getMenuItems() {
    var menuItems = [
      {route: 'charts', text: 'Charts'},
    ];
    if (!this.props.appState.loggedInUsername) {
      menuItems.push({route: 'register', text: 'Register'});
    }
    menuItems = menuItems.concat([
      {text: 'Resources', type: MenuItem.Types.SUBHEADER},
      {payload: 'https://github.com/openchordcharts', target: '_blank', text: 'GitHub', type: MenuItem.Types.LINK},
      {route: 'about', text: 'About'},
    ]);
    return menuItems;
  },
  getSelectedIndex(menuItems) {
    var {router} = this.context;
    return menuItems.findIndex(menuItem => menuItem.route && router.isActive(menuItem.route));
  },
  handleChange(event, key, payload) {
    this.context.router.transitionTo(payload.route);
  },
  handleHeaderTouchTap() {
    this.context.router.transitionTo('charts');
    this.refs.leftNav.close();
  },
  render() {
    var header = <div className="logo" onTouchTap={this.handleHeaderTouchTap}>Open Chord Charts</div>;
    var menuItems = this.getMenuItems();
    return (
      <LeftNav
        docked={false}
        header={header}
        isInitiallyOpen={false}
        menuItems={menuItems}
        onChange={this.handleChange}
        ref='leftNav'
        selectedIndex={this.getSelectedIndex(menuItems)}
      />
    );
  },
  toggle() {
    this.refs.leftNav.toggle();
  },
});


module.exports = AppLeftNav;
