import React from 'react';
import { Link } from 'react-router';

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
                link: "http://teamsport.jako.de/en/",
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
                link: "http://www.productsandservices.bt.com/products/bt-sport",
                image: "/sponsors/bt-sport.png",
                type: "Official Club Partner"
            },
            {
                name: "Vanarama",
                link: "http://www.vanarama.co.uk/",
                image: "/sponsors/vanarama.jpg",
                type: "Official Club Partner"
            },
            {
                name: "Blackmore Buildings",
                link: "http://www.blackmorebuildings.co.uk/",
                image: "/sponsors/blackmore-building.png",
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

        // TODO: Change news-thumbnail to a class just for sponsors
        return (
            <div className="column column-block">
                <div className="card">
                    <Link to={sponsor.link}>
                        <img src={image} alt={sponsor.name} className="news-thumbnail" />
                    </Link>
                    <div className="card-section">
                        <p>{sponsor.type}</p>
                    </div>
                </div>
            </div>
        );
    }
};
