import React from 'react';
import {Link} from 'next/link';

// For Rich Text Editor
import Trumbowyg from 'react-trumbowyg';
import '../../node_modules/trumbowyg/dist/plugins/table/trumbowyg.table';

// For uploading images
import ImageUploader from 'ImageUploader';
import ImageLister from 'ImageLister';

// For alert dialog box
var { connect } = require('react-redux');
import { swal } from 'react-redux-sweetalert2';

import * as NewsAPI from 'NewsAPI';

export class NewsEditForm extends React.Component {
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
        this.props.showAlert.bind(this);
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
        

        // Turn the date string into a ms number
        var newCreatedAt = new Date();
        newCreatedAt.setDate(this.refs.day.value);
        newCreatedAt.setMonth(this.refs.month.value);
        newCreatedAt.setFullYear(this.refs.year.value);
        newCreatedAt.setHours(this.refs.hour.value);
        newCreatedAt.setMinutes(this.refs.minute.value);
        newCreatedAt.setSeconds(0);
        // If it is NaN, then there will be problems
        if ( isNaN(newCreatedAt.getTime()) ) {
            // Log an error and show a clear warning as a dialog box
            console.log("Error: Date is not valid (NaN)");
            this.props.showAlert({
                title: 'Date is invalid',
                text: 'Please enter a valid date.',
                type: 'warning',
                allowOutsideClick: false,
                confirmButtonText: 'OK, I\'ll fix it!',
                confirmButtonColor: '#3085d6',
                showLoaderOnConfirm: true
            });
            return;
        }
        if (newCreatedAt.getMonth() != this.refs.month.value) {
            // Log an error and show a clear warning as a dialog box
            console.log("Error: Date was not valid ("
                +this.refs.day.value+"-"+(Number(this.refs.month.value)+1)+"-"+this.refs.year.value
                +"). Would be updated to "
                +newCreatedAt.getDate()+"-"+(newCreatedAt.getMonth()+1)+"-"+newCreatedAt.getFullYear());
            this.props.showAlert({
                title: 'Date is invalid',
                text: `${this.refs.day.value}-${(Number(this.refs.month.value)+1)}-${this.refs.year.value} is not a real date. Not enough days in the month perhaps?`,
                type: 'warning',
                allowOutsideClick: false,
                confirmButtonText: 'OK, I\'ll fix it!',
                confirmButtonColor: '#3085d6',
                showLoaderOnConfirm: true
            });
            return;
        }
        story.createdAt = newCreatedAt.getTime();
        // If we are editing an existing story, preserve the original creation date
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
        // TODO: Break out this date picker code into something reusable
        function datePicker(dateMS = null) {
            // If a date is passed in, use that, otherwise use right now
            var d = (dateMS) ? new Date(Number(dateMS)) : new Date();

            // TODO: years and months options just list all values, even if we don't have data, (e.g. could select a future month)
            var years = NewsAPI.getYearList(true);
            var yearOptions = years.map((year) => {
                return (
                    <option key={year} value={year}>{year}</option>
                );
            });

            var months = NewsAPI.getMonthList();
            var monthOptions = months.map((month, index) => {
                return (
                    <option key={index} value={index}>{month}</option>
                );
            });

            var dayOptions = [];
            for (var index = 1; index <= 31; ++index) {
                dayOptions.push( <option key={index} value={index}>{index}</option> );
            };

            var hourOptions = [];
            for (var index = 0; index <= 23; ++index) {
                hourOptions.push( <option key={index} value={index}>{index}</option> );
            };

            var minuteOptions = [];
            for (var index = 0; index <= 59; ++index) {
                var minStr = index.toString();
                if (index < 10) {
                    minStr = '0' + minStr;
                }
                minuteOptions.push( <option key={index} value={index}>{minStr}</option> );
            };

            return (
                <div className="row">
                    <div className="column small-2">
                        <label>Day
                            <select ref="day" defaultValue={d.getDate()}>
                                {dayOptions}
                            </select>
                        </label>
                    </div>
                    <div className="column small-4">
                        <label>Month
                            <select ref="month" defaultValue={d.getMonth()}>
                                {monthOptions}
                            </select>
                        </label>
                    </div>
                    <div className="column small-2">
                        <label>Year
                            <select ref="year" defaultValue={d.getFullYear()}>
                                {yearOptions}
                            </select>
                        </label>
                    </div>
                    <div className="column small-2">
                        <label>Hour
                            <select ref="hour" defaultValue={d.getHours()}>
                                {hourOptions}
                            </select>
                        </label>
                    </div>
                    <div className="column small-2">
                        <label>Mins
                            <select ref="minute" defaultValue={d.getMinutes()}>
                                {minuteOptions}
                            </select>
                        </label>
                    </div>
                </div>
            );
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
                    <label>Date</label>{datePicker(story.createdAt)}
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
                    <Link href="/admin/news" className="expanded button alert"><i className="fi-x"></i> Cancel</Link>
                    
                    <div id="editNewsDebug" className="hide">
                        <label>Image</label><input type="text" defaultValue={story.image} ref="image" readOnly/>
                        <label>Story HTML</label><input type="text" defaultValue={story.story} ref="story" readOnly/>
                    </div>
                </form>
            </div>
        );
    }
}

import { bindActionCreators } from 'redux'

function mapStateToProps(state) {
    return {
    };
}

function mapDispatchToProps(dispatch) {
    let actions = bindActionCreators({...swal}, dispatch);
    return { ...actions, dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsEditForm)
