import React from 'react';
import {Link, browserHistory} from 'react-router';
var { connect } = require('react-redux');
import adminComponent from 'AdminMessage';
import NewsEditForm from 'NewsEditForm';
import { actions } from 'actions';
import * as NewsAPI from 'NewsAPI';

export class NewsEdit extends React.Component {
    // Need to override the constructor to set the initial state and do data binding
    constructor(props) {
        // Call the parent constructor with the props object we automatically get
        super(props);
        // BINDING: Keep 'this' scoped to this object in any handlers
        this.handleSaveStory = this.handleSaveStory.bind(this);
        this.setPage = this.setPage.bind(this);
        this.handleFetchNews = this.handleFetchNews.bind(this);
    }
    componentWillMount() {
        // TODO: Copy the News year picking and pagination from News.jsx to here
        // Get the most recent year's news
        this.props.dispatch(actions.news.fetchNewsStoriesIfNeeded(actions.news.FETCH_LATEST));
    }
    handleSaveStory(story) {
        this.props.dispatch(actions.news.submitStory(story, this.props.login.token));

        // TODO: Not great, since write could fail and then we've gone away from the form's contents
        //  TODO: Show a loading screen, then an error message or do this push
        browserHistory.push('/admin/news');
    }
    handleFetchNews() {
        var year = Number(this.refs.year.value);
        var month = Number(this.refs.month.value);
        // 0 is ALL in our picker, so null it out
        if (month == 0)
            month = null;
        this.props.dispatch(actions.news.fetchNewsStoriesIfNeeded(year, month));
    }
    setPage(pageNum) {
        // Change which page of news stories we are showing
        this.props.dispatch(actions.news.pageNews(pageNum));
    }
    render() {
        // Are we editing at a story right now, or about to?
        var { newsId } = this.props.params;
        var {news, status, pageOfNews} = this.props.news;
        var story = NewsAPI.getStory(newsId, news);

        function datePicker(_that, _year, _month) {
            // TODO: years and months options just list all values, even if we don't have data, (e.g. could select a future month)
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

            return (
                <div className="row">
                    <div className="column small-5">
                        <label>Year
                            <select ref="year" defaultValue={_year}>
                                {yearOptions}
                            </select>
                        </label>
                    </div>
                    <div className="column small-5">
                        <label>Month
                            <select ref="month" defaultValue={_month}>
                                {monthOptions}
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

        if (status.isFetching) {
            return (
                <div>
                    <div className="callout">
                        <h5>Loading</h5>
                        <p>Please wait while we get the news...</p>
                    </div>
                </div>
            );
        } else if (newsId == "new" || (story.id && story.id == newsId)) {
            return (
                <div>
                    <NewsEditForm story={story} onSaveStory={this.handleSaveStory} token={this.props.login.token} />
                </div>
            );
        } else if (news && news.length > 0) {
            // Show a list of stories to edit

            var errorMessage = status.error === undefined ? null : (
                <div className="callout alert">
                    <h5>Error</h5>
                    <p>{status.error}</p>
                </div>
            );

            // Pagination calculated here
            var numStoriesPerPage = 25;
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

            // Show as a table with titles/dates and buttons to view/edit/delete
            // TODO: Make the delete button work, or add one to the edit form.
            var contentRows = tempNews.map((story) => {
                var dateMS = story.updatedAt || story.createdAt;
                var d = new Date(Number(dateMS));
                var dateStr = d.toDateString();
                return (
                    <tr key={story.id}>
                        <td>{dateStr}</td>
                        <td><Link to={`/admin/news/${story.id}`}>{story.headline}</Link></td>
                        <td><Link to={`/news/${story.id}`} className="button"><i className="fi-eye"></i> View</Link></td>
                        <td><Link to={`/admin/news/${story.id}`} className="button"><i className="fi-pencil"></i> Edit</Link></td>
                        <td><button className="button disabled"><i className="fi-x"></i> Delete</button></td>
                    </tr>
                );
            });
            
            return (
                <div>
                    {datePicker(this, status.year, status.month)}
                    {paginationLinks}
                    {errorMessage}
                    <Link to={`/admin/news/new`} className="button expanded"><i className="fi-plus"></i> Create New</Link>
                    <table className="hover">
                        <tbody>
                            {contentRows}
                        </tbody>
                    </table>
                    {paginationLinks}
                </div>
            );
        } else {
            return (
                <div>
                    {datePicker(this, status.year, status.month)}
                    <div className="callout alert">
                        <h5>Error</h5>
                        <p>No news found.</p>
                    </div>
                </div>
            );
        }
    }
};

export default connect(
    (state) => {
        return {
            news: state.news,
            login: state.login
        };
    })(adminComponent(NewsEdit));
