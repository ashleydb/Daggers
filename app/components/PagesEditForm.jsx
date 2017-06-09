import React from 'react';
import {Link} from 'react-router';

// For Rich Text Editor
import Trumbowyg from 'react-trumbowyg';
import '../../node_modules/trumbowyg/dist/plugins/table/trumbowyg.table';

// For uploading images
import ImageUploader from 'ImageUploader';
import ImageLister from 'ImageLister';

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
        
        if (page.name.length > 0 &&
            page.content.length > 0) {
            this.props.onSavePage(page);
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
        var {page} = this.props;
        var image = this.state.image;
        var imagePreview = null;
        var imagePath = '';
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
                        <ImageUploader onImageUploaded={this.onNewImage} token={this.props.token} ref="imageUploader"/>
                        <input type="text" value={imagePath} readOnly ref="imagePath"/>
                        {imagePreview}
                    </div>
                </div>

                <div className="callout secondary">
                    <h5>How to add images to a page</h5>
                    <p>Use the tools above to upload, browse and preview images. When you find the one you want, note the full name, (e.g. "/basics/News-Generic2_169.jpg")</p>
                    <p>In the text editor below, click the Insert Image button: <i className="fi-photo"></i></p>
                    <p>You will be prompted for a URL, (enter the full image file name, e.g. "https://{-{gcp.storageBucket}-}.storage.googleapis.com/basics/News-Generic2_169.jpg", which you can copy above,) and a Description, (enter a comment, e.g. "Daggers TBS Stand".)</p>
                    <p>You can then drag the images around within the text box to move them on the page. You can delete the image in the same way as text.</p>
                </div>
                
                <form onSubmit={this.onFormSubmit}>
                    <input type="hidden" defaultValue={page.id} ref="id"/>
                    <input type="hidden" defaultValue={page.createdAt} ref="createdAt"/>
                    <label>Name</label><input type="text" defaultValue={page.name} ref="name"/>
                    
                    <label>Content</label>
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
