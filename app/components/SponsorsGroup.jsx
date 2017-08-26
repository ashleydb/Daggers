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
