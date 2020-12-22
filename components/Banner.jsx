import React from 'react';
var {connect} = require('react-redux');
//import {Link} from 'next/link';
import {actions} from '../actions/actions';
import {gcpStorageBucket} from '../utils/constants';

// Banner is a Component to render essentially static content.
export class Banner extends React.Component {
    // Need to override the constructor to set the initial state and do data binding
    constructor(props) {
        // Call the parent constructor with the props object we automatically get
        super(props);
    }
    componentDidMount() {
        this.props.dispatch(actions.banner.fetchBannerIfNeeded());
    }
    render() {
        var {banner} = this.props.banner;

        var bannerElement = null;
        if (banner && banner.image) {
            bannerElement = (<img src={`https://${gcpStorageBucket}.storage.googleapis.com${banner.image}`} alt={banner.description} className="nav-banner"/>);

            if (banner.link) {
                bannerElement = (
                    <a href={banner.link}>
                        {bannerElement}
                    </a>
                );
            }
        }

        return bannerElement;
    }
};

export default connect(
  (state) => {
    return {
        banner: state.banner
    };
  })(Banner);
