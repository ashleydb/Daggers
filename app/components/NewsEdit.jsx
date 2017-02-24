var React = require('react');
var {Link, browserHistory} = require('react-router');
var {connect} = require('react-redux');
var NewsEditForm = require('NewsEditForm');
//var NewsStory = require('NewsStory');
var actions = require('actions');
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
//            this.props.dispatch(actions.editStory(story));
//        else
//            this.props.dispatch(actions.addStory(story));
        this.props.dispatch(actions.submitStory(story));
        
        /*
        if (NewsAPI.writeStory(story)) {
            // TODO: Make the state stuff work for real, using Redux
            this.setState({stories: NewsAPI.getStories()});
            browserHistory.push('/editnews');
        }
        */

        // TODO: Not great, since write could fail and then we've gone away from the form's contents
        browserHistory.push('/editnews');
    },
    render: function() {
        // Are we editing at a story right now, or about to?
        var {newsId} = this.props.params;
        var {news, status} = this.props.news; // TODO: .news shouldn't be needed
        var story = NewsAPI.getStory(newsId, news);
        
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
            
            return (
                <div>
                    {errorMessage}
                    <ul>
                        {news.map(story => (
                            <li key={story.id}>
                                <Link to={`/editnews/${story.id}`}>{story.headline}</Link>
                            </li>
                        ))}
                        
                        <li key="new">
                            <Link to={`/editnews/new`}>Create New</Link>
                        </li>
                    </ul>
                </div>
            );
        } else {
            return (
                <div>
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
