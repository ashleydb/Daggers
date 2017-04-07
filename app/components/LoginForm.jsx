var React = require('react');
var {Link} = require('react-router');
//var {connect} = require('react-redux');
//import {actions} from 'actions';

var LoginForm = React.createClass({
    onFormSubmit: function(event) {
        //Don't refresh the whole page when the form button is clicked
        event.preventDefault();
        
        var username = this.refs.username.value;
        var password = this.refs.password.value;
        
        if (username.length > 0 && username != '' &&
            password.length > 0 && password != '') {
            
            this.props.onSubmitLogin(username, password);
            //this.props.dispatch(actions.news.submitLogin(username, password));
        }
    },
    render: function() {
        return (
            <div>
                <form onSubmit={this.onFormSubmit}>
                    <label>Username</label><input type="text" ref="username"/>
                    <label>Password</label><input type="password" ref="password"/>
                    <button className="expanded button success">Login</button>
                </form>
            </div>
        );
    }
})

module.exports = LoginForm;

/*
export default connect(
  (state) => {
    return {
        login: state.login
    };
  })(LoginForm);
*/
