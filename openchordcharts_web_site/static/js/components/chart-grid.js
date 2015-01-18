'use strict';


var React = require('react');

var model = require('../model');


var ChartGrid = React.createClass({
  propTypes: {
    chartKey: React.PropTypes.string.isRequired,
    edited: React.PropTypes.bool,
    parts: React.PropTypes.object.isRequired,
    structure: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
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
    var cellStr = cellChords.map(this.renderChord).join(' / ');
    return this.props.edited ? (
      <input onChange={this.handleCellChange} style={{border: 'none', height: 40, marginLeft: '1em', width: 90}} type='text' value={cellStr} />
    ) : (
      <div style={{padding: '1em'}}>{cellStr}</div>
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
      <tr key={idx}>
        <td style={{fontStyle: 'italic', width: '3em'}}>{partName}</td>
        {
          cells.map((cellChords, idx) => (
            <td key={idx} style={{height: 40, padding: 0, textAlign: 'center', width: 90}}>
              {this.renderCell(cellChords)}
            </td>
          )
        )}
      </tr>
    );
  },
});


module.exports = ChartGrid;
