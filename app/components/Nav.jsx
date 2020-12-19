import React from 'react';
import {Link, IndexLink} from 'next/link';
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
                <div className="row small-collapse menu-centered">
                    <div className="small-6 columns">
                        <IndexLink to="/">
                            <img src="https://{-{gcp.storageBucket}-}.storage.googleapis.com/images/header-logo2019.png" alt="Dagenham & Redbridge FC Logo" className="nav-banner"/>
                        </IndexLink>
                    </div>
                    <div className="small-6 columns">
                        <Banner />
                    </div>
                </div>

                <div className="title-bar" data-responsive-toggle="nav-menu" data-hide-for="large">
                    <button className="menu-icon" type="button" data-toggle="nav-menu"></button>
                    <div className="title-bar-title">D&amp;R</div>
                </div>

                <div className="top-bar" id="nav-menu">
                    <div className="menu-centered">
                        <ul className="vertical large-horizontal menu club-nav">
                            <li><IndexLink to="/" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>HOME</IndexLink></li>
                            <li><Link href="/news" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>NEWS</Link></li>
                            <li><Link href="/fixtures" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>FIXTURES &amp; RESULTS</Link></li>
                            <li><Link href="/table" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>TABLE</Link></li>
                            <li><Link href="/tickets" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>TICKETS</Link></li>
                            <li><Link href="/team" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>TEAM</Link></li>
                            <li><Link href="/fans" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>FANS</Link></li>
                            <li><Link href="/community" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>COMMUNITY</Link></li>
                            <li><Link href="/club" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>CLUB</Link></li>
                            <li><Link href="/commercial" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>COMMERCIAL</Link></li>
                            <li><a href="https://www.daggers-shop.co.uk/">CLUB SHOP</a></li>
                            <li><a href="https://www.youtube.com/user/OfficialDaggers"><i className="fi-social-youtube social-icon-medium social-color-white"></i></a></li>
                            <li><a href="https://www.facebook.com/OfficialDaggers"><i className="fi-social-facebook social-icon-medium social-color-white"></i></a></li>
                            <li><a href="http://twitter.com/dag_redfc"><i className="fi-social-twitter social-icon-medium social-color-white"></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
};
