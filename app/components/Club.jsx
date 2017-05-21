import React from 'react';
import Page from 'Page';

// TODO: All content on this page.

export default class Class extends React.Component {
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

                        <Page pageId='Club' />

                    </div>
                    <div className="columns small-12 large-4">
                        <div className="placeholder-ad">
                            <p>Ads go here</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
