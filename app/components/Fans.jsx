import React from 'react';
var Timeline = require('react-twitter-widgets').Timeline;
import Page from 'Page';

// TODO: All content on this page.

export default class Fans extends React.Component {
    // Need to override the constructor to set the initial state and do data binding
    constructor(props) {
        // Call the parent constructor with the props object we automatically get
        super(props);
    }
    render() {
        return (
            <div>

                <div className="row">
                    <div className="columns small-12 large-8">

                        <div className="row">
                            <div className="columns small-3">
                                <a href="https://www.youtube.com/user/OfficialDaggers">
                                    <i className="fi-social-youtube social-icon-large social-color-youtube"></i>
                                </a>
                            </div>
                            <div className="columns small-3">
                                <a href="https://www.facebook.com/OfficialDagenham.Redbridge">
                                    <i className="fi-social-facebook social-icon-large social-color-facebook"></i>
                                </a>
                            </div>
                            <div className="columns small-3">
                                <a href="http://twitter.com/dag_redfc">
                                    <i className="fi-social-twitter social-icon-large social-color-twitter"></i>
                                </a>
                            </div>
                            <div className="columns small-3">
                                <a href="https://plus.google.com/u/0/+DaggersCoUk">
                                    <i className="fi-social-google-plus social-icon-large social-color-google"></i>
                                </a>
                            </div>
                        </div>

                        <div className="row">
                            <Page pageId='Fans' />
                        </div>

                    </div>
                    <div className="columns small-12 large-4">
                        <div className="placeholder-ad">
                            <p>Ads go here</p>
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
