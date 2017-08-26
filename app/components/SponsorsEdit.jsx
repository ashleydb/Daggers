import React from 'react';
import {Link, browserHistory} from 'react-router';
var { connect } = require('react-redux');
import { swal } from 'react-redux-sweetalert2';
import adminComponent from 'AdminMessage';
import SponsorsEditForm from 'SponsorsEditForm';
import { actions } from 'actions';
import * as SponsorsAPI from 'SponsorsAPI';

export class SponsorsEdit extends React.Component {
    // Need to override the constructor to set the initial state and do data binding
    constructor(props) {
        // Call the parent constructor with the props object we automatically get
        super(props);
        // BINDING: Keep 'this' scoped to this object in any handlers
        this.handleSaveSponsor = this.handleSaveSponsor.bind(this);
        this.promptRemoveSponsor = this.promptRemoveSponsor.bind(this);
        this.handleRemoveSponsor = this.handleRemoveSponsor.bind(this);
        this.props.showAlert.bind(this);
    }
    componentWillMount() {
        this.props.dispatch(actions.sponsors.fetchSponsorsIfNeeded());
    }
    handleSaveSponsor(sponsor) {
        this.props.dispatch(actions.sponsors.submitSponsor(sponsor, this.props.login.token));

        // TODO: Not great, since write could fail and then we've gone away from the form's contents
        browserHistory.push('/admin/sponsors');
    }
    promptRemoveSponsor(sponsor) {
        // TODO: Not sure how to do binding here, so I'll hack it with 'that'
        var that = this;
		this.props.showAlert({
            title: 'Are you sure?',
            text: `Delete "${sponsor.name}"? You won't be able to revert this!`,
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
                    that.handleRemoveSponsor(sponsor.id);
                    resolve();
                });
            }
        });
    }
    handleRemoveSponsor(id) {
        this.props.dispatch(actions.sponsors.removeSponsor(id, this.props.login.token));
    }
    render() {
        // Are we editing at a sponsor right now, or about to?
        var { sponsorId } = this.props.params;
        var { sponsors, status } = this.props.sponsors;
        var sponsor = SponsorsAPI.getSponsor(sponsorId, sponsors) || SponsorsAPI.DEFAULT_SPONSOR;

        if (status.isFetching) {
            return (
                <div>
                    <div className="callout">
                        <h5>Loading</h5>
                        <p>Please wait while we get the sponsors...</p>
                    </div>
                </div>
            );
        } else if (sponsorId == 'new' || sponsor.id == sponsorId) {
            return (
                <div>
                    <SponsorsEditForm sponsor={sponsor} onSaveSponsor={this.handleSaveSponsor} token={this.props.login.token} />
                </div>
            );
        } else if (sponsors && sponsors.length > 0) {
            // Show a list of sponsors to edit

            var errorMessage = status.error === undefined ? null : (
                <div className="callout alert">
                    <h5>Error</h5>
                    <p>{status.error}</p>
                </div>
            );

            // Show as a table with names and buttons to edit/delete
            var contentRows = sponsors.map((sponsor) => {
                return (
                    <tr key={sponsor.id}>
                        <td><Link to={`/admin/sponsors/${sponsor.id}`}>{sponsor.name}</Link></td>
                        <td><Link to={`/admin/sponsors/${sponsor.id}`} className="button"><i className="fi-pencil"></i> Edit</Link></td>
                        <td><button className="button" onClick={() => this.promptRemoveSponsor(sponsor)}><i className="fi-x"></i> Delete</button></td>
                    </tr>
                );
            });

            return (
                <div>
                    {errorMessage}
                    <Link to={`/admin/sponsors/new`} className="button expanded"><i className="fi-plus"></i> Create New</Link>
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
                        <p>No sponsors found.</p>
                        <Link to={`/admin/sponsors/new`}><i className="fi-plus"></i> Create New</Link>
                    </div>
                </div>
            );
        }
    }
};

import { bindActionCreators } from 'redux'

function mapStateToProps(state) {
    return {
        sponsors: state.sponsors,
        login: state.login
    };
}

function mapDispatchToProps(dispatch) {
    let actions = bindActionCreators({...swal}, dispatch);
    return { ...actions, dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(adminComponent(SponsorsEdit))
