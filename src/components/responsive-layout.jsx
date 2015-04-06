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


var {MediaCase, MediaSwitch} = require('react-mediaswitch');
var React = require('react');
var StyleSheet = require('react-style');

var Navigation = require('./navigation');


var ResponsiveLayout = React.createClass({
  propTypes: {
    edited: React.PropTypes.bool,
    loggedInUsername: React.PropTypes.string,
    onEdit: React.PropTypes.func,
    onSave: React.PropTypes.func,
    title: React.PropTypes.string.isRequired,
  },
  render() {
    return (
      <MediaSwitch>
        <MediaCase media="screen and (max-width: 800px)">
          <Navigation
            dockedSideNavigation={false}
            edited={this.props.edited}
            loggedInUsername={this.props.loggedInUsername}
            onEdit={this.props.onEdit}
            onSave={this.props.onSave}
            title={this.props.title}
          />
          <div styles={Styles.belowAppBarContent}>
            {this.props.children}
          </div>
        </MediaCase>
        <MediaCase media="screen and (min-width: 800px)" default={true}>
          <Navigation
            dockedSideNavigation={true}
            edited={this.props.edited}
            loggedInUsername={this.props.loggedInUsername}
            onEdit={this.props.onEdit}
            onSave={this.props.onSave}
            title={this.props.title}
          />
          <div styles={[Styles.belowAppBarContent, Styles.dockedContent]}>
            {this.props.children}
          </div>
        </MediaCase>
      </MediaSwitch>
    );
  },
});


var Styles = StyleSheet.create({
  belowAppBarContent: {
    paddingTop: 56,
  },
  dockedContent: {
    paddingLeft: 240,
  },
});


module.exports = ResponsiveLayout;
