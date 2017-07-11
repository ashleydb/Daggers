import React from 'react';
import {Link} from 'react-router';
var moment = require('moment');

// For Rich Text Editor
import Trumbowyg from 'react-trumbowyg';
import '../../node_modules/trumbowyg/dist/plugins/table/trumbowyg.table';

// For uploading images
import ImageUploader from 'ImageUploader';
import ImageLister from 'ImageLister';

export default class PlayerEditForm extends React.Component {
    // Need to override the constructor to set the initial state and do data binding
    constructor(props) {
        // Call the parent constructor with the props object we automatically get
        super(props);
        // Now set the state here, based on the props
        this.state = {
            image: null,
            onloan_status: this.props.player.onloan_status || 'X',
            status: this.props.player.status || 'X',
            position: this.props.player.position || 'X'
        };
        // BINDING: Keep 'this' scoped to this object in any handlers
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onNewImage = this.onNewImage.bind(this);
        this.onPickImage = this.onPickImage.bind(this);
        this.handleLoanOptionChange = this.handleLoanOptionChange.bind(this);
        this.handleStatusOptionChange = this.handleStatusOptionChange.bind(this);
        this.handlePositionOptionChange = this.handlePositionOptionChange.bind(this);
    }
    onFormSubmit(event) {
        //Don't refresh the whole page when the form button is clicked
        event.preventDefault();
        
        var onloan_status = this.state.onloan_status;
        var status = this.state.status;
        var position = this.state.position;
        
        var player = {};
        player.id = this.refs.id.value;
        player.first_name = this.refs.first_name.value;
        player.last_name = this.refs.last_name.value;
        player.image = this.refs.image.value;
        player.short_description = this.refs.short_description.value;
        player.biography = this.refs.biography.value;
        player.height = this.refs.height.value;
        player.weight = this.refs.weight.value;
        player.nationality = this.refs.nationality.value;
        player.team = this.refs.team.value;

        if (this.refs.shirt_number.value) {
            player.shirt_number = Number(this.refs.shirt_number.value);
        }
        
        player.date_of_birth = moment(this.refs.date_of_birth.value, "D-MMM-YYYY").valueOf();

        player.onloan_status = onloan_status;
        player.status = status;
        player.position = position;
        
        // TODO: Not doing much validation. Assuming all elements are optional, (which is not true!)
        this.props.onSavePlayer(player);
    }
    // Callback for rich text editor
    onTextChange(editor) {
        this.refs.biography.value = editor.target.innerHTML;
    }
    onNewImage(imgPath) {
        this.refs.image.value = imgPath;
        this.setState({image: imgPath});
    }
    onPickImage(imgPath) {
        this.refs.image.value = imgPath;
        this.setState({image: imgPath});
    }
    handleLoanOptionChange(changeEvent) {
        this.setState({
            onloan_status: changeEvent.target.value
        });
    }
    handleStatusOptionChange(changeEvent) {
        this.setState({
            status: changeEvent.target.value
        });
    }
    handlePositionOptionChange(changeEvent) {
        this.setState({
            position: changeEvent.target.value
        });
    }
    render() {
        var {player} = this.props;
        var image = this.state.image || player.image || '/player/bg_player_231by264.png';
        var imagePath = '';
        var imagePreview = null;
        if (image) {
            imagePath = `https://{-{gcp.storageBucket}-}.storage.googleapis.com${image}`;
            // TODO: className="news-image-preview" - Replace/Rename this?
            imagePreview = <img src={imagePath} alt="Image Preview" className="news-image-preview"/>
        }

        function dateToString(dateMS) {
            if (!dateMS)
                return '';

            var d = new Date(Number(dateMS));
            var months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
            //01-JAN-2000
            return `${d.getDate()}-${months[d.getMonth()]}-${d.getFullYear()}`;
        }
        
        return (
            <div>
                <div className="row">
                    <div className="columns small-6">
                        <ImageLister directory="player" onPickImage={this.onPickImage} selectedImage={image}/>
                    </div>
                    <div className="columns small-6">
                        <ImageUploader onImageUploaded={this.onNewImage} token={this.props.token} folderName="player" ref="imageUploader"/>
                        <input type="text" value={imagePath} readOnly ref="imagePath"/>
                        {imagePreview}
                    </div>
                </div>

                <form onSubmit={this.onFormSubmit}>
                    <input type="hidden" defaultValue={player.id} ref="id"/>
                    <label>First Name</label><input type="text" defaultValue={player.first_name} placeholder="e.g. John" ref="first_name"/>
                    <label>Last Name</label><input type="text" defaultValue={player.last_name} placeholder="e.g. Smith" ref="last_name"/>
                    <label>Date of Birth</label><input type="text" defaultValue={dateToString(player.date_of_birth)} placeholder="e.g. 01-JAN-2000" ref="date_of_birth"/>
                    <label>Shirt Number</label><input type="number" defaultValue={player.shirt_number} placeholder="e.g. 1" ref="shirt_number"/>
                    
                    <fieldset className="fieldset">
                        <legend>Position</legend>
                        <input type="radio" name="position" value="Goalkeeper" id="position_G" checked={this.state.position === 'Goalkeeper'} onChange={this.handlePositionOptionChange} required /><label htmlFor="position_G">Goalkeeper</label>
                        <input type="radio" name="position" value="Defender" id="position_D" checked={this.state.position === 'Defender'} onChange={this.handlePositionOptionChange} /><label htmlFor="position_D">Defender</label>
                        <input type="radio" name="position" value="Midfielder" id="position_M" checked={this.state.position === 'Midfielder'} onChange={this.handlePositionOptionChange} /><label htmlFor="position_M">Midfielder</label>
                        <input type="radio" name="position" value="Striker" id="position_S" checked={this.state.position === 'Striker'} onChange={this.handlePositionOptionChange} /><label htmlFor="position_S">Striker</label>
                        <input type="radio" name="position" value="X" id="position_X" checked={this.state.position === 'X'} onChange={this.handlePositionOptionChange} /><label htmlFor="position_X">Unknown</label>
                    </fieldset>
                    
                    <label>Team</label><input type="text" defaultValue={player.team} placeholder="e.g. First, U16, etc." ref="team"/>
                    <label>Height</label><input type="text" defaultValue={player.height} placeholder="e.g. 1.5 Metres" ref="height"/>
                    <label>Weight</label><input type="text" defaultValue={player.weight} placeholder="e.g. 70 Kilograms" ref="weight"/>
                    <label>Nationality</label><input type="text" defaultValue={player.nationality} placeholder="e.g. English" ref="nationality"/>
                    
                    <fieldset className="fieldset">
                        <legend>On Loan</legend>
                        <input type="radio" name="onloan_status" value="Yes" id="onloan_status_Y" checked={this.state.onloan_status == 'Yes'} onChange={this.handleLoanOptionChange} required /><label htmlFor="onloan_status_Y">Yes</label>
                        <input type="radio" name="onloan_status" value="No" id="onloan_status_N" checked={this.state.onloan_status == 'No'} onChange={this.handleLoanOptionChange} /><label htmlFor="onloan_status_N">No</label>
                        <input type="radio" name="onloan_status" value="X" id="onloan_status_X" checked={this.state.onloan_status == 'X'} onChange={this.handleLoanOptionChange} /><label htmlFor="onloan_status_X">Unknown</label>
                    </fieldset>

                    <fieldset className="fieldset">
                        <legend>Status</legend>
                        <input type="radio" name="status" value="Active" id="status_A" checked={this.state.status == 'Active'} onChange={this.handleStatusOptionChange} required /><label htmlFor="status_A">Active</label>
                        <input type="radio" name="status" value="Inactive" id="status_I" checked={this.state.status == 'Inactive'} onChange={this.handleStatusOptionChange} /><label htmlFor="status_I">Inactive</label>
                        <input type="radio" name="status" value="X" id="status_X" checked={this.state.status == 'X'} onChange={this.handleStatusOptionChange} /><label htmlFor="status_X">Unknown</label>
                    </fieldset>
                    
                    <label>Short Description</label><input type="text" defaultValue={player.short_description} placeholder="e.g. Kit sponsored by..." ref="short_description"/>

                    <label>Biography</label>
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
                        data={player.biography}
                        placeholder='Type your text!'
                        onChange={this.onTextChange}
                        ref="playerrich"
                    />
                    
                    <button className="expanded button success"><i className="fi-save"></i> Save</button>
                    <Link to="/admin/players" className="expanded button alert"><i className="fi-x"></i> Cancel</Link>
                    
                    <div id="editPlayerDebug" className="hide">
                        <label>Image</label><input type="text" defaultValue={player.image} ref="image" readOnly/>
                        <label>Biography HTML</label><input type="text" defaultValue={player.biography} ref="biography" readOnly/>
                    </div>
                </form>
            </div>
        );
    }
}
