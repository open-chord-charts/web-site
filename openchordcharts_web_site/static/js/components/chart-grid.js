'use strict';


var React = require('react');

var model = require('../model');


var ChartGrid = React.createClass({
  propTypes: {
    chartKey: React.PropTypes.string.isRequired,
    edited: React.PropTypes.bool,
    fontSize: React.PropTypes.string.isRequired,
    parts: React.PropTypes.object.isRequired,
    structure: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    tableColumnWidth: React.PropTypes.number.isRequired,
    tableRowHeight: React.PropTypes.number.isRequired,
  },
  getDefaultProps: function() {
    return {
      fontSize: '1.6em',
      tableColumnWidth: 90,
      tableRowHeight: 60,
    };
  },
  handleCellChange: function(evt) {
    console.log(evt);
  },
  render: function() {
    return (
      <table className='table table-bordered' style={{width: 'initial'}}>
        <tbody>
          {this.props.structure.map(this.renderPart)}
        </tbody>
      </table>
    );
  },
  renderCell: function(cellChords) {
    var renderedCellChords = cellChords.map(this.renderChord);
    return this.props.edited ? (
      <input
        className='text-center'
        onChange={this.handleCellChange}
        style={{
          border: 'none',
          height: this.props.tableRowHeight - 1,
          width: this.props.tableColumnWidth - 1,
        }}
        type='text'
        value={renderedCellChords.join(' / ')}
      />
    ) : (
      renderedCellChords.length === 1 ? (
        <div className='text-center' style={{fontSize: this.props.fontSize}}>
          {renderedCellChords[0]}
        </div>
      ) : (
        <svg width={this.props.tableColumnWidth} height={this.props.tableRowHeight}>
          <line
            style={{
              stroke: '#ddd', // Bootstrap table border color.
              strokeWidth: 1,
            }}
            x1={this.props.tableColumnWidth}
            x2={0}
            y1={0}
            y2={this.props.tableRowHeight}
          />
          <text style={{fontSize: this.props.fontSize, textAnchor: 'start'}} x={10} y={25}>
            {renderedCellChords[0]}
          </text>
          <text style={{fontSize: this.props.fontSize, textAnchor: 'end'}} x={80} y={50}>
            {renderedCellChords[1]}
          </text>
        </svg>
      )
    );
  },
  renderChord: function(chord) {
    var keyIndex = model.chromaticKeys.indexOf(this.props.chartKey);
    var chordStr = model.chromaticKeys[(keyIndex + chord.degree) % model.chromaticKeys.length];
    if (chord.alterations) {
      chordStr += chord.alterations.join();
    }
    return chordStr;
  },
  renderPart: function(partName, idx) {
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
            width: '3em',
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
                minWidth: this.props.tableColumnWidth,
                verticalAlign: 'middle',
              }}
            >
              {this.renderCell(cellChords)}
            </td>
          )
        )}
      </tr>
    );
  },
});


module.exports = ChartGrid;
