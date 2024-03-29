import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
var {connect} = require('react-redux');
import {actions} from 'actions';
import NewsSummary from 'NewsSummary';
import * as NewsAPI from 'NewsAPI';
import SponsorsGroup from 'SponsorsGroup';
import MedianetTag from 'MedianetTag';
//import PitcheroVideoPlayer from 'PitcheroVideoPlayer';
import Page from 'Page';

// TODO: Add Ad component, which can be adsense or overridden as a nice-to-have.
// TODO: Add Google Analytics component.
// TODO: Adjust layout a bit? Smaller main story with sidebar stories and ads? Twitter feed?
// TODO: Add latest video, or a link to it as a story?
// TODO: Correctly load enough stories to pass to summaries
// TODO: 3 summaries on a row on a phone doesn't look good. Breaks down to 2, 1.

// How many stories to fetch from the server when getting Recent stories for the homepage
const NEWS_RECENT_STORY_COUNT = 5;

export class Home extends React.Component {
    // Need to override the constructor to set the initial state and do data binding
    constructor(props) {
        // Call the parent constructor with the props object we automatically get
        super(props);
    }
    componentWillMount() {
        // Get the most recent month's stories
        this.props.dispatch(actions.news.fetchNewsStoriesIfNeeded(actions.news.FETCH_RECENT, null));
    }
    componentDidMount() {
        ReactDOM.findDOMNode(this._contentTop).scrollIntoView();
    }
    render() {
        var {news, status} = this.props.news;
        
        if (status.isFetching) {
            return (
                <div>
                    <div id="contentTop" name="contentTop" ref={(ref) => this._contentTop = ref} />
                    <div className="callout">
                      <h5>Loading</h5>
                      <p>Please wait while we get the news...</p>
                    </div>
                </div>
            );
        } else if (!news || news.length < 1) {
            return (
                <div>
                    <div id="contentTop" name="contentTop" ref={(ref) => this._contentTop = ref} />
                    <div className="callout alert">
                      <h5>Error</h5>
                      <p>No news found.</p>
                    </div>
                </div>
            );
        } else {
            // Shift the first element off the array to get the latest story.
            //  If we don't have any more, show a placeholder.
            var tempNews = news.slice(0, NEWS_RECENT_STORY_COUNT);
            return (

                <div>
                    <div id="contentTop" name="contentTop" ref={(ref) => this._contentTop = ref} />
                    <div className="row hide-for-large center-content center-text">
                        <a href="http://www.vanarama.co.uk/">
                            <img src="https://{-{gcp.storageBucket}-}.storage.googleapis.com/basics/league-sponsor.png" className="league-sponsor1 league-sponsor-margin league-sponsor-margin1" alt="Vanarama"/>
                        </a>
                        <a href="https://www.national-lottery.co.uk">
                            <img src="https://{-{gcp.storageBucket}-}.storage.googleapis.com/basics/league-sponsor-national-lottery.gif" className="league-sponsor2 league-sponsor-margin2" alt="The National Lottery"/>
                        </a>
                        <a href="https://www.nationalleaguetv.com/">
                            <img src="https://{-{gcp.storageBucket}-}.storage.googleapis.com/NLTV-Ad-Mobile%20Banner.png" className="league-sponsor-margin2" alt="National League TV"/>
                        </a>
                    </div>

                    {/* will render a list of news items when at /news/ */}
                    <div className="row">
                        <div className="columns small-12 large-7">
                            <div className="row">
                                <NewsSummary story={tempNews.shift() || NewsAPI.DEFAULT_STORY} style="MAIN"/>
                            </div>
                        </div>
                        <div className="columns small-12 large-5 center-content center-text">
                            <div className="row show-for-large">
                                <a href="http://www.vanarama.co.uk/">
                                    <img src="https://{-{gcp.storageBucket}-}.storage.googleapis.com/basics/league-sponsor.png" className="league-sponsor1 float-left" alt="Vanarama"/>
                                </a>
                                <a href="https://www.national-lottery.co.uk">
                                    <img src="https://{-{gcp.storageBucket}-}.storage.googleapis.com/basics/league-sponsor-national-lottery.gif" className="league-sponsor2 float-right" alt="The National Lottery"/>
                                </a>
                            </div>
                            <div className="row show-for-large center-content center-text">
                                <a href="https://www.nationalleaguetv.com/">
                                    <img src="https://{-{gcp.storageBucket}-}.storage.googleapis.com/NLTV-Ad-Inline.png" className="league-sponsor-margin2" alt="National League TV"/>
                                </a>
                            </div>
                            
                            <div className="placeholder-ad">
                                <MedianetTag cid="8CUM55E8A" crid="513062281" size="300x250" divId = "513062281"/>
                            </div>

                            {/*<Page pageId="TwitterFeed"/>*/}
                            {/*<Page pageId="Newsletter"/>*/}

                            {/*<div className="row">
                                <div className="video-player">
                                    <PitcheroVideoPlayer/>
                                </div>
                            </div>*/}
                        </div>
                        <div className="columns small-12">
                            <div className="row small-up-1 medium-up-4">
                                <NewsSummary story={tempNews.shift() || NewsAPI.DEFAULT_STORY} style="SMALL"/>
                                <NewsSummary story={tempNews.shift() || NewsAPI.DEFAULT_STORY} style="SMALL"/>
                                <NewsSummary story={tempNews.shift() || NewsAPI.DEFAULT_STORY} style="SMALL"/>
                                <NewsSummary story={tempNews.shift() || NewsAPI.DEFAULT_STORY} style="SMALL"/>
                            </div>
                        </div>
                    </div>
                    
                    <div className="row">
                        <Page pageId="Newsletter"/>
                    </div>
                    
                    <div className="row">
                        <SponsorsGroup/>
                    </div>

                    <div className="row">
                        <div className="columns small-12 center-text">
                            <a href="https://www.youtube.com/user/OfficialDaggers">
                                <i className="fi-social-youtube social-icon-large social-color-youtube"></i>
                            </a>
                            &nbsp;&nbsp;
                            <a href="https://www.facebook.com/OfficialDaggers">
                                <i className="fi-social-facebook social-icon-large social-color-facebook"></i>
                            </a>
                            &nbsp;&nbsp;
                            <a href="http://twitter.com/dag_redfc">
                                <i className="fi-social-twitter social-icon-large social-color-twitter"></i>
                            </a>
                            &nbsp;&nbsp;
                            <a href="https://www.instagram.com/daggersfcofficial/">
                                <i className="fi-social-instagram social-icon-large social-color-instagram"></i>
                            </a>
                        </div>
                    </div>

                    <div className="row">
                        <div className="row small-12 footer">
                            <Link to={'/page/PrivacyPolicy'} className="footer-link">Privacy Policy</Link>
                            &nbsp;|&nbsp;
                            <Link to={'/page/TermsAndConditions'} className="footer-link">Terms of Use</Link>
                        </div>
                    </div>

                </div>
            );
        }
    }
};

export default connect(
  (state) => {
    return {
        news: state.news
    };
  })(Home);
