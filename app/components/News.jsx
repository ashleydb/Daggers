var React = require('react');
var {connect} = require('react-redux');
var NewsSummary = require('NewsSummary');
import * as NewsAPI from 'NewsAPI';

// TODO: Adjust layout at show ads in a sidebar?
// TODO: Can a story have a YouTube video in it?
// TODO: Correctly load enough stories to pass to summaries
// TODO: 3 wide on a phone doesn't look good. Breaks down to 2, 1.

//Basic presentational component that would only have a render function
// rewritten using arror functions from ES6.
export var News = React.createClass({
    render: function() {
        var {news, status} = this.props.news; //TODO: .news shouldn't be needed
        
        if (this.props.children) {
            return (
                <div>
                    {/* will render `NewsStory.jsx` when at /story/:newsId */}
                    {this.props.children}
                </div>
            );
        } else if (status.isFetching) {
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
            // TODO: Pagination needs to happen here.
            //  Get news.length / 9 (# summaries shown on this page) to get the number of pages.
            //  To get the current page's content, (remember we are popping from the end to show news, so need the last elements to remain on the array,) need to slice(0, -((pagenum-1)*9) ) to remove the last few elements from page 2 onwards. Think about the last page though, where there may be <9 items. Could be fine, or may want to include some previous entries to round up to 9...
            //  var newsCount = news.length;
            //  var sliceEnd = -((pagenum-1)*9);
            //  var storiesLeft = newsCount - sliceEnd;
            //  var sliceEnd = (storiesLeft < 9) ? sliceEnd - (9 - storiesLeft);
            //  This all assumes I have all content locally... but I think I would need to page requests, which means needing to do async loads.
            // 
            //  TODO: So, should I add traditional pagination, (as aobve,) links to load stories for a given day/week/month/year/season or just a "Load More" button?
            //   How about a combination? Typical "Load More" button, with separate set of links to jump to a season, which can just show a list of story headlines, like in the news edit form.
            var tempNews = news.slice(0);
            
            return (
                <div>
                    {/* will render a list of news items when at /news/ */}
                    <div className="row small-up-1 medium-up-3 large-up-4">
                        <div className="column">
                            <NewsSummary story={tempNews.pop() || NewsAPI.DEFAULT_STORY} style="SMALL"/>
                        </div>
                        <div className="column">
                            <NewsSummary story={tempNews.pop() || NewsAPI.DEFAULT_STORY} style="SMALL"/>
                        </div>
                        <div className="column">
                            <NewsSummary story={tempNews.pop() || NewsAPI.DEFAULT_STORY} style="SMALL"/>
                        </div>
                        <div className="column medium-centered large-uncentered">
                            <div className="placeholder-ad">
                                <p>Ads go here</p>
                            </div>
                        </div>
                    </div>

                    <div className="row small-up-1 medium-up-3 large-up-4">
                        <div className="column">
                            <NewsSummary story={tempNews.pop() || NewsAPI.DEFAULT_STORY} style="SMALL"/>
                        </div>
                        <div className="column">
                            <NewsSummary story={tempNews.pop() || NewsAPI.DEFAULT_STORY} style="SMALL"/>
                        </div>
                        <div className="column">
                            <NewsSummary story={tempNews.pop() || NewsAPI.DEFAULT_STORY} style="SMALL"/>
                        </div>
                        <div className="column medium-centered large-uncentered">
                            <div className="placeholder-ad">
                                <p>Ads go here</p>
                            </div>
                        </div>
                    </div>

                    <div className="row small-up-1 medium-up-3 large-up-4">
                        <div className="column">
                            <NewsSummary story={tempNews.pop() || NewsAPI.DEFAULT_STORY} style="SMALL"/>
                        </div>
                        <div className="column">
                            <NewsSummary story={tempNews.pop() || NewsAPI.DEFAULT_STORY} style="SMALL"/>
                        </div>
                        <div className="column">
                            <NewsSummary story={tempNews.pop() || NewsAPI.DEFAULT_STORY} style="SMALL"/>
                        </div>
                        <div className="column medium-centered large-uncentered">
                            <div className="placeholder-ad">
                                <p>Ads go here</p>
                            </div>
                        </div>
                    </div>

                </div>
            );
        }
    }
});

//module.exports = News;

export default connect(
  (state) => {
    return {
        news: state.news
    };
  })(News);
