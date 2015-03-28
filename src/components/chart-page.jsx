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


var {Link} = require('react-router');
var Immutable = require('immutable');
var React = require('react/addons');
var t = require('transducers.js');

var ChartGrid = require('./chart-grid');
var ChordEditToolbar = require('./chord-edit-toolbar');
var KeySelect = require('./key-select');
var model = require('../model');
var propTypes = require('../prop-types');
var webservices = require('../webservices');


var ChartPage = React.createClass({
  propTypes: {
    // TODO Remove nest level of chart.
    chart: propTypes.chart.isRequired,
    loggedInUsername: React.PropTypes.string,
  },
  componentDidMount() {
    window.onresize = this.handleWidthChange;
    this.handleWidthChange();
  },
  componentWillUnmount() {
    window.onresize = null;
  },
  getInitialState() {
    return {
      chart: this.props.chart,
      chartGridWidth: null,
      edited: false,
      key: this.props.chart.key,
      selectedBar: null,
    };
  },
  handleBarAdd(partName) {
    var newChord = {
      alterations: null,
      degree: 0,
      duration: 1,
    };
    var newChart = Immutable.fromJS(this.state.chart)
      .updateIn(['parts', partName], (chords) => chords.push(newChord))
      .toJS();
    this.setState({chart: newChart});
  },
  handleBarSelect(partName, partIndex) {
    this.setState({selectedBar: {partIndex, partName}});
  },
  handleChartKeyChange(newChartKey) {
    this.setState({key: newChartKey});
  },
  handleChordKeyChange(newChordKey) {
    console.log('handleChordChange', newChordKey);
    // var newChart = this.state.chart; // TODO immutable
    // newChart.parts[partName][idx] = newChord;
    // this.setState({chart: newChart});
  },
  handleCloneClick(event) {
    console.log(event);
  },
  handleDeleteClick() {
    if (confirm(`Delete this chart (${this.state.chart.title})?`)) {
      webservices.deleteChart(this.state.chart.slug);
    }
  },
  handleEditClick() {
    this.setState({edited: true});
  },
  handleSaveClick() {
    // TODO save data
    this.setState({
      edited: false,
      selectedBar: null,
    });
  },
  handleWidthChange() {
    var componentWidth = this.getDOMNode().offsetWidth;
    this.setState({chartGridWidth: componentWidth});
  },
  render() {
    var chart = this.state.chart;
    var barsByPartName = t.map(
      chart.parts,
      (kv) => [kv[0], model.chordsToBars(kv[1], this.state.key)]
    );
    return (
      <div>
        <div className='page-header'>
          <h1>{chart.title}</h1>
        </div>
        {
          chart.composers && chart.compositionYear ? (
            <p>Composed by {chart.composers.join(', ')} in {chart.compositionYear}</p>
          ) : (
            chart.composers ? (
              <p>Composed by {chart.composers.join(', ')}</p>
            ) : chart.compositionYear ? (
              <p>Composed in {chart.compositionYear}</p>
            ) : null
          )
        }
        {chart.genre && <p>Genre: {chart.genre}</p>}
        {
          chart.interpretations && (
            <p>
              Interpretations:
              {' '}
              {
                chart.interpretations > 1 ? (
                  <ul>
                    {
                      chart.interpretations.map((interpretation, idx) => (
                        <li key={idx}>{this.renderInterpretation(interpretation)}</li>
                      ))
                    }
                  </ul>
                ) : (
                  <span>{this.renderInterpretation(chart.interpretations[0])}</span>
                )
              }
            </p>
          )
        }
        <div className='form-inline' style={{marginBottom: 10}}>
          <KeySelect onChange={this.handleChartKeyChange} value={this.state.key} />
          {
            this.state.edited && this.state.selectedBar &&
            barsByPartName[this.state.selectedBar.partName][this.state.selectedBar.partIndex].map((barChord, idx) => (
              <ChordEditToolbar
                chordKey={barChord.rendered}
                key={idx}
                onChordChange={this.handleChordKeyChange}
              />
            ))
          }
        </div>
        {
          this.state.chartGridWidth && (
            <ChartGrid
              barsByPartName={barsByPartName}
              edited={this.state.edited}
              onBarAdd={this.state.edited ? this.handleBarAdd : null}
              onBarSelect={this.state.edited ? this.handleBarSelect : null}
              selectedBar={this.state.selectedBar}
              structure={chart.structure}
              width={this.state.chartGridWidth}
            />
          )
        }
        <hr />
        <div className='row'>
          <div className='col-xs-10'>
            {this.renderActionsToolbar()}
          </div>
          <div className='col-xs-2'>
            <p className='text-right'>
              <Link to='charts' query={{owner: chart.owner.slug}}>{chart.owner.username}</Link>
            </p>
          </div>
        </div>
      </div>
    );
  },
  renderActionsToolbar() {
    var loggedInUsername = this.props.loggedInUsername;
    var isOwner = loggedInUsername === this.state.chart.owner.username;
    var buttons = [];
    if (isOwner) {
      if (this.state.edited) {
        var saveButton = (
          <button className='btn btn-primary' key='save' onClick={this.handleSaveClick}>Save</button>
        );
        buttons.push(saveButton);
      } else {
        var editButton = (
          <button
            className='btn btn-default'
            key='edit'
            onClick={this.handleEditClick}
          >
            Edit
          </button>
        );
        var deleteButton = (
          <button
            className='btn btn-danger'
            key='delete'
            onClick={this.handleDeleteClick}
            style={{marginLeft: 10}}
          >
            Delete
          </button>
        );
        buttons.push(editButton);
        buttons.push(deleteButton);
      }
    }
    if (loggedInUsername !== null && ! isOwner) {
      var cloneButton = (
        <button className='btn btn-danger' key='clone' onClick={this.handleCloneClick}>Clone</button>
      );
      buttons.push(cloneButton);
    }
    return buttons;
  },
  renderInterpretation(interpretation) {
    var label = interpretation.interpreterName;
    if (interpretation.year) {
      label += ` (${interpretation.year})`;
    }
    return (
      <span>
        {
          interpretation.externalLinks ? (
            <a href={interpretation.externalLinks[0]} rel='external' target='_blank'>{label}</a>
          ) : (
            <span>label</span>
          )
        }
        {
          interpretation.externalLinks && interpretation.externalLinks.length > 1 && (
            <span>
              {' '}
              {
                interpretation.externalLinks.slice(1).map((externalLink, idx) => (
                  <a href={externalLink} key={idx} rel='external' target='_blank'>{`#${idx}`}</a>
                ))
              }
            </span>
          )
        }
      </span>
    );
  },
});


module.exports = ChartPage;
