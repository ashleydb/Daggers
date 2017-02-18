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
            <div>
                <div className="title-bar" data-responsive-toggle="nav-menu" data-hide-for="medium">
                    <button className="menu-icon" type="button" data-toggle="nav-menu"></button>
                    <div className="title-bar-title">D&amp;R</div>
                </div>

                <div className="top-bar" id="nav-menu">
                    <div className="top-bar-left">
                        <ul className="vertical medium-horizontal dropdown menu club-nav" data-dropdown-menu>
                            <li className="menu-text">
                                <img src="/images/clublogo.png" alt="Dagenham & Redbridge FC Logo" className="nav-image"/>
                            </li>

                            <li><IndexLink to="/" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Home</IndexLink></li>
                            <li><Link to="/news" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>News</Link></li>
                            <li><Link to="/fixtures" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Fixtures &amp; Results</Link></li>
                            <li><Link to="/tickets" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Tickets</Link></li>
                            <li><Link to="/team" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Team</Link></li>
                            <li><Link to="/fans" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Fans</Link></li>
                            <li><Link to="/club" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Club</Link></li>
                            <li><Link to="/commercial" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Commercial</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Nav;
