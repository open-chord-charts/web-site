'use strict';


var React = require('react');


var Chart = React.createClass({
  propTypes: {
    parts: React.PropTypes.object.isRequired,
    structure: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  },
  render: function() {
    return (
      <div>
        {
          this.props.structure.map((partName, idx) => (
            <div key={idx}>
              {partName + ': ' + JSON.stringify(this.props.parts[partName])}
            </div>
          ))
        }
      </div>
    );
  }
});


module.exports = Chart;
