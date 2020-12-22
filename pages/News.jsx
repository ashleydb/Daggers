import React from 'react';
//import ReactDOM from 'react-dom';
var { connect } = require('react-redux');
import { bindActionCreators } from 'redux';
import { wrapper } from '../store/store';
import { actions } from '../actions/actions';
import NewsSummary from '../components/NewsSummary';
import * as NewsAPI from '../api/NewsAPI';
import MedianetTag from '../components/MedianetTag';
import Layout from '../components/Layout';

// TODO: Replace placeholder ads with an AdSense React component. One probably exists out there already.
// TODO: 3 wide on a phone doesn't look good. Breaks down to 2, 1.


// export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
//     //store.dispatch(action_initialCards());
// })

// const mapDispatchToProps = (dispatch) => {
//     return {
//         //action_initialCards: bindActionCreators(action_initialCards, dispatch),
//         //action_addItem: bindActionCreators(action_addItem, dispatch)
//     }
// }

// const mapStateToProps = (state) => {
//     return {
//         //cards: state.cards
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Index);
//export default Index;

export class News extends React.Component {
    // Need to override the constructor to set the initial state and do data binding
    constructor(props) {
        // Call the parent constructor with the props object we automatically get
        super(props);
        // Binding
        this.setPage = this.setPage.bind(this);
        this.handleFetchNews = this.handleFetchNews.bind(this);
    }
    componentDidMount() {
        // Are we at 'news:id'?
        var newsId = null;
        if (this.props.params) {
            newsId = this.props.params.newsId;
        }
        if (!newsId) {
            // We are on the overall News page, not a specific story. Get the most recent year's news
            this.props.fetchNewsStoriesIfNeeded(actions.news.FETCH_LATEST, actions.news.FETCH_LATEST);
        }
    }
    // componentDidMount() {
    //     ReactDOM.findDOMNode(this._contentTop).scrollIntoView();
    // }
    handleFetchNews() {
        var year = Number(this.refs.year.value);
        var month = Number(this.refs.month.value);
        this.props.fetchNewsStoriesIfNeeded(year, month);
    }
    setPage(pageNum) {
        // Change which page of news stories we are showing
        this.props.pageNews(pageNum);
    }
    render() {
        //console.log(this.props);
        //if (!this.props.news) console.log("props.news not found");

        var { news, status, pageOfNews } = this.props.news;

        // TODO: Break out this pagination code into something reusable, (e.g. for NewsEdit)
        function datePicker(_that, _year, _month) {
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
                    <option key={index} value={index + 1}>{month}</option>
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
                        <br />
                        <button className="button" onClick={_that.handleFetchNews}>Go</button>
                    </div>
                </div>
            );
        }

