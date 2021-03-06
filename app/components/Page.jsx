import React from 'react';
var {connect} = require('react-redux');
import {Helmet} from 'react-helmet';
import {actions} from 'actions';
import * as PagesAPI from 'PagesAPI';

// Page is a Component to render essentially static content.
// Render this from a Component like Tickets with a name prop for the relevant Firebase entry under pages.
export class Page extends React.Component {
    // Need to override the constructor to set the initial state and do data binding
    constructor(props) {
        // Call the parent constructor with the props object we automatically get
        super(props);
    }
    componentWillMount() {
        this.props.dispatch(actions.pages.fetchPagesIfNeeded());
    }
    componentDidMount () {
        window.scrollTo(0, 0);
    }
    render() {
        var {pages, status} = this.props.pages;
        
        if (status.isFetching) {
            return (
                <div>
                    <div className="callout">
                      <h5>Loading</h5>
                      <p>Please wait while we get the page...</p>
                    </div>
                </div>
            );
        } else if (!pages || pages.length < 1) {
            return (
                <div>
                    <div className="callout alert">
                      <h5>Error</h5>
                      <p>No pages found.</p>
                    </div>
                </div>
            );
        } else {
            // Either use the pageId passed in from a parent component, or take the one from our URL
            var pageId = this.props.pageId || this.props.params.pageId;
            var page = PagesAPI.getPage(pageId, pages);
            return page ? (
                    <div>
                        <Helmet>
                            <title>{page.name}</title>
                            <meta name="description" content={page.name} />
                            <meta property="og:title" content={page.name + " | Dagenham &amp; Redbridge FC"} />
                            <meta property="og:description" content={page.name} />
                            {/*<meta property="og:image" content={image} />*/}
                            <meta property="og:url" content={"https://www.daggers.co.uk/page/" + page.id} />
                        </Helmet>
                        <div dangerouslySetInnerHTML={{ __html: page.content }}></div>
                    </div>
                ) : (
                    <div>
                        <div className="callout alert">
                        <h5>Error</h5>
                        <p>Content not found.</p>
                        </div>
                    </div>
                );
        }
    }
};

export default connect(
  (state) => {
    return {
        pages: state.pages
    };
  })(Page);
