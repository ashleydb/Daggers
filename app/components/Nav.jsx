var React = require('react');
var {Link, IndexLink} = require('react-router');

//Component with some logic, since we handle searches in the Nav bar.
//Uses foundation for styling the elements.
var Nav = React.createClass({
  render: function() {
    return (
        
//        <div class="top-bar">
//  <div class="top-bar-title">
//    <span data-responsive-toggle="responsive-menu" data-hide-for="medium">
//      <button class="menu-icon dark" type="button" data-toggle></button>
//    </span>
//    <strong>D&amp;R</strong>
//  </div>
//  <div id="responsive-menu">
//    <div class="top-bar-left">
//      <ul class="dropdown menu" data-dropdown-menu>
//        <li>
//          <a href="#">One</a>
//          <ul class="menu vertical">
//            <li><a href="#">One</a></li>
//            <li><a href="#">Two</a></li>
//            <li><a href="#">Three</a></li>
//          </ul>
//        </li>
//        <li><a href="#">Two</a></li>
//        <li><a href="#">Three</a></li>
//      </ul>
//    </div>
//  </div>
//</div>
        
        
//    <li>
//        <Link to="fixtures" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Fixtures &amp; Results</Link>
//              
//        <ul class="menu vertical">
//          <li><Link to="fixtures">Fixtures</Link></li>
//          <li><Link to="fixtures">Results</Link></li>
//          <li><Link to="fixtures">League Table</Link></li>
//        </ul>
//    </li>
        
        
      <div className="top-bar">
        <div className="top-bar-left">
          <ul className="menu club-nav">
            <li className="menu-text">
                <img src="images/clublogo.png" alt="Dagenham & Redbridge FC Logo" className="nav-image"/>
            </li>
              
            <li><IndexLink to="/" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Home</IndexLink></li>
            <li><Link to="news" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>News</Link></li>
            <li><Link to="fixtures" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Fixtures &amp; Results</Link></li>
              
              <li><Link to="tickets" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Tickets</Link></li>
              <li><Link to="team" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Team</Link></li>
              <li><Link to="fans" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Fans</Link></li>
              <li><Link to="club" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Club</Link></li>
              <li><Link to="commercial" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Commercial</Link></li>
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = Nav;
