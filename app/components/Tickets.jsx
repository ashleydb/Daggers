import React from 'react';
var {connect} = require('react-redux');
import {actions} from 'actions';
import Page from 'Page';

// TODO: Add advertising to the layout.

export default class Tickets extends React.Component {
    // Need to override the constructor to set the initial state and do data binding
    constructor(props) {
        // Call the parent constructor with the props object we automatically get
        super(props);
    }
    render() {
        return (
            <div>
                <div className="row">
                    <div className="columns small-12 large-8">

                        <Page pageId='Tickets' />

                    </div>
                    <div className="columns small-12 large-4">
                        <div className="placeholder-ad">
                            <p>Ads go here</p>
                        </div>

                        <div className="placeholder-ad">
                            <p>Ads go here</p>
                        </div>

                        <div className="placeholder-ad">
                            <p>Ads go here</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};
