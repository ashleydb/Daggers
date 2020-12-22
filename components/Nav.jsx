import React from 'react';
import Link from 'next/link';
import Banner from './Banner';
import {gcpStorageBucket} from '../utils/constants';

//const Nav = (props) =>  {
class Nav extends React.Component {
    render() {
        return (
            <div className="logo-bar">
                <div className="row small-collapse menu-centered">
                    <div className="small-6 columns">
                    <Link href="/">
                        <img src={`https://${gcpStorageBucket}.storage.googleapis.com/images/header-logo2019.png`} alt="Dagenham & Redbridge FC Logo" className="nav-banner"/>
                    </Link>
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
                            <li><Link href="/" activeClassName="active" activeStyle={{fontWeight: 'bold'}}><a>HOME</a></Link></li>
                            <li><Link href="/news" activeClassName="active" activeStyle={{fontWeight: 'bold'}}><a>NEWS</a></Link></li>
                            <li><Link href="/fixtures" activeClassName="active" activeStyle={{fontWeight: 'bold'}}><a>FIXTURES &amp; RESULTS</a></Link></li>
                            <li><Link href="/table" activeClassName="active" activeStyle={{fontWeight: 'bold'}}><a>TABLE</a></Link></li>
                            <li><Link href="/tickets" activeClassName="active" activeStyle={{fontWeight: 'bold'}}><a>TICKETS</a></Link></li>
                            <li><Link href="/team" activeClassName="active" activeStyle={{fontWeight: 'bold'}}><a>TEAM</a></Link></li>
                            <li><Link href="/fans" activeClassName="active" activeStyle={{fontWeight: 'bold'}}><a>FANS</a></Link></li>
                            <li><Link href="/community" activeClassName="active" activeStyle={{fontWeight: 'bold'}}><a>COMMUNITY</a></Link></li>
                            <li><Link href="/club" activeClassName="active" activeStyle={{fontWeight: 'bold'}}><a>CLUB</a></Link></li>
                            <li><Link href="/commercial" activeClassName="active" activeStyle={{fontWeight: 'bold'}}><a>COMMERCIAL</a></Link></li>
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

export default Nav;
