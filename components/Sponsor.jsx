import React from 'react';
import {Link} from 'next/link';
import LazyLoad from 'react-lazyload';
import PlaceholderComponent from './Placeholder';
import {gcpStorageBucket} from '../utils/constants';

// Shows a thumbnail for a sponsor with a link to their website.
//  sponsor: Sponsor data to use, for example:
//        {
//            id: 23jrbwkjbrwkjq4lbt
//            name: "The National League",
//            link: "https://www.thenationalleague.org.uk/",
//            image: "/sponsors/the-national-league.jpg",
//            type: "Official Club Partner"
//        }
//  <Sponsor sponsor={sponsorData} />
export default class Sponsor extends React.Component {
    // Need to override the constructor to set the initial state and do data binding
    constructor(props) {
        // Call the parent constructor with the props object we automatically get
        super(props);
    }
    render() {
        var { sponsor } = this.props;

        if (!sponsor)
            return (<div className="column column-block"></div>);

        var image = `https://${gcpStorageBucket}.storage.googleapis.com${sponsor.image}`;

        var name = sponsor.name.replace('&amp;', '&');

        // TODO: Change news-thumbnail to a class just for sponsors
        return (
            <div className="column column-block" key={sponsor.id}>
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
