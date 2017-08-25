import React from 'react';
var {connect} = require('react-redux');
import {actions} from 'actions';
import Sponsor from 'Sponsor';

// Shows a grid of Sponsors in a row. Adjusts to the number of Sponsors available.
export class SponsorsGroup extends React.Component {
    // Need to override the constructor to set the initial state and do data binding
    constructor(props) {
        // Call the parent constructor with the props object we automatically get
        super(props);

        // TODO: Remove this hardcoded array
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
    componentWillMount() {
        this.props.dispatch(actions.sponsors.fetchSponsorsIfNeeded());
    }
    render() {
        var {sponsors, status} = this.props.sponsors;

        if (status.isFetching) {
            return (
                <div>
                    <div className="callout">
                      <h5>Loading</h5>
                      <p>Please wait while we get the sponsors...</p>
                    </div>
                </div>
            );
        } else if (!sponsors || sponsors.length < 1) {
            return (
                <div>
                </div>
            );
        } else {
            let output = [];
            sponsors.forEach(function(sponsor) {
                output.push(<Sponsor sponsor={sponsor} />);
            }, this);

            let classString = '';
            let numSponsors = sponsors.length;
            if (numSponsors <= 4) {
                classString = 'row small-up-4';
            } else if (numSponsors == 5) {
                classString = 'row small-up-3 large-up-5';
            } else if (numSponsors == 6) {
                classString = 'row small-up-3 large-up-6';
            } else if (numSponsors == 7) {
                classString = 'row small-up-4 large-up-7';
            } else if (numSponsors >= 8) {
                classString = 'row small-up-4 large-up-8';
            } 

            return (
                <div className={classString}>
                    {output}
                </div>
            );
        }
    }
};

export default connect(
  (state) => {
    return {
        sponsors: state.sponsors
    };
  })(SponsorsGroup);
