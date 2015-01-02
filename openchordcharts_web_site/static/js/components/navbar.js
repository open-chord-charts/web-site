'use strict';


var React = require('react/addons'),
  {Link, State} = require('react-router');

var cx = React.addons.classSet;


var NavBar = React.createClass({
  mixins: [State],
  propTypes: {
    loading: React.PropTypes.bool,
    loggedIn: React.PropTypes.bool,
  },
  render: function() {
    var query = this.getQuery();
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
              <li className={cx({active: this.isActive('charts') && ! query.owner})}>
                <Link to='charts'>Home</Link>
              </li>
              <li className={cx({active: this.isActive('about')})}><Link to='about'>About</Link></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              {this.props.loading && <li><p className='navbar-text'>Loading</p></li>}
              {
                this.props.loggedIn ? (
                  <li><Link to='logout'>Sign out</Link></li>
                ) : (
                  <li className={cx({active: this.isActive('login')})}><Link to='login'>Sign in</Link></li>
                )
              }
            </ul>
          </div>
        </div>
      </nav>
    );
  }
});


module.exports = NavBar;
