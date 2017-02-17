var React = require('react');
var {Link, browserHistory} = require('react-router');
var NewsEditForm = require('NewsEditForm');
var NewsAPI = require('NewsAPI');

// TODO: Need to change the whole app to use Redux to manage the state more effectively.
// TODO: How do I return to the list of headlines after finishing the form?

var NewsEdit = React.createClass({
    componentWillMount: function() {
        NewsAPI.loadStories();
    },
    handleSaveStory: function(story) {
        if (NewsAPI.writeStory(story)) {
            // TODO: Make this work for real
            this.setState({stories: NewsAPI.getStories()});
            browserHistory.createLocation('editnews');
        }
    },
    render: function() {
        
        // Are we looking at a story right now?
        if (this.props.params.newsId) {
            // Get the story data from NewsAPI, based on the ID in the URL params
            var story = NewsAPI.getStory(this.props.params.newsId);
            
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
                    </ul>
                </div>
            );
        }

    }
});

module.exports = NewsEdit;
