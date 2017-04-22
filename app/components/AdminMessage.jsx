import React from 'react';
import {Link} from 'react-router';

// Higher order component. The function takes a component and returns a (modified) component.
// In this case we are hiding components from users if they are not an admin, meaning that logic can be encapsulated here
//  rather than modifying every component that needs admin capabilities.

/*
// EXAMPLE USAGE:
export default connect(
  (state) => {
    return {
        // Add any other state data you need here. The login state is required:
        login: state.login
    };
  })(adminComponent(ComponentNameHere));
*/

var adminComponent = (Component) => {
  return class AdminMessage extends Component {
    // componentDidUpdate() {
    //   console.log('admin component did update');
    //   // Call the parent's function, if it was defined in the parent class
    //   if (super.componentDidUpdate) {
    //     super.componentDidUpdate();
    //   }
    // }
    render() {
      // Are we authenticated right now, or about to?
      var { token, expires, user, status } = this.props.login;

      if (status.isFetching) {
        // Logging in. Show a loading message, but not the component.
        return (
          <div>
            <div className="callout">
              <h5>Authenticating</h5>
              <p>Please wait while we log you in...</p>
            </div>
          </div>
        );
      } else if (token && expires > Date.now() && user.role == 'admin' && status.error === undefined) {
        // We have a valid token and the user is authorized. Show the component.
        // TODO: Could compare this to Date.now() to figure out how long this will last rather than showing the deadline
        var expiresDate = new Date(expires);
        return (
          <div>
            <div className="callout success">
              <div className="clearfix">
                <h5 className="float-left">{user.name} <small>{`(Login Expires: ${expiresDate.toUTCString()})`}</small></h5>
                <p className="alert label float-right">Admin Area</p>
              </div>
              <Link to="/admin" className="expanded button alert"><i className="fi-home"></i> Admin Tools Menu</Link>
            </div>
            {super.render()}
          </div>
        );
      } else {
        // Not logged in, maybe a problem. Show an error message if needed and a link to the login form.

        var errorMessage = status.error === undefined ? null : (
          <div className="callout alert">
            <h5>Error</h5>
            <p>{status.error.message}</p>
          </div>
        );

        return (
          <div>
            {errorMessage}
            <Link to="/admin" className="expanded button alert"><i className="fi-home"></i> Login to Admin Tools</Link>
          </div>
        );
      }
    }
  };
}

export default adminComponent;
