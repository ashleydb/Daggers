var React = require('react');
var {connect} = require('react-redux');
//import {actions} from 'actions';
import * as NewsAPI from 'NewsAPI';

// TODO: Need something to say story not found?

export var NewsStory = React.createClass({
    componentWillMount: function() {
        //NewsAPI.loadStories();
        
        //this.props.dispatch(actions.news.fetchNewsStoryIfNeeded(this.props.params.newsId));
    },
    // TODO: Add componentWillUnmount to null out the story again?
    render: function() {
        // Get the story data from NewsAPI, based on the ID in the URL params
        // TODO: Should this come some other way...? like from the redux state? Same method as NewsEdit/NewsEditForm?
        
        var {news, status} = this.props.news; // TODO: .news shouldn't be needed
        var {newsId} = this.props.params;
        var story = NewsAPI.getStory(newsId, news);
        
        //var {story} = this.props.news;
        
        // Extra checking in case there was a story already loaded, but not the one we wanted
        if (status.isFetching) {
            return (
                <div>
                    <div className="callout">
                      <h5>Loading</h5>
                      <p>Please wait while we get the news...</p>
                    </div>
                </div>
            );
        } else if (!story || story.id != newsId) {
            return (
                <div>
                    <div className="callout alert">
                      <h5>Error</h5>
                      <p>Story not found.</p>
                    </div>
                </div>
            );
        } else {
            var youtube = null;
            if (story.youtube) {
                // Example link: https://youtu.be/Y9OCIIKwI94
                // Get the ID at the end to insert below
                var urlComponents = story.youtube.split("/");
                var videoId = urlComponents[urlComponents.length - 1];
                youtube = (<iframe width={560} height={315} src={`https://www.youtube.com/embed/${videoId}?ecver=1`} frameBorder={0} allowFullScreen></iframe>);
            }
            return (
                <div>
                    <div className="column">
                        <div className="card card-block">
                            <div className="card-divider">
                                <h4>{story.headline}</h4>
                            </div>
                            <img src={story.image} alt={story.summary} className="news-main-image"/>
                            <div className="card-section" dangerouslySetInnerHTML={{__html: story.story}}></div>
                            {youtube}
                        </div>
                    </div>
                </div>
            );
        }
    }
});

//module.exports = NewsStory;

export default connect(
  (state) => {
    return {
        news: state.news
        //story: state.story //TODO: Fix this, if we split up the news reducer
    };
  })(NewsStory);
