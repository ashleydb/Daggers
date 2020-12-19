import React from 'react';
import {Link} from 'next/link';
var moment = require('moment');

// For uploading images
import ImageUploader from 'ImageUploader';
import ImageLister from 'ImageLister';

export default class SponsorsEditForm extends React.Component {
    // Need to override the constructor to set the initial state and do data binding
    constructor(props) {
        // Call the parent constructor with the props object we automatically get
        super(props);

        // Now set the state here, based on the props
        this.state = {
            image: null
        };

        // BINDING: Keep 'this' scoped to this object in any handlers
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onNewImage = this.onNewImage.bind(this);
        this.onPickImage = this.onPickImage.bind(this);
    }
    onFormSubmit(event) {
        //Don't refresh the whole page when the form button is clicked
        event.preventDefault();
        
        var sponsor = {};
        sponsor.id = this.refs.id.value;
        sponsor.name = this.refs.name.value;
        sponsor.link = this.refs.link.value;
        sponsor.image = this.refs.image.value;
        sponsor.type = this.refs.type.value;

        // TODO: Not doing much validation. Assuming all elements are optional, (which is not true!)
        this.props.onSaveSponsor(sponsor);
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
        var {sponsor} = this.props;
        var image = this.state.image || sponsor.image;
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
                        <ImageLister directory="sponsors" onPickImage={this.onPickImage} selectedImage={image}/>
                    </div>
                    <div className="columns small-6">
                        <ImageUploader onImageUploaded={this.onNewImage} token={this.props.token} folderName="sponsors" ref="imageUploader"/>
                        <input type="text" value={imagePath} readOnly ref="imagePath"/>
                        {imagePreview}
                    </div>
                </div>

                <form onSubmit={this.onFormSubmit}>
                    <input type="hidden" defaultValue={sponsor.id} ref="id"/>
                    <label>Name</label><input type="text" defaultValue={sponsor.name} placeholder="e.g. The National League" ref="name"/>
                    <label>Link</label><input type="text" defaultValue={sponsor.link} placeholder="e.g. https://www.thenationalleague.org.uk/" ref="link"/>
                    <label>Type</label><input type="text" defaultValue={sponsor.type} placeholder="e.g. Official Club Partner" ref="type"/>
                    
                    <button className="expanded button success"><i className="fi-save"></i> Save</button>
                    <Link href="/admin/sponsors" className="expanded button alert"><i className="fi-x"></i> Cancel</Link>
                    
                    <div id="editSponsorDebug" className="hide">
                        <label>Image</label><input type="text" defaultValue={sponsor.image} ref="image" readOnly/>
                    </div>
                </form>
            </div>
        );
    }
}
