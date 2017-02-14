var React = require('react');
var {Link, IndexLink} = require('react-router');

//Component with some logic, since we handle searches in the Nav bar.
//Uses foundation for styling the elements.
var Nav = React.createClass({
    
//    componentDidMount: function() {
//        $(document).foundation();
//    },
    
  render: function() {
    return (
        
//        <div className="top-bar">
//  <div className="top-bar-title">
//    <span data-responsive-toggle="responsive-menu" data-hide-for="medium">
//      <button className="menu-icon dark" type="button" data-toggle></button>
//    </span>
//    <strong>D&amp;R</strong>
//  </div>
//  <div id="responsive-menu">
//    <div className="top-bar-left">
//      <ul className="dropdown menu" data-dropdown-menu>
//        <li>
//          <a href="#">One</a>
//          <ul className="menu vertical">
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
//        <ul className="menu vertical">
//          <li><Link to="fixtures">Fixtures</Link></li>
//          <li><Link to="fixtures">Results</Link></li>
//          <li><Link to="fixtures">League Table</Link></li>
//        </ul>
//    </li>
        
        
        
    <div>
        
      <div className="title-bar" data-responsive-toggle="nav-menu" data-hide-for="medium">
        <button className="menu-icon" type="button" data-toggle="nav-menu"></button>
        <div className="title-bar-title">D&amp;R</div>
      </div>
        
      <div className="top-bar" id="nav-menu">
        <div className="top-bar-left">
          <ul className="vertical medium-horizontal dropdown menu club-nav" data-dropdown-menu>
            <li className="menu-text">
                <img src="images/clublogo.png" alt="Dagenham & Redbridge FC Logo" className="nav-image"/>
            </li>
              
            <li><IndexLink to="/" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Home</IndexLink></li>
            <li><Link to="news" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>News</Link></li>
            <li><Link to="fixtures" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Fixtures &amp; Results</Link></li>
              
              <li><Link to="tickets" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Tickets</Link></li>
              
              <li>
                  <Link to="team" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Team</Link>
                  <ul className="menu club-nav">
                      <li><Link to="team">Player Profiles</Link></li>
                      <li><Link to="team">Staff Profiles</Link></li>
                      <li><Link to="team">Academy</Link></li>
                      <li><Link to="team">Academy Staff Profiles</Link></li>
                      <li><Link to="team">Scholar Profiles</Link></li>
                      <li><Link to="team">Academy U16-U9</Link></li>
                      <li><Link to="team">Player Recruitment</Link></li>
                      <li><Link to="team">Academy Fixtures</Link></li>
                      <li><Link to="team">College Academy</Link></li>
                  </ul>
              </li>
              
              <li><Link to="fans" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Fans</Link></li>
              <li><Link to="club" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Club</Link></li>
              <li><Link to="commercial" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Commercial</Link></li>
          </ul>
        </div>
      </div>            
            
    </div>
        
        
        
//    <div>
//        <div className="top-bar">
//            <div className="top-bar-title">
//                <ul className="dropdown menu">
//                    <li className="menu-text">
//                        <span data-responsive-toggle="responsive-menu" data-hide-for="medium">
//                            <button className="menu-icon dark" type="button" data-toggle></button>
//                        </span>
//                        <strong>Site Title</strong>
//                    </li>
//                </ul>
//            </div>
//            <div id="responsive-menu">
//                <div className="top-bar-left">
//                    <ul className="dropdown menu" data-dropdown-menu>
//                        <li>
//                            <a href="#">One</a>
//                            <ul className="menu vertical">
//                                <li><a href="#">A</a></li>
//                                <li><a href="#">B</a></li>
//                                <li><a href="#">C</a></li>
//                            </ul>
//                        </li>
//                        <li><a href="#">Two</a></li>
//                        <li><a href="#">Three</a></li>
//                    </ul>
//                </div>
//            </div>
//        </div>
//    </div>
        
        
//<div className="off-canvas-wrapper">
//  <div className="off-canvas-wrapper-inner" data-off-canvas-wrapper>
//      
//    <!-- off-canvas title bar for 'small' screen -->
//    <div className="title-bar" data-responsive-toggle="widemenu" data-hide-for="medium">
//      <div className="title-bar-left">
//        <button className="menu-icon" type="button" data-open="offCanvasLeft"></button>
//        <span className="title-bar-title">Foundation</span>
//      </div>
//    </div>
//
//    <!-- off-canvas left menu -->
//    <div className="off-canvas position-left" id="offCanvasLeft" data-off-canvas>
//      <ul className="vertical dropdown menu" data-dropdown-menu>
//        <li><a href="left_item_1">Left item 1</a></li>
//        <li><a href="left_item_2">Left item 2</a></li>
//        <li><a href="left_item_3">Left item 3</a></li>
//      </ul>
//    </div>
//
//    <!-- "wider" top-bar menu for 'medium' and up -->
//    <div id="widemenu" className="top-bar">
//      <div className="top-bar-left">
//        <ul className="dropdown menu" data-dropdown-menu>
//          <li className="menu-text">Foundation</li>
//          <li className="has-submenu">
//            <a href="#">Item 1</a>
//            <ul className="menu submenu vertical" data-submenu>
//              <li><a href="left_wide_11">Left wide 1</a></li>
//              <li><a href="left_wide_12">Left wide 2</a></li>
//              <li><a href="left_wide_13">Left wide 3</a></li>
//            </ul>
//          </li>
//          <li className="has-submenu">
//            <a href="#">Item 2</a>
//            <ul className="menu submenu vertical" data-submenu>
//              <li><a href="left_wide_21">Left wide 1</a></li>
//              <li><a href="left_wide_22">Left wide 2</a></li>
//              <li><a href="left_wide_23">Left wide 3</a></li>
//            </ul>
//          </li>
//        </ul>
//      </div>
//    </div>
//
//    <!-- original content goes in this container -->
//    <div className="off-canvas-content" data-off-canvas-content>
//      <div className="row column">
//        <img src="http://placehold.it/2000x3000" alt="" />
//      </div>
//    </div>
//
//  <!-- close wrapper, no more content after this -->
//  </div>
//</div>
        
    );
  }
});

module.exports = Nav;
