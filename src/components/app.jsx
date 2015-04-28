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


import {RouteHandler} from "react-router";
import React from "react";

import Layout from "./layout";


var App = React.createClass({
  contextTypes: {
    router: React.PropTypes.func,
  },
  componentDidMount() {
    var timer;
    global.loadingEvents.on("loadStart", () => {
      clearTimeout(timer);
      this.setState({loading: true});
      // For slow responses, indicate the app is thinking otherwise its fast enough to just wait for the data to load.
      timer = setTimeout(() => {
        this.setState({loading: "slow"});
      }, 300);
    });
    global.loadingEvents.on("loadEnd", () => {
      clearTimeout(timer);
      this.setState({loading: false});
    });
    global.authEvents.on("loggedIn", () => {
      this.setState({loggedInUsername: sessionStorage.loggedInUsername});
    });
    global.authEvents.on("loggedOut", () => {
      this.setState({loggedInUsername: null});
    });
  },
  getInitialState() {
    return {
      loading: true,
      loggedInUsername: global.sessionStorage ? (sessionStorage.loggedInUsername || null) : null,
    };
  },
  render() {
    return (
      <Layout loggedInUsername={this.state.loggedInUsername}>
        <RouteHandler {...this.props} appState={this.state} />
      </Layout>
    );
  },
});


module.exports = App;
