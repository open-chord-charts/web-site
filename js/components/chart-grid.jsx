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
  t = require('transducers.js');

var propTypes = require('../prop-types');


var ChartGrid = React.createClass({
  propTypes: {
    barsByPartName: React.PropTypes.object.isRequired,
    edited: React.PropTypes.bool,
    nbBarsByRow: React.PropTypes.number.isRequired,
    onBarSelect: React.PropTypes.func,
    partNameColumnWidth: React.PropTypes.number.isRequired,
    selectedBar: propTypes.selectedBar,
    selectedBarBorderWidth: React.PropTypes.number.isRequired,
    structure: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    tableRowHeight: React.PropTypes.number.isRequired,
    width: React.PropTypes.number.isRequired,
  },
  getDefaultProps: function() {
    return {
      nbBarsByRow: 8,
      partNameColumnWidth: 30,
      selectedBarBorderWidth: 3,
      tableRowHeight: 60,
    };
  },
  handleBarKeyPress: function(evt, barChords) {
    console.log(barChords);
    // var newChordStr = evt.key;
    // var chartKeyIndex = model.chromaticKeys.indexOf(this.props.chartKey);
    // var newChordIndex = model.chromaticKeys.indexOf(newChordStr);
    // var newChordDegree = (newChordIndex - chartKeyIndex) % model.chromaticKeys.length;
    // var chord = this.props.parts[partName][idx];
    // var newChord = {
    //   alterations: chord.alterations,
    //   degree: newChordDegree,
    //   duration: chord.duration,
    // };
    // this.props.onChordChange(newChord, idx, partName);
  },
  render: function() {
    var chordColumnWidth = Math.min(
      (this.props.width - this.props.partNameColumnWidth) / this.props.nbBarsByRow,
      this.props.tableRowHeight * 1.5
    );
    var rowsByPartName = t.map(
      this.props.barsByPartName,
      (kv) => [kv[0], t.partition(kv[1], this.props.nbBarsByRow)]
    );
    return (
      <table className='table table-bordered' style={{width: 'initial'}}>
        <tbody>
          {
            this.props.structure.map(
              (partName) => rowsByPartName[partName].map(
                (bars) => this.renderPartRow(partName, bars, chordColumnWidth)
              )
            )
          }
        </tbody>
      </table>
    );
  },
  renderBar: function(barChords, chordColumnWidth) {
    return barChords.length === 1 ? (
      <div className='text-center'>
        {barChords[0].rendered}
      </div>
    ) : (
      this.renderSplitBar(barChords, chordColumnWidth)
    );
  },
  renderPartRow: function(partName, bars, chordColumnWidth) {
    return (
      <tr style={{height: this.props.tableRowHeight}}>
        <td
          className='text-center'
          style={{
            fontStyle: 'italic',
            height: this.props.tableRowHeight,
            lineHeight: 0,
            verticalAlign: 'middle',
            width: this.props.partNameColumnWidth,
          }}
        >
          {partName}
        </td>
        {
          bars.map((barChords, idx) => (
            <td
              key={idx}
              onClick={() => this.props.onBarSelect ? this.props.onBarSelect(partName, idx) : null}
              style={{
                borderWidth: this.props.selectedBar &&
                  this.props.selectedBar.partName === partName &&
                  this.props.selectedBar.partIndex === idx ? this.props.selectedBarBorderWidth : null,
                height: this.props.tableRowHeight,
                lineHeight: 0,
                padding: 0,
                minWidth: chordColumnWidth,
                verticalAlign: 'middle',
              }}
            >
              {this.renderBar(barChords,  chordColumnWidth)}
            </td>
          )
        )}
      </tr>
    );
  },
  renderSplitBar: function(barChords, chordColumnWidth) {
    var padding = chordColumnWidth < 50 ? 2 : chordColumnWidth / 6;
    return (
      <svg width={chordColumnWidth} height={this.props.tableRowHeight}>
        <line
          style={{
            stroke: '#ddd', // Bootstrap table border color.
            strokeWidth: 1,
          }}
          x1={0}
          x2={chordColumnWidth}
          y1={this.props.tableRowHeight}
          y2={0}
        />
        <text style={{textAnchor: 'start'}} x={padding} y={25}>
          {barChords[0].rendered}
        </text>
        <text style={{textAnchor: 'end'}} x={chordColumnWidth - padding} y={50}>
          {barChords[1].rendered}
        </text>
      </svg>
    );
  },
});


module.exports = ChartGrid;
