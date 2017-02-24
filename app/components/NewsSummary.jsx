var React = require('react');
import { Link } from 'react-router';
//import * as NewsAPI from 'NewsAPI';

var NewsSummary = React.createClass({
//    componentWillMount: function() {
//        NewsAPI.loadStories();
//    },
    render: function() {
        //var story = NewsAPI.getStory(this.props.id);
        var {story, style} = this.props;
        
        switch(style) {
            case 'MAIN':
                // Main headline news, show in large format
                return (
                    <div className="column">
                        <div className="card card-block">
                            <div className="card-divider">
                                <Link to={`/story/${story.id}`}><h4>{story.headline}</h4></Link>
                            </div>
                            <Link to={`/story/${story.id}`}>
                                <img src={story.image} alt={story.summary} className="news-main-image"/>
                            </Link>
                            <div className="card-section">
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
                            <Link to={`/story/${story.id}`}>
                                <img src={story.image} alt={story.summary} className="news-thumbnail"/>
                            </Link>
                            <div className="card-section">
                                <Link to={`/story/${story.id}`}><h4>{story.headline}</h4></Link>
                                <p>{story.summary}</p>
                            </div>
                        </div>
                    </div>
                );
                break;
        };
    }
});

module.exports = NewsSummary;
