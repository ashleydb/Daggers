import React from 'react';
import {Link, browserHistory} from 'react-router';
var { connect } = require('react-redux');
import adminComponent from 'AdminMessage';
import PagesEditForm from 'PagesEditForm';
import { actions } from 'actions';
import * as PagesAPI from 'PagesAPI';

export class PagesEdit extends React.Component {
    // Need to override the constructor to set the initial state and do data binding
    constructor(props) {
        // Call the parent constructor with the props object we automatically get
        super(props);
        // BINDING: Keep 'this' scoped to this object in any handlers
        this.handleSavePage = this.handleSavePage.bind(this);
    }
    componentWillMount() {
        this.props.dispatch(actions.pages.fetchPagesIfNeeded());
    }
    handleSavePage(page) {
        this.props.dispatch(actions.pages.submitPage(page, this.props.login.token));

        // TODO: Not great, since write could fail and then we've gone away from the form's contents
        browserHistory.push('/admin/pages');
    }
    render() {
        // Are we editing at a page right now, or about to?
        var { pageId } = this.props.params;
        var { pages, status } = this.props.pages;
        var page = PagesAPI.getPage(pageId, pages);

        if (status.isFetching) {
            return (
                <div>
                    <div className="callout">
                        <h5>Loading</h5>
                        <p>Please wait while we get the pages...</p>
                    </div>
                </div>
            );
        } else if (pageId == "new" || (page.id && page.id == pageId)) {
            return (
                <div>
                    <PagesEditForm page={page} onSavePage={this.handleSavePage} token={this.props.login.token} />
                </div>
            );
        } else if (pages && pages.length > 0) {
            // Show a list of pages to edit

            var errorMessage = status.error === undefined ? null : (
                <div className="callout alert">
                    <h5>Error</h5>
                    <p>{status.error}</p>
                </div>
            );

            // TODO: Improve rendering here. Show as a table with titles/dates and buttons to view/edit/delete
            //  Create New can be at the top.
            //  Add pagination, (see below,) links to load pages for a given day/week/month/year/season or just a "Load More" button?
            /*
            <ul className="pagination text-center" role="navigation" aria-label="Pagination">
              <li className="pagination-previous disabled">Previous</li>
              <li className="current"><span className="show-for-sr">You're on page</span> 1</li>
              <li><a href="#" aria-label="Page 2">2</a></li>
              <li><a href="#" aria-label="Page 3">3</a></li>
              <li><a href="#" aria-label="Page 4">4</a></li>
              <li className="ellipsis"></li>
              <li><a href="#" aria-label="Page 12">12</a></li>
              <li><a href="#" aria-label="Page 13">13</a></li>
              <li className="pagination-next"><a href="#" aria-label="Next page">Next</a></li>
            </ul>
            */
            return (
                <div>
                    {errorMessage}
                    <ul>
                        {pages.map(page => (
                            <li key={page.id}>
                                <Link to={`/admin/pages/${page.id}`}>{page.name}</Link>
                            </li>
                        ))}

                        <li key="new">
                            <Link to={`/admin/pages/new`}><i className="fi-plus"></i> Create New</Link>
                        </li>
                    </ul>
                </div>
            );
        } else {
            return (
                <div>
                    <div className="callout alert">
                        <h5>Error</h5>
                        <p>No pages found.</p>
                        <Link to={`/admin/pages/new`}><i className="fi-plus"></i> Create New</Link>
                    </div>
                </div>
            );
        }
    }
};

export default connect(
    (state) => {
        return {
            pages: state.pages,
            login: state.login
        };
    })(adminComponent(PagesEdit));
