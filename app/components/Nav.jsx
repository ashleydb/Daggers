import React from 'react';
import {Link, IndexLink} from 'react-router';

export default class Nav extends React.Component {
    // Need to override the constructor to set the initial state and do data binding
    constructor(props) {
        // Call the parent constructor with the props object we automatically get
        super(props);
    }
    render() {
        return (
            <div>
                <div className="title-bar" data-responsive-toggle="nav-menu" data-hide-for="medium">
                    <button className="menu-icon" type="button" data-toggle="nav-menu"></button>
                    <div className="title-bar-title">D&amp;R</div>
                </div>

                <div className="top-bar" id="nav-menu">
                    <div className="top-bar-left">
                        <ul className="vertical medium-horizontal menu club-nav">
                            <li className="menu-text">
                                <IndexLink to="/">
                                    <img src={`https://{-{gcp.storageBucket}-}.storage.googleapis.com/basics/clublogo.png`} alt="Dagenham & Redbridge FC Logo" className="nav-image"/>
                                </IndexLink>
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
};
