import React from 'react';
var Axios = require('axios');

// TODO: Check these standard images are up to date links
const standardImages = {
    basics: [
        '/basics/AcademyMatchReport_86.jpg',
        '/basics/AcademyMatchReport_169.jpg',
        '/basics/AwayGuide16-17_86.jpg',
        '/basics/AwayGuide16-17_169.jpg',
        '/basics/AwayTravelGuide16-17_86.jpg',
        '/basics/AwayTravelGuide16-17_169.jpg',
        '/basics/clublogo.png',
        '/basics/Daggersplayer_86.jpg',
        '/basics/HospitalitySpecial_86.jpg',
        '/basics/HospitalitySpecial_169.jpg',
        '/basics/MatchHighlights_86.jpg',
        '/basics/MatchHighlights_169.jpg',
        '/basics/MatchReport_86.jpg',
        '/basics/MatchReport_169.jpg',
        '/basics/News-Generic_86.jpg',
        '/basics/News-Generic_169.jpg',
        '/basics/News-Generic2_86.jpg',
        '/basics/News-Generic2_169.jpg',
        '/basics/Officials_86.jpg',
        '/basics/Officials_169.jpg',
        '/basics/stadium-tbs.jpg'
    ]
};

// About: Renders a list of links to images on a server within a given directory
// Usage: <ImageLister directory="teams" onPickImage={this.onPickImage} selectedImage="path/to/image.jpg"/>
// Note that directory is optional. Server will default to all images.
// onPickImage() will receive the path to the image if a user clicks one of the list entries.
//  Store this path and pass back in as selectedImage to highlight that selection.
export default class ImageLister extends React.Component {
    // Need to override the constructor to set the initial state and do data binding
    constructor(props) {
        // Call the parent constructor with the props object we automatically get
        super(props);
        // Now set the state here, based on the props
        this.state = {
            files: standardImages
        };
        // BINDING: Keep 'this' scoped to this object in any handlers
        this.refreshImages = this.refreshImages.bind(this);
        this.handleClickImage = this.handleClickImage.bind(this);
    }
    componentWillMount() {
        this.refreshImages();
    }
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
            //console.log("DEBUG: Image List:", response.data.files);
            // that.setState({files: [...standardImages,
            //                        ...response.data.files]});

            that.setState({files: response.data});
        })
        .catch(function (error) {
            console.log("ERR: Problem getting images:", error);
        });
    }
    handleClickImage(event, imgPath) {
        //Don't refresh the whole page when the form button is clicked
        event.preventDefault();
        
        var {onPickImage} = this.props;
        onPickImage(imgPath);
    }
    render() {
        var renderImageList = () => {
            var {files} = this.state;
            var {selectedImage} = this.props;
            var folderNames = Object.getOwnPropertyNames(files).sort();

            if (files) {
                // So we can access handlers on 'this' within the map function
                let that = this;
                return (
                    <ul>
                        {
                            folderNames.map(function(folder) {
                                return files[folder].map(function(file, index) {
                                    var styleName = 'unselectedImageName';
                                    if (selectedImage == file) {
                                        styleName = 'selectedImageName';
                                    }
                                    return <li key={folder + index}><a href="#" onClick={(e) => {that.handleClickImage(e, file);}} className={styleName}>{file}</a></li>;
                                })
                            })
                        }
                    </ul>
                );
            }
            return null;
        };
        return (
            <div id="imageList">
                <label>Choose Image</label><button className="expanded button" onClick={this.refreshImages}><i className="fi-refresh"></i> Refresh Image List</button>
                <div className="callout">
                    {renderImageList()}
                </div>
            </div>
        );
    }
};
