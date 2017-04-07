var React = require('react');
var {Link} = require('react-router');
var {connect} = require('react-redux');
var LoginForm = require('LoginForm');
import {actions} from 'actions';

// TODO: Pull the Authentication code out into a Higher Order Component to wrap around all admin components
// TODO: Put the token into session or local storage
// TODO: Pass the access token around to the various API's. See what I did in FixturesEdit.

export var Admin = React.createClass({
    handleSubmitLogin: function(username, password) {
        this.props.dispatch(actions.login.submitLogin(username, password));
    },
    render: function() {
        // Are we authenticated right now, or about to?
        var {token, expires, user, status} = this.props.login;
        
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
            return (
                <div>
                    <ul>
                        <Link to={'/admin/news'} className="expanded button"><i className="fi-page-multiple"></i> News</Link>
                        <Link to={'/admin/fixtures'} className="expanded button"><i className="fi-flag"></i> Fixtures</Link>
                    </ul>
                </div>
            );
        } else {
            // Not logged in, amybe a problem. Show an error message if needed and the login form.
            
            var errorMessage = status.error === undefined ? null : (
                <div className="callout alert">
                  <h5>Error</h5>
                  <p>{status.error.message}</p>
                </div>
            );
            
            return (
                <div>
                    {errorMessage}
                    <LoginForm onSubmitLogin={this.handleSubmitLogin}/>
                </div>
            );
        }
    }
});

//export default Admin;

export default connect(
  (state) => {
    return {
        login: state.login
    };
  })(Admin);
