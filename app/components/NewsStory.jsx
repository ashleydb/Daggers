import React from 'react';
var { connect } = require('react-redux');
import {actions} from 'actions';
import * as NewsAPI from 'NewsAPI';

export class NewsStory extends React.Component {
    // Need to override the constructor to set the initial state and do data binding
    constructor(props) {
        // Call the parent constructor with the props object we automatically get
        super(props);
    }
    componentWillMount() {
        var { news, status } = this.props.news;
        var { newsId } = this.props.params;

        if (newsId) {
            // Get a specific story and if it isn't found locally then try and get it from our server
            var story = news ? NewsAPI.getStory(newsId, news) : null;
            if (!story || story.id != newsId) {
                // TODO: Lazy. Just gets ALL news data to guarantee we get the story. Users are getting lots of data and we're spending on bandwidth.
                this.props.dispatch(actions.news.fetchNewsStoriesIfNeeded());
            }
        }
    }
    componentDidMount () {
        window.scrollTo(0, 0);
    }
    render() {
        // Get the story data from NewsAPI, based on the ID in the URL params
        // TODO: Should this come some other way...? like from the redux state? Same method as NewsEdit/NewsEditForm?

        var { news, status } = this.props.news; // TODO: .news shouldn't be needed
        var { newsId } = this.props.params;
        var story = NewsAPI.getStory(newsId, news);

        var image = story.image;
        if (!image) {
            image = NewsAPI.DEFAULT_STORY.image;
        }
        image = `https://{-{gcp.storageBucket}-}.storage.googleapis.com${image}`;

        var dateMS = story.createdAt;
        var d = new Date(Number(dateMS));
        var dateStr = d.toDateString();

        if (story.updatedAt) {
            dateMS = story.updatedAt;
            d = new Date(Number(dateMS));
            dateStr = `${dateStr} , (Last Updated: ${d.toDateString()})`;
        }

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
                            <img src={image} alt={story.summary} className="news-main-image" />
                            <div className="card-section">
                                <p className="news-date">{dateStr}</p>
                            </div>
                            <div className="card-section" dangerouslySetInnerHTML={{ __html: story.story }}></div>
                            {youtube}
                        </div>
                    </div>
                </div>
            );
        }
    }
};

export default connect(
    (state) => {
        return {
            news: state.news
        };
    })(NewsStory);
