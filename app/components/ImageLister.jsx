import React from 'react';
var Axios = require('axios');

// About: Renders a list of links to images on a server within a given directory
// Usage: <ImageLister directory="images/uploads/" onPickImage={this.onPickImage}/>
// Note that directory is optional. Server will default to "images/uploads/".
//  Take note of NO leading and included trailing '/'
// onPickImage() will receive the path to the image if a user clicks one of the list entries.
var ImageLister = React.createClass({
    getInitialState() {
        return {files: []};
    },
    componentWillMount() {
        this.refreshImages();
    },
    refreshImages(event = null) {
        //Don't refresh the whole page when the form button is clicked
        if (event) {
            event.preventDefault();
        }

        // So we can access this.state within then()
        let that = this;
        
        var {directory} = this.props;
        Axios.get('/api/v1/image', {
            params: {
                dir: directory
            }
        })
        .then(function (response) {
            console.log("DEBUG: Image List:", response.data.files);
            that.setState({files: response.data.files});
        })
        .catch(function (error) {
            console.log("ERR: Problem getting images:", error);
        });
    },
    handleClickImage(event, imgPath) {
        //Don't refresh the whole page when the form button is clicked
        event.preventDefault();
        
        var {onPickImage} = this.props;
        onPickImage(imgPath);
    },
    render() {
        var renderImageList = () => {
            var {files} = this.state;
            if (files) {
                // So we can access handlers on 'this' within the map function
                let that = this;
                return (
                    <ul>
                        {files.map(function(file, index){
                            return <li key={index}><a href="#" onClick={(e) => {that.handleClickImage(e, file);}}>{file}</a></li>;
                        })}
                    </ul>
                );
            }
            return null;
        };
        return (
            <div>
                <button className="hollow expanded button" onClick={this.refreshImages}>Refresh Image List</button>
                {renderImageList()}
            </div>
        );
    }
});

module.exports = ImageLister;
