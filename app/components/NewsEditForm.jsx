var React = require('react');
var {Link} = require('react-router');
//var {connect} = require('react-redux');
//var actions = require('actions');

// For Rich Text Editor
import Trumbowyg from 'react-trumbowyg'
import 'style!css!react-trumbowyg/dist/trumbowyg.min.css';

// For uploading images
import ImageUploader from 'ImageUploader';

// TODO: Image picking.
// TODO: Set initial state, (or editors onLoad or something) so that the text isn't empty, since we validate story.length > 0, so if you don't change the text and only edit a headline, the story can't be saved.
// TODO: Hide the regular story input field?

var NewsEditForm = React.createClass({
    // Callback for rich text editor
    onTextChange: function(editor) {
        //this.setState({ text: editor.target.innerHTML });
        this.refs.story.value = editor.target.innerHTML;
    },
    onFormSubmit: function(event) {
        //Don't refresh the whole page when the form button is clicked
        event.preventDefault();
        
        var story = {};
        //story.id = Number(this.refs.id.value);
        story.id = this.refs.id.value;
        story.headline = this.refs.headline.value;
        story.summary = this.refs.summary.value;
        story.image = this.refs.image.value;
        
        story.story = this.refs.story.value;                    // Works as we're repurposing in onTextChange
        //story.story = this.refs.storyrich.target.innerHTML;   // This doesn't work
        //story.story = this.state.text;                        // This is if we manage the text on the state
        
        if (story.headline.length > 0 &&
            story.summary.length > 0 &&
            story.story.length > 0 &&
            story.image.length > 0) {
            
//            this.refs.headline.value = '';
//            this.refs.summary.value = '';
//            this.refs.story.value = '';
//            this.refs.image.value = '';
            
            this.props.onSaveStory(story);
            //this.props.dispatch(actions.addStory(story));
        }
    },
    onNewImage(imgPath) {
        this.refs.image.value = imgPath;
    },
    render: function() {
        // TODO: Need to add an image picker, not just an uploader. May want to rearrange the form elements too.
        
        // TODO: Related to the comment in connect() below, this shouldn't need .news on it
        var {story} = this.props;
        return (
            <div>
                <ImageUploader onImageUploaded={this.onNewImage} ref="imageUploader"/>
                
                <form onSubmit={this.onFormSubmit}>
                    <input type="hidden" defaultValue={story.id} ref="id"/>
                    <label>Headline</label><input type="text" defaultValue={story.headline} ref="headline"/>
                    <label>Summary</label><input type="text" defaultValue={story.summary} ref="summary"/>
                    <label>Image</label><input type="text" defaultValue={story.image} ref="image"/>
                    
                    {/* Note I've removed ['insertImage'] from the buttons for now */}
                    <label>Story</label>
                    <Trumbowyg id='react-trumbowyg'
                        buttons={
                            [
                                ['formatting'],
                                'btnGrp-semantic',
                                ['link'],
                                'btnGrp-justify',
                                'btnGrp-lists',
                                ['fullscreen']
                            ]
                        }
                        data={story.story}
                        placeholder='Type your text!'
                        onChange={this.onTextChange}
                        ref="storyrich"
                    />
                    
                    <label>Story HTML</label><input type="text" defaultValue={story.story} ref="story" readOnly/>
                    
                    <button className="hollow expanded button">Submit</button>
                </form>
                <Link to="/editnews" className="hollow expanded button">Cancel</Link>
            </div>
        );
    }
})

module.exports = NewsEditForm;

/*
export default connect(
  (state) => {
    return {
      //story: state.story // TODO: Should only need story, but that is currently in news.story, so adding news back into the state here
        news: state.news
    };
  })(NewsEditForm);
*/
