// import React from 'react';
// import MailchimpSubscribe from 'react-mailchimp-subscribe';

// // Renders a newsletter sign-up form from MailChimp
// // Usage Example:
// //   <NewsletterSignup/>

// class NewsletterSignup extends React.Component {
//     render() {
//         // Action URL from Mailchimp sign-up form code
//         // TODO: Make this an ENV VAR to hide the ids in from the codebase
//         const newsletter_url = "https://daggers-shop.us18.list-manage.com/subscribe/post?u=ba7b0f7c90358e4887f6df5d1&amp;id=89ed1b6fa1&amp;f_id=00cd0ae1f0";
            
//         return <MailchimpSubscribe url={newsletter_url}/>
//     }
// }

// export default NewsletterSignup;


import React from 'react';
var { connect } = require('react-redux');
import { actions } from 'actions';

// Renders a newsletter sign-up form, which will communicate with our server to subscribe to a MailChimp list
// Usage Example:
//   <NewsletterSignup/> // Horizontal by default
//   <NewsletterSignup horizontal/>
//   <NewsletterSignup vertical/>

class NewsletterSignup extends React.Component {
    onSubmit = (e) => {
        //Don't refresh the whole page when the form button is clicked
        event.preventDefault();

        // check if email is missing, return undefined
        const email = (this.refs.email.value && this.refs.email.value) || null;
        if (this.refs.email && !email) {
            return;
        }
        // if email and name exists, call subscribeToNewsletter() API method
        this.props.dispatch(actions.newsletter.newsletterSubscribe(email));
    };

    render() {
        if (this.props.vertical) {
            return (
                // form with input and button
                <div className="callout success">
                    <p><b>Subscribe to the Daggers Newsletter:</b></p>
                    <form onSubmit={this.onSubmit}>
                        <label>Email</label><input type="text" defaultValue="Your Email Address" ref="email"/>
                        <button className="button success"><i className="fi-mail"></i> Subscribe</button>
                    </form>
                </div>
            );
        } else {
            return (
                // form with input and button
                <div className="callout success row">
                    <p><b>Subscribe to the Daggers Newsletter:</b></p>
                    <form onSubmit={this.onSubmit}>
                        <div className="column small-8">
                            <label>Email</label><input type="text" defaultValue="Your Email Address" ref="email"/>
                        </div>
                        <div className="column small-4">
                            <br/>
                            <button className="button success expanded"><i className="fi-mail"></i> Subscribe</button>
                        </div>
                    </form>
                </div>
            );
        }
    }
}

import { bindActionCreators } from 'redux'

function mapStateToProps(state) {
    return {
    };
}

function mapDispatchToProps(dispatch) {
    let actions = bindActionCreators(dispatch);
    return { ...actions, dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsletterSignup)
