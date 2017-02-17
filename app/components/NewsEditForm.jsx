var React = require('react');
var {Link} = require('react-router');

var NewsEditForm = React.createClass({
    onFormSubmit: function(event) {
        //Don't refresh the whole page when the form button is clicked
        event.preventDefault();
        
        var story = {};
        story.id = this.refs.id.value;
        story.headline = this.refs.headline.value;
        story.summary = this.refs.summary.value;
        story.story = this.refs.story.value;
        story.image = this.refs.image.value;
        
        if (story.headline.length > 0 &&
            story.summary.length > 0 &&
            story.story.length > 0 &&
            story.image.length > 0) {
            
            this.refs.headline.value = '';
            this.refs.summary.value = '';
            this.refs.story.value = '';
            this.refs.image.value = '';
            
            this.props.onSaveStory(story);
        }
    },
    render: function() {
        var {story} = this.props;
        return (
            <div>
                <form onSubmit={this.onFormSubmit}>
                    <input type="hidden" defaultValue={story.id} ref="id"/>
                    <label>Headline</label><input type="text" defaultValue={story.headline} ref="headline"/>
                    <label>Summary</label><input type="text" defaultValue={story.summary} ref="summary"/>
                    <label>Story</label><input type="text" defaultValue={story.story} ref="story"/>
                    <label>Image</label><input type="text" defaultValue={story.image} ref="image"/>
                    <button className="hollow expanded button">Submit</button>
                </form>
                <Link to="editnews" className="hollow expanded button">Cancel</Link>
            </div>
        );
    }
})

module.exports = NewsEditForm;
