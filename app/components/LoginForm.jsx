import React from 'react';
import {Link} from 'react-router';

export default class LoginForm extends React.Component {
    onFormSubmit(event) {
        //Don't refresh the whole page when the form button is clicked
        event.preventDefault();
        
        var username = this.refs.username.value;
        var password = this.refs.password.value;
        
        if (username.length > 0 && username != '' &&
            password.length > 0 && password != '') {
            
            this.props.onSubmitLogin(username, password);
        }
    }
    render() {
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
}
