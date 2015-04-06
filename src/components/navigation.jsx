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


var {AppBar, IconButton, List, ListItem, Overlay, SideNavigation} = require('react-material').components;
var {Colors} = require('react-material').style;
var React = require('react');
var StyleSheet = require('react-style');

var auth = require('../auth');


var Navigation = React.createClass({
  contextTypes: {
    router: React.PropTypes.func.isRequired,
  },
  propTypes: {
    dockedSideNavigation: React.PropTypes.bool,
    edited: React.PropTypes.bool,
    loggedInUsername: React.PropTypes.string,
    onEdit: React.PropTypes.func,
    onSave: React.PropTypes.func,
  },
  getInitialState() {
    return {
      showSideNavigation: false,
    };
  },
  handleListItemClick(routeName) {
    this.context.router.transitionTo(routeName);
    this.setState({showSideNavigation: false});
  },
  handleLoginTouchTap() {
    auth.login();
  },
  handleLogoutTouchTap() {
    auth.logout();
  },
  handleBackButtonClick() {
    this.context.router.transitionTo('charts');
  },
  handleNavButtonClick() {
    this.setState({showSideNavigation: true});
  },
  handleOverlayClick() {
    this.setState({showSideNavigation: false});
  },
  render() {
    var {showSideNavigation} = this.state;
    var {dockedSideNavigation, title} = this.props;
    var {router} = this.context;
    var isChartRoute = router.isActive('chart');
    var actionButtons = isChartRoute ? [
      this.props.edited ? (
        <IconButton icon="publish" onClick={this.props.onSave} />
      ) : (
        <IconButton icon="mode-edit" onClick={this.props.onEdit} />
      )
    ] : null;
    return (
      <div>
        <AppBar
          onBackButtonClick={isChartRoute ? this.handleBackButtonClick : null}
          onNavButtonClick={dockedSideNavigation || isChartRoute ? null : this.handleNavButtonClick}
          shadow={true}
          styles={
            {
              normalAppBarStyle: Object.assign(
                {},
                Styles.normalAppBarStyle,
                dockedSideNavigation ? Styles.dockedAppBarNormalStyle : null
              ),
            }
          }
          title={title}
          actionButtons={actionButtons}
        />
        {!dockedSideNavigation && <Overlay show={showSideNavigation} onClick={this.handleOverlayClick} />}
        <SideNavigation show={dockedSideNavigation || showSideNavigation}>
          <List>
            <ListItem
              onClick={() => this.handleListItemClick('charts')}
              styles={[router.isActive('charts') && Styles.activeListItemStyle]}
            >
              Charts
            </ListItem>
            {
              this.props.loggedInUsername ? (
                <ListItem onClick={this.handleLogoutTouchTap}>
                  {`Logout (${this.props.loggedInUsername})`}
                </ListItem>
              ) : (
                <ListItem onClick={this.handleLoginTouchTap}>Login</ListItem>
              )
            }
            <ListItem onClick={() => this.handleListItemClick('about')}>About</ListItem>
          </List>
        </SideNavigation>
      </div>
    );
  },
});


var Styles = StyleSheet.create({
  activeListItemStyle: {
    color: Colors.teal.P500,
  },
  dockedAppBarNormalStyle: {
    marginLeft: 240,
  },
  normalAppBarStyle: {
    backgroundColor: Colors.teal.P500,
  },
});


module.exports = Navigation;
