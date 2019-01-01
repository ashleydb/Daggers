import React from 'react';
import {Link} from 'react-router';

// For Rich Text Editor
import Trumbowyg from 'react-trumbowyg';
import '../../node_modules/trumbowyg/dist/plugins/table/trumbowyg.table';

// For uploading images
import ImageUploader from 'ImageUploader';
import ImageLister from 'ImageLister';

export default class NewsEditForm extends React.Component {
    // Need to override the constructor to set the initial state and do data binding
    constructor(props) {
        // Call the parent constructor with the props object we automatically get
        super(props);
        // Now set the state here, based on the props
        this.state = {
            image: null
        };
        // BINDING: Keep 'this' scoped to this object in any handlers
        this.onTextChange = this.onTextChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onNewImage = this.onNewImage.bind(this);
        this.onPickImage = this.onPickImage.bind(this);
    }
    // Callback for rich text editor
    onTextChange(editor) {
        this.refs.story.value = editor.target.innerHTML;
    }
    onFormSubmit(event) {
        //Don't refresh the whole page when the form button is clicked
        event.preventDefault();
        
        var story = {};
        //story.id = Number(this.refs.id.value);
        story.id = this.refs.id.value;
        story.headline = this.refs.headline.value;
        story.summary = this.refs.summary.value;
        story.image = this.refs.image.value;
        
        if (this.refs.youtube.value != '')
            story.youtube = this.refs.youtube.value;
        
        // If we are editing an existing story, preserve the original creation date
        if (this.refs.createdAt.value != '') {
            // Turn the date string into a ms number
            story.createdAt = new Date(this.refs.createdAt.value).getTime();
            // If it is NaN, then there will be problems
            // TODO: Make this a clearer warning with a dialog box or form hint or something
            if ( isNaN(story.createdAt) ) {
                return;
            }
        }
        if (this.refs.oldCreatedAt.value != '')
            story.oldCreatedAt = Number(this.refs.oldCreatedAt.value);
        
        story.story = this.refs.story.value;                    // Works as we're repurposing in onTextChange
        //story.story = this.refs.storyrich.target.innerHTML;   // This doesn't work
        //story.story = this.state.text;                        // This is if we manage the text on the state
        
        if (story.headline.length > 0 &&
            story.summary.length > 0 &&
            story.story.length > 0 &&
            story.image.length > 0) {
            this.props.onSaveStory(story);
        }
    }
    onNewImage(imgPath) {
        this.refs.image.value = imgPath;
        this.setState({image: imgPath});
    }
    onPickImage(imgPath) {
        this.refs.image.value = imgPath;
        this.setState({image: imgPath});
    }
    render() {
        // TODO: Break this out as a utility function, (also used elsewhere)
        function dateToString(dateMS) {
            if (!dateMS)
                return '';

            var d = new Date(Number(dateMS));
            var months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
            //01-JAN-2000
            return `${d.getDate()}-${months[d.getMonth()]}-${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
        }

        var {story} = this.props;
        var image = this.state.image || story.image;
        var imagePath = '';
        var imagePreview = null;
        if (image) {
            imagePath = `https://{-{gcp.storageBucket}-}.storage.googleapis.com${image}`;
            // TODO: className="news-image-preview" - Replace/Rename this?
            imagePreview = <img src={imagePath} alt="Image Preview" className="news-image-preview"/>
        }
        return (
            <div>
                <div className="row">
                    <div className="columns small-6">
                        <ImageLister onPickImage={this.onPickImage} selectedImage={image}/>
                    </div>
                    <div className="columns small-6">
                        <ImageUploader onImageUploaded={this.onNewImage} token={this.props.token} folderName="news" ref="imageUploader"/>
                        <input type="text" value={imagePath} readOnly ref="imagePath"/>
                        {imagePreview}
                    </div>
                </div>
                
                <form onSubmit={this.onFormSubmit}>
                    <input type="hidden" defaultValue={story.id} ref="id"/>
                    <input type="hidden" defaultValue={story.createdAt} ref="oldCreatedAt"/>
                    <label>Date</label><input type="text" defaultValue={dateToString(story.createdAt)} placeholder="Optional, e.g. 01-JAN-2030 09:00 or just 01-JAN-2030" ref="createdAt"/>
                    <label>Headline</label><input type="text" defaultValue={story.headline} ref="headline"/>
                    <label>Summary</label><input type="text" defaultValue={story.summary} ref="summary"/>
                    
                    <label>Story</label>
                    <Trumbowyg id='react-trumbowyg'
                        buttons={
                            [
                                ['viewHTML'],
                                ['formatting'],
                                'btnGrp-semantic',
                                ['link'],
                                ['insertImage'],
                                'btnGrp-justify',
                                'btnGrp-lists',
                                ['table'],
                                ['fullscreen']
                            ]
                        }
                        data={story.story}
                        placeholder='Type your text!'
                        onChange={this.onTextChange}
                        ref="storyrich"
                    />
                    
                    <label>YouTube</label><input type="text" defaultValue={story.youtube} placeholder="e.g. https://youtu.be/Y9OCIIKwI94" ref="youtube"/>
                    
                    <button className="expanded button success"><i className="fi-save"></i> Save</button>
                    <Link to="/admin/news" className="expanded button alert"><i className="fi-x"></i> Cancel</Link>
                    
                    <div id="editNewsDebug" className="hide">
                        <label>Image</label><input type="text" defaultValue={story.image} ref="image" readOnly/>
                        <label>Story HTML</label><input type="text" defaultValue={story.story} ref="story" readOnly/>
                    </div>
                </form>
            </div>
        );
    }
}
