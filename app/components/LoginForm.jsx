import React from 'react';
import {Link} from 'next/link';

export default class LoginForm extends React.Component {
    // Need to override the constructor to set the initial state and do data binding
    constructor(props) {
        // Call the parent constructor with the props object we automatically get
        super(props);
        // BINDING: Keep 'this' scoped to this object in any handlers
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }
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
