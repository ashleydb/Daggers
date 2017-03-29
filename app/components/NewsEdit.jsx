var React = require('react');
var {Link, browserHistory} = require('react-router');
var {connect} = require('react-redux');
var NewsEditForm = require('NewsEditForm');
//var NewsStory = require('NewsStory');
import {actions} from 'actions';
import * as NewsAPI from 'NewsAPI';

// TODO: Need to lock behind authentication
// TODO: Need to change the whole app to use Redux to manage the state more effectively.
// TODO: Can a story have a YouTube video in it?

export var NewsEdit = React.createClass({
//    componentWillMount: function() {
//        NewsAPI.loadStories();
//    },
    handleSaveStory: function(story) {
//        // TODO: Should this logic really live here?
//        if (story.id == 0)
//            this.props.dispatch(actions.news.editStory(story));
//        else
//            this.props.dispatch(actions.news.addStory(story));
        this.props.dispatch(actions.news.submitStory(story));
        
        /*
        if (NewsAPI.writeStory(story)) {
            // TODO: Make the state stuff work for real, using Redux
            this.setState({stories: NewsAPI.getStories()});
            browserHistory.push('/admin/news');
        }
        */

        // TODO: Not great, since write could fail and then we've gone away from the form's contents
        browserHistory.push('/admin/news');
    },
    render: function() {
        // Are we editing at a story right now, or about to?
        var {newsId} = this.props.params;
        var {news, status} = this.props.news; // TODO: .news shouldn't be needed
        var story = NewsAPI.getStory(newsId, news);
        
        if (status.isFetching) {
            return (
                <div>
                    <Link to="/admin" className="expanded button alert"><i className="fi-home"></i> Admin Tools Menu</Link>
                    <div className="callout">
                      <h5>Loading</h5>
                      <p>Please wait while we get the news...</p>
                    </div>
                </div>
            );
        } else if (newsId == "new" || (story.id && story.id == newsId)) {
            return (
                <div>
                    <NewsEditForm story={story} onSaveStory={this.handleSaveStory}/>
                    {/*<NewsEditForm/>*/}
                </div>
            );
        } else if (news && news.length > 0) {
            // Show a list of stories to edit
            //var headlines = NewsAPI.getHeadlines();
            
            var errorMessage = status.error === undefined ? null : (
                <div className="callout alert">
                  <h5>Error</h5>
                  <p>{status.error}</p>
                </div>
            );
            
            // TODO: Improve rendering here. Show as a table with titles/dates and buttons to view/edit/delete
            //  Create New can be at the top.
            //  Add pagination, (see below,) links to load stories for a given day/week/month/year/season or just a "Load More" button?
            /*
            <ul className="pagination text-center" role="navigation" aria-label="Pagination">
              <li className="pagination-previous disabled">Previous</li>
              <li className="current"><span className="show-for-sr">You're on page</span> 1</li>
              <li><a href="#" aria-label="Page 2">2</a></li>
              <li><a href="#" aria-label="Page 3">3</a></li>
              <li><a href="#" aria-label="Page 4">4</a></li>
              <li className="ellipsis"></li>
              <li><a href="#" aria-label="Page 12">12</a></li>
              <li><a href="#" aria-label="Page 13">13</a></li>
              <li className="pagination-next"><a href="#" aria-label="Next page">Next</a></li>
            </ul>
            */
            return (
                <div>
                    <Link to="/admin" className="expanded button alert"><i className="fi-home"></i> Admin Tools Menu</Link>
                    {errorMessage}
                    <ul>
                        {news.map(story => (
                            <li key={story.id}>
                                <Link to={`/admin/news/${story.id}`}>{story.headline}</Link>
                            </li>
                        ))}
                        
                        <li key="new">
                            <Link to={`/admin/news/new`}><i className="fi-plus"></i> Create New</Link>
                        </li>
                    </ul>
                </div>
            );
        } else {
            return (
                <div>
                    <Link to="/admin" className="expanded button alert"><i className="fi-home"></i> Admin Tools Menu</Link>
                    <div className="callout alert">
                      <h5>Error</h5>
                      <p>No news found.</p>
                    </div>
                </div>
            );
        }
    }
});

//module.exports = NewsEdit;

export default connect(
  (state) => {
    return {
        news: state.news
        //story: state.story //TODO: Fix this, if we split up the news reducer
    };
  })(NewsEdit);
