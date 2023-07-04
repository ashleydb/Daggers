import React from 'react';
import ReactDOM from 'react-dom';
var {connect} = require('react-redux');
import {actions} from 'actions';
import NewsSummary from 'NewsSummary';
import * as NewsAPI from 'NewsAPI';
import MedianetTag from 'MedianetTag';
import Page from 'Page'; // To show the newsletter sign-up form

// TODO: Replace placeholder ads with an AdSense React component. One probably exists out there already.
// TODO: 3 wide on a phone doesn't look good. Breaks down to 2, 1.

export class News extends React.Component {
    // Need to override the constructor to set the initial state and do data binding
    constructor(props) {
        // Call the parent constructor with the props object we automatically get
        super(props);
        // Binding
        this.setPage = this.setPage.bind(this);
        this.handleFetchNews = this.handleFetchNews.bind(this);
    }
    componentWillMount() {
        // Are we at 'news:id'?
        var { newsId } = this.props.params;
        if (!newsId) {
            // We are on the overall News page, not a specific story. Get the most recent year's news
            this.props.dispatch(actions.news.fetchNewsStoriesIfNeeded(actions.news.FETCH_LATEST, actions.news.FETCH_LATEST));
        }
    }
    componentDidMount() {
        ReactDOM.findDOMNode(this._contentTop).scrollIntoView();
    }
    handleFetchNews() {
        var year = Number(this.refs.year.value);
        var month = Number(this.refs.month.value);
        var category = this.refs.category.value;
        this.props.dispatch(actions.news.fetchNewsStoriesIfNeeded(year, month, category));
    }
    setPage(pageNum) {
        // Change which page of news stories we are showing
        this.props.dispatch(actions.news.pageNews(pageNum));
    }
    render() {
        var {news, status, pageOfNews} = this.props.news;

        // Filter the news to the selected category if needed
        if (status.category && news && news.length >= 1) {
            var tempNews = news.filter((story) => {
                return story.category === status.category;
            });
            news = tempNews;
        }

        // TODO: Break out this pagination code into something reusable, (e.g. for NewsEdit)
        function datePicker(_that, _year, _month, _category = null) {
            // TODO: years and months options just list all values, even if we don't have data, (e.g. could select a future month)
            var years = NewsAPI.getYearList(false);
            var yearOptions = years.map((year) => {
                return (
                    <option key={year} value={year}>{year}</option>
                );
            });

            var months = NewsAPI.getMonthList();
            var monthOptions = months.map((month, index) => {
                return (
                    <option key={index} value={index+1}>{month}</option>
                );
            });

            var categories = ['(All)', 'Club News', 'Commercial', 'Match Reports', 'Interviews', 'Match Previews', 'Ticket News', 'Trust'];
            var categoryOptions = categories.map((category) => {
                return (
                    <option key={category} value={category}>{category}</option>
                );
            });

            return (
                <div className="row">
                    <div className="column small-3">
                        <label>Year
                            <select ref="year" defaultValue={_year}>
                                {yearOptions}
                            </select>
                        </label>
                    </div>
                    <div className="column small-3">
                        <label>Month
                            <select ref="month" defaultValue={_month}>
                                {monthOptions}
                            </select>
                        </label>
                    </div>
                    <div className="column small-4">
                        <label>Category
                            <select ref="category" defaultValue={_category}>
                                {categoryOptions}
                            </select>
                        </label>
                    </div>
                    <div className="column small-2">
                        <br/>
                        <button className="button" onClick={_that.handleFetchNews}>Go</button>
                    </div>
                </div>
            );
        }
        
        if (this.props.children) {
            // This will render `NewsStory.jsx` when at /news/:newsId
            return (
                <div>
                    <div id="contentTop" name="contentTop" ref={(ref) => this._contentTop = ref} />
                    {this.props.children}
                </div>
            );
        } else if (status.isFetching) {
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
            var dateNow = new Date();
            var pickMonth = status.month && (typeof status.month === 'number') ? status.month : dateNow.getMonth() + 1;
            var pickYear = status.year && (typeof status.year === 'number') ? status.year : dateNow.getFullYear();
            var pickCategory = status.category;
            return (
                <div>
                    <div id="contentTop" name="contentTop" ref={(ref) => this._contentTop = ref} />
                    {datePicker(this, pickYear, pickMonth, pickCategory)}

                    <div className="callout alert">
                      <h5>Error</h5>
                      <p>No news found.</p>
                    </div>
                </div>
            );
        } else {
            // Shift the first element off the array to get the latest story.
            //  If we don't have any more, show a placeholder.

            // Pagination calculated here
            var numStoriesPerPage = 9;
            var numPages = Math.ceil(news.length / numStoriesPerPage);
            var pageNum = pageOfNews;
 
            // Pull the portion of news to show from our full list of news stories
            var sliceStart = pageNum * numStoriesPerPage;
            var sliceEnd = sliceStart + numStoriesPerPage;
            var tempNews = news.slice(sliceStart, sliceEnd);

            function pagination(that, _numPages, _pageNum) {
                var currentPage = (<li className="current"><span className="show-for-sr">You're on page</span> {_pageNum+1}</li>);

                var prevLink = null;
                if (_pageNum == 0) {
                    prevLink = (<li className="pagination-previous disabled">Newer</li>);
                } else {
                    prevLink = (<li className="pagination-previous"><a onClick={(e) => {that.setPage(_pageNum-1)}} aria-label="Newer news">Newer</a></li>);
                }

                var nextLink = null;
                if (_pageNum + 1 == _numPages) {
                    nextLink = (<li className="pagination-next disabled">Older</li>);
                } else {
                    nextLink = (<li className="pagination-next"><a onClick={(e) => {that.setPage(_pageNum+1)}} aria-label="Older news">Older</a></li>);
                }

                return (
                    <ul className="pagination text-center" role="navigation" aria-label="Pagination">
                        {prevLink}
                        {currentPage}
                        {nextLink}
                    </ul>
                );
            }

            var paginationLinks = pagination(this, numPages, pageNum);

            var dateNow = new Date();
            var pickMonth = status.month && (typeof status.month === 'number') ? status.month : dateNow.getMonth() + 1;
            var pickYear = status.year && (typeof status.year === 'number') ? status.year : dateNow.getFullYear();
            var pickCategory = status.category;
            
            return (
                <div>
                    <div id="contentTop" name="contentTop" ref={(ref) => this._contentTop = ref} />
                    {datePicker(this, pickYear, pickMonth, pickCategory)}
                    {paginationLinks}

                    {/* will render a list of news items when at /news/ */}
                    <div className="row small-up-1 medium-up-3 large-up-4">
                        <div className="column">
                            <NewsSummary story={tempNews.shift()} style="SMALL"/>
                        </div>
                        <div className="column">
                            <NewsSummary story={tempNews.shift()} style="SMALL"/>
                        </div>
                        <div className="column">
                            <NewsSummary story={tempNews.shift()} style="SMALL"/>
                        </div>
                        <div className="column medium-centered large-uncentered">
                            {/* will render a newsletter sign-up form which is setup as a Page */}
                            <Page pageId="Newsletter"/>
                        </div>
                    </div>

                    <div className="row small-up-1 medium-up-3 large-up-4">
                        <div className="column">
                            <NewsSummary story={tempNews.shift()} style="SMALL"/>
                        </div>
                        <div className="column">
                            <NewsSummary story={tempNews.shift()} style="SMALL"/>
                        </div>
                        <div className="column">
                            <NewsSummary story={tempNews.shift()} style="SMALL"/>
                        </div>
                        <div className="column medium-centered large-uncentered">
                            <div className="placeholder-ad">
                                <MedianetTag cid="8CUM55E8A" crid="513062281" size="300x250" divId = "513062281"/>
                            </div>
                        </div>
                    </div>

                    <div className="row small-up-1 medium-up-3 large-up-4">
                        <div className="column">
                            <NewsSummary story={tempNews.shift()} style="SMALL"/>
                        </div>
                        <div className="column">
                            <NewsSummary story={tempNews.shift()} style="SMALL"/>
                        </div>
                        <div className="column">
                            <NewsSummary story={tempNews.shift()} style="SMALL"/>
                        </div>
                        <div className="column medium-centered large-uncentered">
                            <div className="placeholder-ad">
                                <MedianetTag cid="8CUM55E8A" crid="513062281" size="300x250" divId = "513062281"/>
                            </div>
                        </div>
                    </div>

                    <div>
                        {paginationLinks}
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
