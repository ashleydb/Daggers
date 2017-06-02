import React from 'react';
import {Link, browserHistory} from 'react-router';
var { connect } = require('react-redux');
import { swal } from 'react-redux-sweetalert2';
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
        this.promptRemovePage = this.promptRemovePage.bind(this);
        this.handleRemovePage = this.handleRemovePage.bind(this);
        this.props.showAlert.bind(this);
    }
    componentWillMount() {
        this.props.dispatch(actions.pages.fetchPagesIfNeeded());
    }
    handleSavePage(page) {
        this.props.dispatch(actions.pages.submitPage(page, this.props.login.token));

        // TODO: Not great, since write could fail and then we've gone away from the form's contents
        browserHistory.push('/admin/pages');
    }
    promptRemovePage(page) {
        // TODO: Not sure how to do binding here, so I'll hack it with 'that'
        var that = this;
		this.props.showAlert({
            title: 'Are you sure?',
            text: `Delete "${page.name}"? You won't be able to revert this!`,
            type: 'warning',
            allowOutsideClick: false,
            showCancelButton: true,
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            confirmButtonColor: '#3085d6',
            showLoaderOnConfirm: true,
            cancelCallback: () => {},
            preConfirm: () => {
                return new Promise(function (resolve) {
                    that.handleRemovePage(page.id);
                    resolve();
                });
            }
        });
    }
    handleRemovePage(id) {
        this.props.dispatch(actions.pages.removePage(id, this.props.login.token));
    }
    render() {
        // Are we editing at a page right now, or about to?
        var { pageId } = this.props.params;
        var { pages, status } = this.props.pages;
        var page = PagesAPI.getPage(pageId, pages) || PagesAPI.DEFAULT_PAGE;

        if (status.isFetching) {
            return (
                <div>
                    <div className="callout">
                        <h5>Loading</h5>
                        <p>Please wait while we get the pages...</p>
                    </div>
                </div>
            );
        } else if (page.id == pageId) {
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

            // Show as a table with titles/dates and buttons to view/edit/delete
            // TODO: View button doesn't work for Tickets since the route (currently) isn't /pages/Tickets, just /Tickets.
            // TODO: Make the delete button work, or add one to the edit form.
            var contentRows = pages.map((page) => {
                return (
                    <tr key={page.id}>
                        <td><Link to={`/admin/pages/${page.id}`}>{page.name}</Link></td>
                        <td><Link to={`/pages/${page.id}`} className="button"><i className="fi-eye"></i> View</Link></td>
                        <td><Link to={`/admin/pages/${page.id}`} className="button"><i className="fi-pencil"></i> Edit</Link></td>
                        <td><button className="button" onClick={() => this.promptRemovePage(page)}><i className="fi-x"></i> Delete</button></td>
                    </tr>
                );
            });

            return (
                <div>
                    {errorMessage}
                    <Link to={`/admin/pages/new`} className="button expanded"><i className="fi-plus"></i> Create New</Link>
                    <table className="hover">
                        <tbody>
                            {contentRows}
                        </tbody>
                    </table>
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

import { bindActionCreators } from 'redux'

function mapStateToProps(state) {
    return {
        pages: state.pages,
        login: state.login
    };
}

function mapDispatchToProps(dispatch) {
    let actions = bindActionCreators({...swal}, dispatch);
    return { ...actions, dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(adminComponent(PagesEdit))
