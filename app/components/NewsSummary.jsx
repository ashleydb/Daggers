import React from 'react';
import { Link } from 'react-router';
import LazyLoad from 'react-lazyload';
import PlaceholderComponent from 'Placeholder';
import * as NewsAPI from 'NewsAPI';

export default class NewsSummary extends React.Component {
    // Need to override the constructor to set the initial state and do data binding
    constructor(props) {
        // Call the parent constructor with the props object we automatically get
        super(props);
    }
    render() {
        var { story, style } = this.props;

        if (!story)
            return (<div className="column column-block"></div>);

        var image = story.image;
        if (!image) {
            image = NewsAPI.DEFAULT_STORY.image;
        }
        image = `https://{-{gcp.storageBucket}-}.storage.googleapis.com${image}`;

        var dateMS = story.createdAt;
        var d = new Date(Number(dateMS));
        var dateStr = d.toDateString();

        if (story.category)
            dateStr = dateStr + ' [' + story.category + ']';

        switch (style) {
            case 'MAIN':
                // Main headline news, show in large format
                return (
                    <div className="column">
                        <div className="card card-block">
                            <div className="card-divider">
                                <Link to={`/news/${story.id}`}><h4>{story.headline}</h4></Link>
                            </div>
                            <Link to={`/news/${story.id}`}>
                                <LazyLoad placeholder={<PlaceholderComponent />}>
                                    <img src={image} alt={story.summary} className="news-main-image" />
                                </LazyLoad>
                            </Link>
                            <div className="card-section">
                                <p className="news-summary-date">{dateStr}</p>
                                <p>{story.summary}</p>
                            </div>
                        </div>
                    </div>
                );
                break;
            default:
                // Side news story, show a small preview
                return (
                    <div className="column column-block">
                        <div className="card">
                            <Link to={`/news/${story.id}`}>
                                <LazyLoad placeholder={<PlaceholderComponent />}>
                                    <img src={image} alt={story.summary} className="news-thumbnail" key={story.id} />
                                </LazyLoad>
                            </Link>
                            <div className="card-section">
                                <Link to={`/news/${story.id}`}><h4>{story.headline}</h4></Link>
                                <p className="news-summary-date">{dateStr}</p>
                                <p>{story.summary}</p>
                            </div>
                        </div>
                    </div>
                );
                break;
        };
    }
};
