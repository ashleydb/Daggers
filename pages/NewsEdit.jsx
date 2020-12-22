import React from 'react';
import {Link, browserHistory} from 'next/link';
var { connect } = require('react-redux');
import { swal } from 'react-redux-sweetalert2';
import adminComponent from '../components/AdminMessage';
import NewsEditForm from '../components/NewsEditForm';
import { actions } from '../actions/actions';
import * as NewsAPI from '../api/NewsAPI';

export class NewsEdit extends React.Component {
    // Need to override the constructor to set the initial state and do data binding
    constructor(props) {
        // Call the parent constructor with the props object we automatically get
        super(props);
        // BINDING: Keep 'this' scoped to this object in any handlers
        this.handleSaveStory = this.handleSaveStory.bind(this);
        this.setPage = this.setPage.bind(this);
        this.handleFetchNews = this.handleFetchNews.bind(this);
        this.promptRemoveStory = this.promptRemoveStory.bind(this);
        this.handleRemoveStory = this.handleRemoveStory.bind(this);
        this.props.showAlert.bind(this);
        //this.props.hideAlert.bind(this);
    }
    componentDidMount() {
        // TODO: Copy the News year picking and pagination from News.jsx to here
        // Get the most recent month's news
        this.props.dispatch(actions.news.fetchNewsStoriesIfNeeded(actions.news.FETCH_LATEST, actions.news.FETCH_LATEST, this.props.login.token));
    }
    componentDidUpdate(prevProps, prevState){
        var { newsId } = this.props.params;
        var {news, status} = this.props.news;
        var story = NewsAPI.getStory(newsId, news);

        if (newsId == "new" || (story.id && story.id == newsId)) {
            if (status.isSubmitting === false && status.lastUpdated && this.props.news.story === null) {
                this.handleSaveStoryComplete();
            } else if (status.error) {
                this.handleSaveStoryError(status.error);
            }
        }
    }
    handleSaveStory(story) {
        this.props.dispatch(actions.news.submitStory(story, this.props.login.token))

        var d = new Date(Number(story.createdAt));
        var that = this;
        this.props.showAlert({
            title: 'Saving',
            text: `Please wait. Adding story, going live at "${d.toString()}."`,
            type: 'info',
            allowOutsideClick: false,
            showConfirmButton: false,
            confirmButtonText: 'Don\'t wait for server',
        })
    }
    handleSaveStoryComplete() {
		this.props.showAlert({
            title: 'Saved!',
            text: 'Your story is ready.',
            type: 'success',
            allowOutsideClick: true,
            confirmButtonText: 'Excellent!',
            showConfirmButton: true
        });
        this.props.news.status.isSubmitting = null;
        browserHistory.push('/admin/news');
    }
    handleSaveStoryError(error) {
		this.props.showAlert({
            title: 'Problem Saving Story',
            text: error,
            type: 'error',
            allowOutsideClick: false,
            confirmButtonText: 'OK',
            showConfirmButton: true
        });
    }
    handleFetchNews() {
        var year = Number(this.refs.year.value);
        var month = Number(this.refs.month.value);
        this.props.dispatch(actions.news.fetchNewsStoriesIfNeeded(year, month, this.props.login.token));
    }
    setPage(pageNum) {
        // Change which page of news stories we are showing
        this.props.dispatch(actions.news.pageNews(pageNum));
    }
    promptRemoveStory(story) {
        // TODO: Not sure how to do binding here, so I'll hack it with 'that'
        var that = this;
		this.props.showAlert({
            title: 'Are you sure?',
            text: `Delete "${story.headline}"? You won't be able to revert this!`,
            type: 'warning',
            allowOutsideClick: false,
            showCancelButton: true,
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            confirmButtonColor: '#3085d6',
            showLoaderOnConfirm: true,
            cancelCallback: () => {},
            preConfirm: () => {
                return new Promise(function (resolve) {
                    that.handleRemoveStory(story);
                    resolve();
                });
            }
        });
    }
    handleRemoveStory(story) {
        this.props.dispatch(actions.news.removeStory(story, this.props.login.token));
    }
    render() {
        // Are we editing at a story right now, or about to?
        var { newsId } = this.props.params;
        var {news, status, pageOfNews} = this.props.news;
        var story = NewsAPI.getStory(newsId, news);

        function datePicker(_that, _year, _month) {
            // TODO: years and months options just list all values, even if we don't have data, (e.g. could select a future month)
            var years = NewsAPI.getYearList(true);
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
            var errorMessage = status.error === undefined ? null : (
                <div className="callout alert">
                    <h5>Error</h5>
                    <p>{status.error}</p>
                </div>
            );

            return (
                <div>
                    {errorMessage}
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
                var dateMS = story.createdAt;
                var d = new Date(Number(dateMS));
                var dateStr = d.toDateString();
                return (
                    <tr key={story.id}>
                        <td>{dateStr}</td>
                        <td><Link href={`/admin/news/${story.id}`}>{story.headline}</Link></td>
                        <td><Link href={`/news/${story.id}`} className="button"><i className="fi-eye"></i> View</Link></td>
                        <td><Link href={`/admin/news/${story.id}`} className="button"><i className="fi-pencil"></i> Edit</Link></td>
                        <td><button className="button" onClick={() => this.promptRemoveStory(story)}><i className="fi-x"></i> Delete</button></td>
                    </tr>
                );
            });
            
            var dateNow = new Date();
            var pickMonth = status.month && (typeof status.month === 'number') ? status.month : dateNow.getMonth() + 1;
            var pickYear = status.year && (typeof status.year === 'number') ? status.year : dateNow.getFullYear();
            return (
                <div>
                    {datePicker(this, pickYear, pickMonth)}
                    {paginationLinks}
                    {errorMessage}
                    <Link href={`/admin/news/new`} className="button expanded"><i className="fi-plus"></i> Create New</Link>
                    <table className="hover">
                        <tbody>
                            {contentRows}
                        </tbody>
                    </table>
                    {paginationLinks}
                </div>
            );
        } else {
            var dateNow = new Date();
            var pickMonth = status.month ? status.month : dateNow.getMonth() + 1;
            var pickYear = status.year ? status.year : dateNow.getFullYear();
            return (
                <div>
                    {datePicker(this, pickYear, pickMonth)}
                    <div className="callout alert">
                        <h5>Error</h5>
                        <p>No news found.</p>
                    </div>
                </div>
            );
        }
    }
};

import { bindActionCreators } from 'redux'

function mapStateToProps(state) {
    return {
        news: state.news,
        login: state.login
    };
}

function mapDispatchToProps(dispatch) {
    let actions = bindActionCreators({...swal}, dispatch);
    return { ...actions, dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(adminComponent(NewsEdit))
