var React = require('react');
var NewsAPI = require('NewsAPI');

// TODO: Need something to say story not found?

var NewsStory = React.createClass({
    componentWillMount: function() {
        NewsAPI.loadStories();
    },
    render: function() {
        // Get the story data from NewsAPI, based on the ID in the URL params
        var story = NewsAPI.getStory(this.props.params.newsId);
        
        return (
            <div>
                <div className="column">
                    <div className="card card-block">
                        <div className="card-divider">
                            <h4>{story.headline}</h4>
                        </div>
                        <img src={story.image} alt={story.summary} className="news-main-image"/>
                        <div className="card-section" dangerouslySetInnerHTML={{__html: story.story}}></div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = NewsStory;
