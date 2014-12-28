'use strict';


var React = require('react/addons'),
  {Link, State} = require('react-router');

var cx = React.addons.classSet;


var NavBar = React.createClass({
  mixins: [State],
  render: function() {
    return (
      <nav className="navbar navbar-default navbar-static-top">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link className="navbar-brand" to='charts'>Open Chord Charts</Link>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
              <li className={cx({active: this.isActive('charts')})}><Link to='charts'>Home</Link></li>
              <li className={cx({active: this.isActive('about')})}><Link to='about'>About</Link></li>
            </ul>
            {
              /*
              <ul className="nav navbar-nav navbar-right">
                <li><Link to='login'>Login</Link></li>
              </ul>
              */
            }
          </div>
        </div>
      </nav>
    );
  }
});


module.exports = NavBar;
