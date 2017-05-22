import React from 'react';
var {connect} = require('react-redux');
import {actions} from 'actions';
import NewsSummary from 'NewsSummary';
import * as NewsAPI from 'NewsAPI';
import Sponsor from 'Sponsor';

// TODO: Add sponsors.
// TODO: Add Ad component, which can be adsense or overridden as a nice-to-have.
// TODO: Add Google Analytics component.
// TODO: Adjust layout a bit? Smaller main story with sidebar stories and ads? Twitter feed?
// TODO: Add latest video, or a link to it as a story?
// TODO: Correctly load enough stories to pass to summaries
// TODO: 3 summaries on a row on a phone doesn't look good. Breaks down to 2, 1.

export class Home extends React.Component {
    // Need to override the constructor to set the initial state and do data binding
    constructor(props) {
        // Call the parent constructor with the props object we automatically get
        super(props);
    }
    componentWillMount() {
        // Get the most recent month's stories
        this.props.dispatch(actions.news.fetchNewsStoriesIfNeeded(actions.news.FETCH_LATEST, actions.news.FETCH_LATEST));
    }
    render() {
        var {news, status} = this.props.news;
        
        if (status.isFetching) {
            return (
                <div>
                    <div className="callout">
                      <h5>Loading</h5>
                      <p>Please wait while we get the news...</p>
                    </div>
                </div>
            );
        } else if (!news || news.length < 1) {
            return (
                <div>
                    <div className="callout alert">
                      <h5>Error</h5>
                      <p>No news found.</p>
                    </div>
                </div>
            );
        } else {
            // Shift the first element off the array to get the latest story.
            //  If we don't have any more, show a placeholder.
            var tempNews = news.slice(0, 6);
            return (

                <div>
                    {/* will render a list of news items when at /news/ */}
                    <div className="row">
                        <div className="columns small-12 large-8">
                            
                            <div className="row">
                                <NewsSummary story={tempNews.shift() || NewsAPI.DEFAULT_STORY} style="MAIN"/>
                            </div>

                            <div className="row small-up-1 medium-up-3">
                                <NewsSummary story={tempNews.shift() || NewsAPI.DEFAULT_STORY} style="SMALL"/>
                                <NewsSummary story={tempNews.shift() || NewsAPI.DEFAULT_STORY} style="SMALL"/>
                                <NewsSummary story={tempNews.shift() || NewsAPI.DEFAULT_STORY} style="SMALL"/>
                            </div>

                        </div>
                        <div className="columns small-12 large-4">
                            
                            <div className="row">
                                <NewsSummary story={tempNews.shift() || NewsAPI.DEFAULT_STORY} style="SMALL"/>
                            </div>
                            
                            <div className="placeholder-ad">
                                <p>Ads go here</p>
                            </div>
                            
                            <div className="row">
                                <NewsSummary story={tempNews.shift() || NewsAPI.DEFAULT_STORY} style="SMALL"/>
                            </div>
                        </div>
                    </div>
                    
                    <div className="row">
                        <div className="row small-up-4 large-up-8">
                            <Sponsor sponsorId={0} />
                            <Sponsor sponsorId={1} />
                            <Sponsor sponsorId={2} />
                            <Sponsor sponsorId={3} />
                            <Sponsor sponsorId={4} />
                            <Sponsor sponsorId={5} />
                            <Sponsor sponsorId={6} />
                            <Sponsor sponsorId={7} />
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
