/** @jsx React.DOM */
'use strict';


var React = require('react');

var model = require('../model');


var ChartGrid = React.createClass({
  propTypes: {
    chartKey: React.PropTypes.string.isRequired,
    edited: React.PropTypes.bool,
    onChordChange: React.PropTypes.func.isRequired,
    partNameColumnWidth: React.PropTypes.number.isRequired,
    parts: React.PropTypes.object.isRequired,
    structure: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    tableRowHeight: React.PropTypes.number.isRequired,
    width: React.PropTypes.number.isRequired,
  },
  getDefaultProps: function() {
    return {
      partNameColumnWidth: 30,
      tableRowHeight: 60,
    };
  },
  handleCellKeyPress: function(evt, idx, partName) {
    var newChordStr = evt.key;
    var chartKeyIndex = model.chromaticKeys.indexOf(this.props.chartKey);
    var newChordIndex = model.chromaticKeys.indexOf(newChordStr);
    var newChordDegree = (newChordIndex - chartKeyIndex) % model.chromaticKeys.length;
    var chord = this.props.parts[partName][idx];
    var newChord = {
      alterations: chord.alterations,
      degree: newChordDegree,
      duration: chord.duration,
    };
    this.props.onChordChange(newChord, idx, partName);
  },
  render: function() {
    var chordColumnWidth = (this.props.width - this.props.partNameColumnWidth) / 8;
    return (
      <table className='table table-bordered' style={{width: 'initial'}}>
        <tbody>
          {this.props.structure.map((partName, idx) => this.renderPart(partName, idx, chordColumnWidth))}
        </tbody>
      </table>
    );
  },
  renderCell: function(cellChords, idx, chordColumnWidth, partName) {
    var renderedCellChords = cellChords.map(this.renderChord);
    return this.props.edited ? (
      <input
        className='text-center'
        onKeyPress={(evt) => this.handleCellKeyPress(evt, idx, partName)}
        readOnly
        style={{
          border: 'none',
          height: this.props.tableRowHeight - 1,
          width: chordColumnWidth - 1,
        }}
        type='text'
        value={renderedCellChords.join(' / ')}
      />
    ) : (
      renderedCellChords.length === 1 ? (
        <div className='text-center'>
          {renderedCellChords[0]}
        </div>
      ) : (
        this.renderSplitCell(renderedCellChords, chordColumnWidth)
      )
    );
  },
  renderChord: function(chord) {
    var chartKeyIndex = model.chromaticKeys.indexOf(this.props.chartKey);
    var chordStr = model.chromaticKeys[(chartKeyIndex + chord.degree) % model.chromaticKeys.length];
    if (chord.alterations) {
      chordStr += chord.alterations.join();
    }
    return chordStr;
  },
  renderPart: function(partName, idx, chordColumnWidth) {
    var cells = model.chordsToCells(this.props.parts[partName]);
    return (
      <tr key={idx} style={{height: this.props.tableRowHeight}}>
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
          cells.map((cellChords, idx) => (
            <td
              key={idx}
              style={{
                height: this.props.tableRowHeight,
                lineHeight: 0,
                padding: 0,
                minWidth: chordColumnWidth,
                verticalAlign: 'middle',
              }}
            >
              {this.renderCell(cellChords, idx, chordColumnWidth, partName)}
            </td>
          )
        )}
      </tr>
    );
  },
  renderSplitCell: function(renderedCellChords, chordColumnWidth) {
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
          {renderedCellChords[0]}
        </text>
        <text style={{textAnchor: 'end'}} x={chordColumnWidth - padding} y={50}>
          {renderedCellChords[1]}
        </text>
      </svg>
    );
  },
});


module.exports = ChartGrid;
