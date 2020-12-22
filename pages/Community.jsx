import React from 'react';
import ReactDOM from 'react-dom';
var Timeline = require('react-twitter-widgets').Timeline;
import Page from './Page';
import MedianetTag from '../components/MedianetTag';

export default class Community extends React.Component {
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

                        <div className="row">
                            <Page pageId='Community' />
                        </div>

                    </div>
                    <div className="columns small-12 large-4">
                        <div className="placeholder-ad">
                            <MedianetTag cid="8CUM55E8A" crid="183428731" size="160x600" divId = "183428731"/>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}
