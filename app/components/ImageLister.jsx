import React from 'react';
var Axios = require('axios');

// About: Renders a list of links to images on a server within a given directory
// Usage: <ImageLister directory="images/uploads/" onPickImage={this.onPickImage}/>
// Note that directory is optional. Server will default to "images/uploads/".
//  Take note of NO leading and included trailing '/'
// onPickImage() will receive the path to the image if a user clicks one of the list entries.
var ImageLister = React.createClass({
    // TOOD: Check these standard images are up to date links
    standardImages: ['/images/AcademyMatchReport_86.jpg',
                     '/images/AcademyMatchReport_169.jpg',
                     '/images/AwayGuide16-17_86.jpg',
                     '/images/AwayGuide16-17_169.jpg',
                     '/images/AwayTravelGuide16-17_86.jpg',
                     '/images/AwayTravelGuide16-17_169.jpg',
                     '/images/clublogo.png',
                     '/images/Daggersplayer_86.jpg',
                     '/images/HospitalitySpecial_86.jpg',
                     '/images/HospitalitySpecial_169.jpg',
                     '/images/MatchHighlights_86.jpg',
                     '/images/MatchHighlights_169.jpg',
                     '/images/MatchReport_86.jpg',
                     '/images/MatchReport_169.jpg',
                     '/images/News-Generic_86.jpg',
                     '/images/News-Generic_169.jpg',
                     '/images/News-Generic2_86.jpg',
                     '/images/News-Generic2_169.jpg',
                     '/images/Officials_86.jpg',
                     '/images/Officials_169.jpg',
                     '/images/stadium-tbs.jpg'],
    getInitialState() {
        return {files: this.standardImages};
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
            that.setState({files: [...that.standardImages,
                                   ...response.data.files]});
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
            <div id="imageList">
                <label>Choose Image</label><button className="expanded button" onClick={this.refreshImages}>Refresh Image List</button>
                <div className="callout">
                    {renderImageList()}
                </div>
            </div>
        );
    }
});

module.exports = ImageLister;
