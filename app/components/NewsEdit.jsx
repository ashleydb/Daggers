var React = require('react');
var {Link, browserHistory} = require('react-router');
var NewsEditForm = require('NewsEditForm');
var NewsAPI = require('NewsAPI');

// TODO: Need to change the whole app to use Redux to manage the state more effectively.

var NewsEdit = React.createClass({
    componentWillMount: function() {
        NewsAPI.loadStories();
    },
    handleSaveStory: function(story) {
        if (NewsAPI.writeStory(story)) {
            // TODO: Make the state stuff work for real, using Redux
            this.setState({stories: NewsAPI.getStories()});
            browserHistory.push('/editnews');
        }
    },
    render: function() {
        // Are we editing at a story right now?
        var {newsId} = this.props.params;
        if (newsId) {
            // Get the story data from NewsAPI, based on the ID in the URL params, (or start a new one)
            var story = (newsId == "new") ?
                NewsAPI.createStoryObject() :
                NewsAPI.getStory(this.props.params.newsId);
            
            return (
                <div>
                    <NewsEditForm story={story} onSaveStory={this.handleSaveStory}/>
                </div>
            );
        } else {
            // Show a list of stories to edit
            var headlines = NewsAPI.getHeadlines();
            
            return (
                <div>
                    <ul>
                        {headlines.map(story => (
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

module.exports = NewsEdit;
