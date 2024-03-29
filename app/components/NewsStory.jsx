import React from 'react';
var { connect } = require('react-redux');
import {Helmet} from 'react-helmet';
import {actions} from 'actions';
import * as NewsAPI from 'NewsAPI';

export class NewsStory extends React.Component {
    // Need to override the constructor to set the initial state and do data binding
    constructor(props) {
        // Call the parent constructor with the props object we automatically get
        super(props);
    }
    componentWillMount() {
        var { story } = this.props.news; // TODO: .news shouldn't be needed
        var { newsId } = this.props.params;

        if (!story || (newsId && (story.id != newsId))) {
            // Get a specific story and if it isn't found locally then try and get it from our server
            this.props.dispatch(actions.news.fetchNewsStoryIfNeeded(newsId));
        }
    }
    componentDidMount () {
        window.scrollTo(0, 0);
    }
    render() {
        var { story, status } = this.props.news; // TODO: .news shouldn't be needed
        var { newsId } = this.props.params;

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

            if (story.category)
                dateStr = dateStr + ' [' + story.category + ']';

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
                    <Helmet>
                        <title>{story.headline}</title>
                        <meta name="description" content={story.summary} />
                        <meta property="og:title" content={story.headline + " | Dagenham &amp; Redbridge FC"} />
                        <meta property="og:description" content={story.summary} />
                        <meta property="og:image" content={image} />
                        <meta property="og:url" content={"https://www.daggers.co.uk/news/" + story.id} />
                    </Helmet>
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
