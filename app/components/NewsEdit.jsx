var React = require('react');
var {Link, browserHistory} = require('react-router');
var {connect} = require('react-redux');
var NewsEditForm = require('NewsEditForm');
var actions = require('actions');
var NewsAPI = require('NewsAPI');

// TODO: Need to lock behind authentication
// TODO: Need to change the whole app to use Redux to manage the state more effectively.
// TODO: Can a story have a YouTube video in it?

export var NewsEdit = React.createClass({
//    componentWillMount: function() {
//        NewsAPI.loadStories();
//    },
//    handleSaveStory: function(story) {
//        if (NewsAPI.writeStory(story)) {
//            // TODO: Make the state stuff work for real, using Redux
//            this.setState({stories: NewsAPI.getStories()});
//            browserHistory.push('/editnews');
//        }
//    },
    render: function() {
        // Are we editing at a story right now, or about to?
        var {newsId} = this.props.params;
        var {news, story} = this.props.news; // TODO: .news shouldn't be needed
        
        if (story) {
            return (
                <div>
                    {/*<NewsEditForm story={story} onSaveStory={this.handleSaveStory}/>*/}
                    <NewsEditForm/>
                </div>
            );
        } else if (newsId) {
            // Get the story data from NewsAPI, based on the ID in the URL params, (or start a new one)
            var story = (newsId == "new") ?
                NewsAPI.createStoryObject() :
                NewsAPI.getStory(newsId);
            
            this.props.dispatch(actions.editStory(story));
        } else {
            // Show a list of stories to edit
            //var headlines = NewsAPI.getHeadlines();
            
            return (
                <div>
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
