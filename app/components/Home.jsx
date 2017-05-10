import React from 'react';
var {connect} = require('react-redux');
import {actions} from 'actions';
import NewsSummary from 'NewsSummary';
import * as NewsAPI from 'NewsAPI';

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
        var {news, status} = this.props.news; // TODO: .news shouldn't be needed
        
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
            // Pop the last element off the array to get the latest story. If we don't have any more, show a placeholder, (shouldn't happen in production with enough news in the DB.)
            // TODO: The array is actually newest first now, so using pop() is wrong...
            var tempNews = news.slice(0);
            return (

                <div>
                    {/* will render a list of news items when at /news/ */}
                    <div className="row">
                        <div className="columns small-12 large-8">
                            
                            <div className="row">
                                <NewsSummary story={tempNews.pop() || NewsAPI.DEFAULT_STORY} style="MAIN"/>
                            </div>

                            <div className="row small-up-1 medium-up-3">
                                <NewsSummary story={tempNews.pop() || NewsAPI.DEFAULT_STORY} style="SMALL"/>
                                <NewsSummary story={tempNews.pop() || NewsAPI.DEFAULT_STORY} style="SMALL"/>
                                <NewsSummary story={tempNews.pop() || NewsAPI.DEFAULT_STORY} style="SMALL"/>
                            </div>

                        </div>
                        <div className="columns small-12 large-4">
                            
                            <div className="row">
                                <NewsSummary story={tempNews.pop() || NewsAPI.DEFAULT_STORY} style="SMALL"/>
                            </div>
                            
                            <div className="placeholder-ad">
                                <p>Ads go here</p>
                            </div>
                            
                            <div className="row">
                                <NewsSummary story={tempNews.pop() || NewsAPI.DEFAULT_STORY} style="SMALL"/>
                            </div>
                        </div>
                    </div>
                    
                    <div className="row">
                        <div className="placeholder-ad">
                            <p>Sponsors go here</p>
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
