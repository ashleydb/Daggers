import React from 'react';
import ReactDOM from 'react-dom';
var {connect} = require('react-redux');
//import {actions} from '../actions/actions';
import Page from './Page';
import MedianetTag from '../components/MedianetTag';

// TODO: Add advertising to the layout.

export default class Tickets extends React.Component {
    // Need to override the constructor to set the initial state and do data binding
    constructor(props) {
        // Call the parent constructor with the props object we automatically get
        super(props);
    }
    componentDidMount() {
        ReactDOM.findDOMNode(this._contentTop).scrollIntoView();
    }
    render() {
        return (
            <div>
                <div id="contentTop" name="contentTop" ref={(ref) => this._contentTop = ref} />
                <div className="row">
                    <div className="columns small-12 large-8">

                        <Page pageId='Tickets' />

                    </div>
                    <div className="columns small-12 large-4">
                        <div className="placeholder-ad">
                            <MedianetTag cid="8CUM55E8A" crid="513062281" size="300x250" divId = "513062281"/>
                        </div>

                        <div className="placeholder-ad">
                            <MedianetTag cid="8CUM55E8A" crid="513062281" size="300x250" divId = "513062281"/>
                        </div>

                        <div className="placeholder-ad">
                            <MedianetTag cid="8CUM55E8A" crid="513062281" size="300x250" divId = "513062281"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};
