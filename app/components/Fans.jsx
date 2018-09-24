import React from 'react';
import ReactDOM from 'react-dom';
var Timeline = require('react-twitter-widgets').Timeline;
import Page from 'Page';
import MedianetTag from 'MedianetTag';

// TODO: All content on this page.

export default class Fans extends React.Component {
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
                            <div className="columns small-4 center-text">
                                <a href="https://www.youtube.com/user/OfficialDaggers">
                                    <i className="fi-social-youtube social-icon-large social-color-youtube"></i>
                                </a>
                            </div>
                            <div className="columns small-4 center-text">
                                <a href="https://www.facebook.com/OfficialDaggers">
                                    <i className="fi-social-facebook social-icon-large social-color-facebook"></i>
                                </a>
                            </div>
                            <div className="columns small-4 center-text">
                                <a href="http://twitter.com/dag_redfc">
                                    <i className="fi-social-twitter social-icon-large social-color-twitter"></i>
                                </a>
                            </div>
                        </div>

                        <div className="row">
                            <Page pageId='Fans' />
                        </div>

                    </div>
                    <div className="columns small-12 large-4">
                        <div className="placeholder-ad">
                            <MedianetTag cid="8CUM55E8A" crid="513062281" size="300x250" divId = "513062281"/>
                        </div>

                        <Timeline
                            dataSource={{
                                sourceType: 'profile',
                                screenName: 'Dag_RedFC'
                            }}
                            options={{
                                tweetLimit: '5',
                                height: '400'
                            }}
                        />

                    </div>
                </div>

            </div>
        );
    }
}
