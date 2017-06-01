import React from 'react';
import { Link } from 'react-router';

var { connect } = require('react-redux');
import LoginForm from 'LoginForm';
import { actions } from 'actions';

// TODO: Pull the Authentication code out into a Higher Order Component to wrap around all admin components
// TODO: Put the token into session or local storage
// TODO: Pass the access token around to the various API's. See what I did in FixturesEdit.

export class Admin extends React.Component {
    // Need to override the constructor to set the initial state and do data binding
    constructor(props) {
        // Call the parent constructor with the props object we automatically get
        super(props);
        // BINDING: Keep 'this' scoped to this object in any handlers
        this.handleSubmitLogin = this.handleSubmitLogin.bind(this);
    }
    handleSubmitLogin(username, password) {
        this.props.dispatch(actions.login.submitLogin(username, password));
    }
    render() {
        // Are we authenticated right now, or about to?
        var { token, expires, user, status } = this.props.login;

        if (status.isFetching) {
            // Logging in. Show a loading message.
            return (
                <div>
                    <div className="callout">
                        <h5>Authenticating</h5>
                        <p>Please wait while we log you in...</p>
                    </div>
                </div>
            );
        } else if (token && expires > Date.now() && user.role == 'admin' && status.error === undefined) {
            // We have a valid token and the user is authorized. Show the Admin menu.
            // TODO: Could compare this to Date.now() to figure out how long this will last rather than showing the deadline
            var expiresDate = new Date(expires);
            return (
                <div>
                    <div className="callout success clearfix">
                        <h5 className="float-left">{user.name} <small>{`(Login Expires: ${expiresDate.toUTCString()})`}</small></h5>
                        <p className="alert label float-right">Admin Area</p>
                    </div>
                    <ul>
                        <Link to={'/admin/news'} className="expanded button"><i className="fi-page-multiple"></i> News</Link>
                        <Link to={'/admin/fixtures'} className="expanded button"><i className="fi-flag"></i> Fixtures</Link>
                        <Link to={'/admin/pages'} className="expanded button"><i className="fi-page-multiple"></i> Pages</Link>
                        <Link to={'/admin/players'} className="expanded button"><i className="fi-torsos-all"></i> Players</Link>
                    </ul>
                </div>
            );
        } else {
            // Not logged in, maybe a problem. Show an error message if needed and the login form.

            var errorMessage = status.error === undefined ? null : (
                <div className="callout alert">
                    <h5>Error</h5>
                    <p>{status.error.message}</p>
                </div>
            );

            return (
                <div>
                    {errorMessage}
                    <LoginForm onSubmitLogin={this.handleSubmitLogin} />
                </div>
            );
        }
    }
};

export default connect(
    (state) => {
        return {
            login: state.login
        };
    })(Admin);
