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


var {Paper} = require('material-ui');
var React = require('react');


var List = React.createClass({
  propTypes: {
    items: React.PropTypes.arrayOf(React.PropTypes.shape({
      title: React.PropTypes.string,
    })).isRequired,
    onTouchTap: React.PropTypes.func,
  },
  render() {
    return (
      <ul className='mui-list'>
        {
          this.props.items.map((item, idx) => {
            return (
              <li
                className='mui-list-item'
                key={idx}
                onTouchTap={this.props.onTouchTap ? () => this.props.onTouchTap(item) : null}
              >
                {
                  item.image && (
                    <div className='icon'>
                      <Paper circle={true} style={{overflow: 'hidden', height: 31}} zDepth={0}>
                        <img src={item.image} />
                      </Paper>
                    </div>
                  )
                }
                <div className='content'>
                  <div className='title'>{item.title}</div>
                </div>
              </li>
            );
          })
        }
      </ul>
    );
  },
});


module.exports = List;
