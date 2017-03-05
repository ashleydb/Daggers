import React from 'react';
var Axios = require('axios');

// TODO: Change URL based on environment var
var ImageUploader = React.createClass({

    onFormSubmit(event) {
        //Don't refresh the whole page when the form button is clicked
        event.preventDefault();

        // Callback once we have an image
        let {onImageUploaded} = this.props;

        const formData = new FormData();
        formData.append('imageFile', this.refs.imageFile.files[0]);

        Axios.post('/api/v1/image', formData)
            .then(function (response) {
            console.log(response);
            const uploadedImagePath = response.data.path;
            onImageUploaded(uploadedImagePath);
        })
        .catch(function (error) {
            //debugger;
            // TODO: Show error message on UI
            console.log(error.response.data);
        });
    },
    render() {
        return (
            <form ref='uploadImageForm' id='uploadImageForm' method="post" encType="multipart/form-data" onSubmit={this.onFormSubmit}>
                <label>Upload Image</label><input type="file" name="imageFile" ref="imageFile" className="expanded button" />
                <button className="expanded button">Upload Image</button>
            </form>
        );
    }
});

module.exports = ImageUploader;
