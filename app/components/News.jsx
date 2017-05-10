import React from 'react';
var {connect} = require('react-redux');
import {actions} from 'actions';
import NewsSummary from 'NewsSummary';
import * as NewsAPI from 'NewsAPI';

// TODO: Replace placeholder ads with an AdSense React component. One probably exists out there already.
// TODO: 3 wide on a phone doesn't look good. Breaks down to 2, 1.

export class News extends React.Component {
    // Need to override the constructor to set the initial state and do data binding
    constructor(props) {
        // Call the parent constructor with the props object we automatically get
        super(props);
    }
    componentWillMount() {
        // Get the most recent year's news
        this.props.dispatch(actions.news.fetchNewsStoriesIfNeeded(actions.news.FETCH_LATEST));
    }
    handleFetchNews() {
        var year = Number(this.refs.year.value);
        var month = Number(this.refs.month.value);
        // 0 is ALL in our picker, so null it out
        if (month == 0)
            month = null;
        this.props.dispatch(actions.news.fetchNewsStoriesIfNeeded(year, month));
    }
    render() {
        var {news, status} = this.props.news;

        function datePicker() {
            // TODO: years and months just list all values, even if we don't have data, (e.g. could select a future month)
            // TODO: Mark the selected year and month, based on state/props
            var years = NewsAPI.getYearList();
            var yearOptions = years.map((year) => {
                return (
                    <option key={year} value={year}>{year}</option>
                );
            });

            var months = NewsAPI.getMonthList();
            months = ['All', ...months];
            var monthOptions = months.map((month, index) => {
                return (
                    <option key={index} value={index}>{month}</option>
                );
            });

            // TODO: Improve layout to be a single row
            return (
                <div>
                    <label>Year
                    <select ref="year">
                        {yearOptions}
                    </select>
                    </label>

                    <label>Month
                    <select ref="month">
                        {monthOptions}
                    </select>
                    </label>
                </div>
            );
        }
        
        if (this.props.children) {
            // This will render `NewsStory.jsx` when at /news/:newsId
            return (
                <div>
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
                    {datePicker()}
                    <button className="button" onClick={this.handleFetchNews.bind(this)}>Go</button>

                    <div className="callout alert">
                      <h5>Error</h5>
                      <p>No news found.</p>
                    </div>
                </div>
            );
        } else {
            // Pop the last element off the array to get the latest story. If we don't have any more, show a placeholder, (shouldn't happen in production with enough news in the DB.)
            // TODO: The array is actually newest first now, so using pop() is wrong...

            // TODO: Pagination needs to happen here.
            //  Get news.length / 9 (# summaries shown on this page) to get the number of pages.
            //  To get the current page's content, (remember we are popping from the end to show news, so need the last elements to remain on the array,) need to slice(0, -((pagenum-1)*9) ) to remove the last few elements from page 2 onwards. Think about the last page though, where there may be <9 items. Could be fine, or may want to include some previous entries to round up to 9...
            //  var newsCount = news.length;
            //  var sliceEnd = -((pagenum-1)*9);
            //  var storiesLeft = newsCount - sliceEnd;
            //  var sliceEnd = (storiesLeft < 9) ? sliceEnd - (9 - storiesLeft);
            //  This all assumes I have all content locally... but I think I would need to page requests, which means needing to do async loads.
            // 
            //  TODO: So, should I add traditional pagination, (as above,) links to load stories for a given day/week/month/year/season or just a "Load More" button?
            //   How about a combination? Typical "Load More" button, with separate set of links to jump to a season, which can just show a list of story headlines, like in the news edit form.
            var tempNews = news.slice(0);
            
            return (
                <div>
                    {datePicker()}
                    <button className="button" onClick={this.handleFetchNews.bind(this)}>Go</button>

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
};

export default connect(
  (state) => {
    return {
        news: state.news
    };
  })(News);