        if (this.props.children) {
            // This will render `NewsStory.jsx` when at /news/:newsId
            return (
                <Layout>
                    <div>
                        <div id="contentTop" name="contentTop" ref={(ref) => this._contentTop = ref} />
                        {this.props.children}
                    </div>
                </Layout>
            );
        } else if (status.isFetching) {
            return (
                <Layout>
                    <div>
                        <div id="contentTop" name="contentTop" ref={(ref) => this._contentTop = ref} />
                        <div className="callout">
                            <h5>Loading</h5>
                            <p>Please wait while we get the news...</p>
                        </div>
                    </div>
                </Layout>
            );
        } else if (!news || news.length < 1) {
            var dateNow = new Date();
            var pickMonth = status.month && (typeof status.month === 'number') ? status.month : dateNow.getMonth() + 1;
            var pickYear = status.year && (typeof status.year === 'number') ? status.year : dateNow.getFullYear();
            return (
                <Layout>
                    <div>
                        <div id="contentTop" name="contentTop" ref={(ref) => this._contentTop = ref} />
                        {datePicker(this, pickYear, pickMonth)}

                        <div className="callout alert">
                            <h5>Error</h5>
                            <p>No news found.</p>
                        </div>
                    </div>
                </Layout>
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
                var currentPage = (<li className="current"><span className="show-for-sr">You're on page</span> {_pageNum + 1}</li>);

                var prevLink = null;
                if (_pageNum == 0) {
                    prevLink = (<li className="pagination-previous disabled">Newer</li>);
                } else {
                    prevLink = (<li className="pagination-previous"><a onClick={(e) => { that.setPage(_pageNum - 1) }} aria-label="Newer news">Newer</a></li>);
                }

                var nextLink = null;
                if (_pageNum + 1 == _numPages) {
                    nextLink = (<li className="pagination-next disabled">Older</li>);
                } else {
                    nextLink = (<li className="pagination-next"><a onClick={(e) => { that.setPage(_pageNum + 1) }} aria-label="Older news">Older</a></li>);
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

            return (
                <Layout>
                    <div>
                        <div id="contentTop" name="contentTop" ref={(ref) => this._contentTop = ref} />
                        {datePicker(this, pickYear, pickMonth)}
                        {paginationLinks}

                        {/* will render a list of news items when at /news/ */}
                        <div className="row small-up-1 medium-up-3 large-up-4">
                            <div className="column">
                                <NewsSummary story={tempNews.shift()} style="SMALL" />
                            </div>
                            <div className="column">
                                <NewsSummary story={tempNews.shift()} style="SMALL" />
                            </div>
                            <div className="column">
                                <NewsSummary story={tempNews.shift()} style="SMALL" />
                            </div>
                            <div className="column medium-centered large-uncentered">
                                <div className="placeholder-ad">
                                    <MedianetTag cid="8CUM55E8A" crid="513062281" size="300x250" divId="513062281" />
                                </div>
                            </div>
                        </div>

                        <div className="row small-up-1 medium-up-3 large-up-4">
                            <div className="column">
                                <NewsSummary story={tempNews.shift()} style="SMALL" />
                            </div>
                            <div className="column">
                                <NewsSummary story={tempNews.shift()} style="SMALL" />
                            </div>
                            <div className="column">
                                <NewsSummary story={tempNews.shift()} style="SMALL" />
                            </div>
                            <div className="column medium-centered large-uncentered">
                                <div className="placeholder-ad">
                                    <MedianetTag cid="8CUM55E8A" crid="513062281" size="300x250" divId="513062281" />
                                </div>
                            </div>
                        </div>

                        <div className="row small-up-1 medium-up-3 large-up-4">
                            <div className="column">
                                <NewsSummary story={tempNews.shift()} style="SMALL" />
                            </div>
                            <div className="column">
                                <NewsSummary story={tempNews.shift()} style="SMALL" />
                            </div>
                            <div className="column">
                                <NewsSummary story={tempNews.shift()} style="SMALL" />
                            </div>
                            <div className="column medium-centered large-uncentered">
                                <div className="placeholder-ad">
                                    <MedianetTag cid="8CUM55E8A" crid="513062281" size="300x250" divId="513062281" />
                                </div>
                            </div>
                        </div>

                        <div>
                            {paginationLinks}
                        </div>

                    </div>
                </Layout>
            );
        }
    }
};

// export default connect(
//   (state) => {
//     return {
//         news: state.news
//     };
//   })(News);

export const getServerSideProps = wrapper.getServerSideProps(
    async ({ store }) => {
        //store.dispatch(serverRenderClock(true))
        //store.dispatch(addCount())
        actions.news.fetchNewsStoriesIfNeeded(actions.news.FETCH_LATEST, actions.news.FETCH_LATEST);
    }
)

const mapDispatchToProps = (dispatch) => {
    return {
        fetchNewsStoriesIfNeeded: bindActionCreators(actions.news.fetchNewsStoriesIfNeeded, dispatch),
        pageNews: bindActionCreators(actions.news.pageNews, dispatch),
    }
}

export default connect(state => state, mapDispatchToProps)(News)
