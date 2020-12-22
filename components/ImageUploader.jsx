import React from 'react';
var Axios = require('axios');

// TODO: Change URL based on environment var

// Properties to define:
//  folderName: The folder to upload the image to, (e.g. "teams", "news", "basics")
//  onImageUploaded: Callback once the image has been submitted
//  token: Token for making server API requests
export default class ImageUploader extends React.Component {
    // Need to override the constructor to set the initial state and do data binding
    constructor(props) {
        // Call the parent constructor with the props object we automatically get
        super(props);
        // BINDING: Keep 'this' scoped to this object in any handlers
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }
    onFormSubmit(event) {
        //Don't refresh the whole page when the form button is clicked
        event.preventDefault();

        // Callback once we have an image
        let {onImageUploaded} = this.props;

        const formData = new FormData();
        formData.set('folderName', this.refs.folderName.value);
        formData.append('imageFile', this.refs.imageFile.files[0]);

        const axiosInstance = Axios.create({
            headers: {
                'x-access-token': this.props.token
            }
        });
        axiosInstance.post('/api/v1/image', formData)
            .then(function (response) {
            console.log(response);
            const uploadedImagePath = response.data.path;
            onImageUploaded(uploadedImagePath);
        })
        .catch(function (error) {
            // TODO: Show error message on UI
            console.log(error.response.data);
        });
    }
    render() {
        return (
            <form ref='uploadImageForm' id='uploadImageForm' method="post" encType="multipart/form-data" onSubmit={this.onFormSubmit}>
                <label>Upload Image</label><input type="file" name="imageFile" id="imageFile" ref="imageFile" className="expanded button" />
                <label>Folder Name</label><input type="text" name="folderName" id="folderName" defaultValue={this.props.folderName || ''} placeholder="e.g. news" ref="folderName"/>
                <button className="expanded button"><i className="fi-upload-cloud"></i> Upload Image</button>
            </form>
        );
    }
};
