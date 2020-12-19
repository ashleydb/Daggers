import React from 'react';
//import {Link, browserHistory} from 'next/link';
import {Link, browserHistory} from 'next/link';
var { connect } = require('react-redux');
import { swal } from 'react-redux-sweetalert2';
import adminComponent from 'AdminMessage';
import BannerEditForm from 'BannerEditForm';
import { actions } from 'actions';
import * as Banner from 'Banner';
import * as BannerAPI from 'BannerAPI';

export class BannerEdit extends React.Component {
    // Need to override the constructor to set the initial state and do data binding
    constructor(props) {
        // Call the parent constructor with the props object we automatically get
        super(props);
        // BINDING: Keep 'this' scoped to this object in any handlers
        this.handleSaveBanner = this.handleSaveBanner.bind(this);
        this.promptRemoveBanner = this.promptRemoveBanner.bind(this);
        this.handleRemoveBanner = this.handleRemoveBanner.bind(this);
        this.props.showAlert.bind(this);
    }
    componentWillMount() {
        this.props.dispatch(actions.banner.fetchBannerIfNeeded());
    }
    handleSaveBanner(banner) {
        this.props.dispatch(actions.banner.submitBanner(banner, this.props.login.token));

        // TODO: Not great, since write could fail and then we've gone away from the form's contents
        browserHistory.push('/admin/banner');
    }
    promptRemoveBanner(banner) {
        // TODO: Not sure how to do binding here, so I'll hack it with 'that'
        var that = this;
		this.props.showAlert({
            title: 'Are you sure?',
            text: `Delete the banner? You won't be able to revert this!`,
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
                    that.handleRemoveBanner();
                    resolve();
                });
            }
        });
    }
    handleRemoveBanner() {
        this.props.dispatch(actions.banner.removeBanner(this.props.login.token));
    }
    render() {
        var { banner, status } = this.props.banner;

        if (status.isFetching) {
            return (
                <div>
                    <div className="callout">
                        <h5>Loading</h5>
                        <p>Please wait while we get the banner...</p>
                    </div>
                </div>
            );
        } else if (this.props.params && this.props.params.bannerId) {
            // We must be at '/admin/banner/edit'
            return (
                <div>
                    <BannerEditForm banner={banner} onSaveBanner={this.handleSaveBanner} token={this.props.login.token} />
                </div>
            );
        } else if (banner && banner.image) {
            // Show a list of banner to edit

            var errorMessage = status.error === undefined ? null : (
                <div className="callout alert">
                    <h5>Error</h5>
                    <p>{status.error}</p>
                </div>
            );
            
            return (
                <div>
                    {errorMessage}
                    <table className="hover">
                        <tbody>
                            <tr>
                                <td><img src={`https://{-{gcp.storageBucket}-}.storage.googleapis.com${banner.image}`} alt={banner.description} className="nav-banner"/></td>
                                <td><Link href="/admin/banner/edit" className="button"><i className="fi-pencil"></i> Edit</Link></td>
                                <td><button className="button" onClick={() => this.promptRemoveBanner(banner)}><i className="fi-x"></i> Delete</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            );
        } else {
            return (
                <div>
                    <div className="callout alert">
                        <h5>Error</h5>
                        <p>No banner found.</p>
                        <Link href="/admin/banner/edit" className="button expanded"><i className="fi-plus"></i> Create New</Link>
                    </div>
                </div>
            );
        }
    }
};

import { bindActionCreators } from 'redux';

function mapStateToProps(state) {
    return {
        banner: state.banner,
        login: state.login
    };
}

function mapDispatchToProps(dispatch) {
    let actions = bindActionCreators({...swal}, dispatch);
    return { ...actions, dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(adminComponent(BannerEdit))
