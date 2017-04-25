import React from 'react';
var {connect} = require('react-redux');
import {actions} from 'actions';

// TODO: Add advertising to the layout.
// TODO: How would this page be updated? Pull all content as rich text from a DB?

export class Tickets extends React.Component {
    // Need to override the constructor to set the initial state and do data binding
    constructor(props) {
        // Call the parent constructor with the props object we automatically get
        super(props);
    }
    componentWillMount() {
        this.props.dispatch(actions.pages.fetchPagesIfNeeded());
    }
    render() {
        var {pages, status} = this.props.pages; //TODO: .news shouldn't be needed
        var pageContent = null;
        
        if (status.isFetching) {
            pageContent = (
                <div>
                    <div className="callout">
                      <h5>Loading</h5>
                      <p>Please wait while we get the page...</p>
                    </div>
                </div>
            );
        } else if (!pages || pages.length < 1) {
            pageContent = (
                <div>
                    <div className="callout alert">
                      <h5>Error</h5>
                      <p>No page found.</p>
                    </div>
                </div>
            );
        } else {
            // TODO: Find the right page. Should be by ID 'tickets'? Means restructuring everything...
            pageContent = (
                <div dangerouslySetInnerHTML={{ __html: pages[0].content }}></div>
            )
        }

        return (
            <div>

                <div className="row">
                    <div className="columns small-12 large-8">

                        {pageContent}

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

export default connect(
  (state) => {
    return {
        pages: state.pages
    };
  })(Tickets);

