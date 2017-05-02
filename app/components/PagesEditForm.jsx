import React from 'react';
import {Link} from 'react-router';

// For Rich Text Editor
import Trumbowyg from 'react-trumbowyg'
import 'style!css!react-trumbowyg/dist/trumbowyg.min.css';

// For uploading images
import ImageUploader from 'ImageUploader';
import ImageLister from 'ImageLister';

// TODO: Image picking.
// TODO: Set initial state, (or editors onLoad or something) so that the text isn't empty, since we validate story.length > 0, so if you don't change the text and only edit a headline, the story can't be saved.

export default class PagesEditForm extends React.Component {
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
        this.refs.content.value = editor.target.innerHTML;
    }
    onFormSubmit(event) {
        //Don't refresh the whole page when the form button is clicked
        event.preventDefault();
        
        var page = {};
        page.id = this.refs.id.value;
        page.name = this.refs.name.value;
        page.content = this.refs.content.value;

        // If we are editing an existing story, preserve the original creation date
        if (this.refs.createdAt.value != '')
            page.createdAt = Number(this.refs.createdAt.value);
        
        // TODO: How are we going to handle images? Ignore the picker? Have the picker add text to the content field?
        //story.image = this.refs.image.value;
        
        if (page.name.length > 0 &&
            page.content.length > 0) {
            this.props.onSavePage(page);
        }
    }
    onNewImage(imgPath) {
        // TODO: Add to the content field?
        this.refs.image.value = imgPath;
        this.setState({image: imgPath});
    }
    onPickImage(imgPath) {
        // TODO: Add to the content field?
        this.refs.image.value = imgPath;
        this.setState({image: imgPath});
    }
    render() {
        var {page} = this.props;
        var image = this.state.image;// || story.image;

        // TODO: className="news-image-preview" below. Replace this? Remove it?
        return (
            <div>
                <div className="row">
                    <div className="columns small-6">
                        <ImageLister onPickImage={this.onPickImage}/>
                    </div>
                    <div className="columns small-6">
                        <ImageUploader onImageUploaded={this.onNewImage} token={this.props.token} ref="imageUploader"/>
                        <img src={image} alt="Image Preview" className="news-image-preview"/>
                    </div>
                </div>
                
                <form onSubmit={this.onFormSubmit}>
                    <input type="hidden" defaultValue={page.id} ref="id"/>
                    <input type="hidden" defaultValue={page.createdAt} ref="createdAt"/>
                    <label>Name</label><input type="text" defaultValue={page.name} ref="name"/>
                    
                    <label>Content</label>
                    <Trumbowyg id='react-trumbowyg'
                        buttons={
                            [
                                ['formatting'],
                                'btnGrp-semantic',
                                ['link'],
                                ['insertImage'],
                                'btnGrp-justify',
                                'btnGrp-lists',
                                ['fullscreen']
                            ]
                        }
                        data={page.content}
                        placeholder='Type your text!'
                        onChange={this.onTextChange}
                        ref="contentrich"
                    />
                    
                    <button className="expanded button success"><i className="fi-save"></i> Save</button>
                    <Link to="/admin/pages" className="expanded button alert"><i className="fi-x"></i> Cancel</Link>
                    
                    <div id="editPagesDebug" className="hide">
                        <label>Image</label><input type="text" defaultValue={image} ref="image" readOnly/>
                        <label>Content HTML</label><input type="text" defaultValue={page.content} ref="content" readOnly/>
                    </div>
                </form>
            </div>
        );
    }
}
