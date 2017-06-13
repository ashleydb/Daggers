import React from 'react';
import {Link, IndexLink} from 'react-router';
import Banner from 'Banner';

export default class Nav extends React.Component {
    // Need to override the constructor to set the initial state and do data binding
    constructor(props) {
        // Call the parent constructor with the props object we automatically get
        super(props);
    }
    render() {
        return (
            <div className="logo-bar">
                <div className="row logo-bar small-collapse">
                    <div className="small-6 columns">
                        <IndexLink to="/">
                            <img src="https://{-{gcp.storageBucket}-}.storage.googleapis.com/images/header-left.png" alt="Dagenham & Redbridge FC Logo" className="nav-banner"/>
                        </IndexLink>
                    </div>
                    <div className="small-6 columns">
                        <Banner />
                    </div>
                </div>

                <div className="title-bar" data-responsive-toggle="nav-menu" data-hide-for="medium">
                    <button className="menu-icon" type="button" data-toggle="nav-menu"></button>
                    <div className="title-bar-title">D&amp;R</div>
                </div>

                <div className="top-bar" id="nav-menu">
                    <div className="top-bar-left">
                        <ul className="vertical medium-horizontal menu club-nav">
                            <li><IndexLink to="/" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>HOME</IndexLink></li>
                            <li><Link to="/news" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>NEWS</Link></li>
                            <li><Link to="/fixtures" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>FIXTURES &amp; RESULTS</Link></li>
                            <li><Link to="/table" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>TABLE</Link></li>
                            <li><Link to="/tickets" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>TICKETS</Link></li>
                            <li><Link to="/team" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>TEAM</Link></li>
                            <li><Link to="/fans" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>FANS</Link></li>
                            <li><Link to="/community" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>COMMUNITY</Link></li>
                            <li><Link to="/club" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>CLUB</Link></li>
                            <li><Link to="/commercial" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>COMMERCIAL</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
};
