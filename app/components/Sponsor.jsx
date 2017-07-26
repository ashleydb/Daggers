import React from 'react';
import { Link } from 'react-router';
import LazyLoad from 'react-lazyload';
import PlaceholderComponent from 'Placeholder';

// TODO: Have this pull from a DB? Or at least and external JSON file...
//  Make a Sponsors component that owns the data and renders a group of these?

// Shows a thumbnail for a sponsor with a link to their website.
//  sponsorId: Index of this.sponsors to use, (currently 0-7)
//  <Sponsor sponsorId={0} />
export default class Sponsor extends React.Component {
    // Need to override the constructor to set the initial state and do data binding
    constructor(props) {
        // Call the parent constructor with the props object we automatically get
        super(props);

        this.sponsors = [
            {
                name: "The National League",
                link: "https://www.thenationalleague.org.uk/",
                image: "/sponsors/the-national-league.jpg",
                type: "Official Club Partner"
            },
            {
                name: "West &amp; Coe",
                link: "http://www.westandcoe.com/",
                image: "/sponsors/west-and-coe.png",
                type: "Official Club Partner"
            },
            {
                name: "Chigwell Construction",
                link: "http://www.chigwellconstruction.co.uk/",
                image: "/sponsors/chigwell-construction.jpg",
                type: "Official Club Partner"
            },
            {
                name: "JAKO",
                link: "https://www.jako.ie/",
                image: "/sponsors/jako.png",
                type: "Official Club Partner"
            },
            {
                name: "Sports 360",
                link: "http://www.sports360.co.uk/",
                image: "/sponsors/sports360.png",
                type: "Official Club Partner"
            },
            {
                name: "BT Sport",
                link: "http://sport.bt.com/",
                image: "/sponsors/bt-sport.png",
                type: "Official Club Partner"
            },
            {
                name: "Vanarama",
                link: "http://www.vanarama.co.uk/",
                image: "/sponsors/vanarama.jpg",
                type: "Official Club Partner"
            }
        ];
    }
    render() {
        var { sponsorId } = this.props;
        var sponsor = this.sponsors[sponsorId];

        if (!sponsor)
            return (<div className="column column-block"></div>);

        var image = `https://{-{gcp.storageBucket}-}.storage.googleapis.com${sponsor.image}`;

        var name = sponsor.name.replace('&amp;', '&');

        // TODO: Change news-thumbnail to a class just for sponsors
        return (
            <div className="column column-block">
                <div className="card">
                    <a href={sponsor.link}>
                        <LazyLoad placeholder={<PlaceholderComponent />}>
                            <img src={image} alt={name} className="news-thumbnail" />
                        </LazyLoad>
                    </a>
                    <div className="card-section">
                        <p>{sponsor.type}: <a href={sponsor.link}>{name}</a></p>
                    </div>
                </div>
            </div>
        );
    }
};
