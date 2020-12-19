import React from 'react';
import {Link} from 'next/link';

// For uploading images
import ImageUploader from 'ImageUploader';
import ImageLister from 'ImageLister';

export default class BannerEditForm extends React.Component {
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

        var banner = {
            image: this.refs.image.value,
            link: this.refs.link.value,
            description: this.refs.description.value
        };
        
        if (banner.image.length > 0) {
            this.props.onSaveBanner(banner);
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
        var banner = this.props.banner || {};
        var image = this.state.image || banner.image;
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
                        <ImageLister directory="banners" onPickImage={this.onPickImage} selectedImage={image}/>
                    </div>
                    <div className="columns small-6">
                        <ImageUploader onImageUploaded={this.onNewImage} token={this.props.token} folderName="banners" ref="imageUploader"/>
                        <input type="text" value={imagePath} readOnly ref="imagePath"/>
                        {imagePreview}
                    </div>
                </div>
                
                <form onSubmit={this.onFormSubmit}>
                    <label>Description</label><input type="text" defaultValue={banner.description} ref="description"/>
                    <label>Link</label><input type="text" defaultValue={banner.link} ref="link"/>
                    
                    <button className="expanded button success"><i className="fi-save"></i> Save</button>
                    <Link href="/admin/banner" className="expanded button alert"><i className="fi-x"></i> Cancel</Link>
                    
                    <div id="editBannerDebug" className="hide">
                        <label>Image</label><input type="text" defaultValue={image} ref="image" readOnly/>
                    </div>
                </form>
            </div>
        );
    }
}
