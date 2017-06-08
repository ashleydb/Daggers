import React from 'react';
import {Link} from 'react-router';

// For uploading images
import ImageUploader from 'ImageUploader';
import ImageLister from 'ImageLister';

export default class FixtureEditForm extends React.Component {
    // Need to override the constructor to set the initial state and do data binding
    constructor(props) {
        // Call the parent constructor with the props object we automatically get
        super(props);
        // Now set the state here, based on the props
        this.state = {
            logo: null,
            home_away: this.props.fixture.home_away || 'X',
            w_l_d: this.props.fixture.w_l_d || 'X'
        };
        // BINDING: Keep 'this' scoped to this object in any handlers
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onNewImage = this.onNewImage.bind(this);
        this.onPickImage = this.onPickImage.bind(this);
        this.handleHomeAwayOptionChange = this.handleHomeAwayOptionChange.bind(this);
        this.handleWLDOptionChange = this.handleWLDOptionChange.bind(this);
    }
    onFormSubmit(event) {
        //Don't refresh the whole page when the form button is clicked
        event.preventDefault();
        
        // TODO: Need to make images work to include team badges!
        // TODO: Sprinkle around some more foundation icons on buttons.
        
        var home_away = this.state.home_away;
        var w_l_d = this.state.w_l_d;
        
        var fixture = {};
        fixture.id = this.refs.id.value;
        fixture.date = this.refs.date.value;
        fixture.home_away = home_away;
        fixture.logo = this.refs.logo.value;
        fixture.team = this.refs.team.value;
        fixture.w_l_d = w_l_d;
        fixture.competition = this.refs.competition.value;
        fixture.attendance = this.refs.attendance.value;
        fixture.report = this.refs.report.value;
        fixture.result = this.refs.result.value;
        fixture.season = this.refs.season.value;
        fixture.squad = this.refs.squad.value;
        
        // Note: Not doing much validation. Assuming all elements are optional.
        this.props.onSaveFixture(fixture);
    }
    onNewImage(imgPath) {
        this.refs.logo.value = imgPath;
        this.setState({logo: imgPath});
    }
    onPickImage(imgPath) {
        this.refs.logo.value = imgPath;
        this.setState({logo: imgPath});
    }
    handleHomeAwayOptionChange(changeEvent) {
        this.setState({
            home_away: changeEvent.target.value
        });
    }
    handleWLDOptionChange(changeEvent) {
        this.setState({
            w_l_d: changeEvent.target.value
        });
    }
    render() {
        var {fixture} = this.props;
        var logo = this.state.logo || fixture.logo || '/basics/clublogo.png';
        var report = fixture.report ? `http://www.daggers.co.uk/news/${fixture.report}` : null;
        return (
            <div>
                <div className="row">
                    <div className="columns small-6">
                        <ImageLister directory="teams" onPickImage={this.onPickImage} selectedImage={logo}/>
                    </div>
                    <div className="columns small-6">
                        <ImageUploader onImageUploaded={this.onNewImage} token={this.props.token} folderName="teams" ref="imageUploader"/>
                        <img src={`https://{-{gcp.storageBucket}-}.storage.googleapis.com${logo}`} alt="Team Badge Preview" className="news-image-preview"/>
                    </div>
                </div>
                
                <form onSubmit={this.onFormSubmit}>
                    <input type="hidden" defaultValue={fixture.id} ref="id"/>
                    <label>Date</label><input type="text" defaultValue={fixture.date} placeholder="e.g. 01-JAN-2018" ref="date"/>
                    <label>Season</label><input type="text" defaultValue={fixture.season} placeholder="e.g. 2017-18" ref="season"/>
                    <label>Squad</label><input type="text" defaultValue={fixture.squad} placeholder="e.g. First, U16, etc." ref="squad"/>
                    
                    <fieldset className="fieldset">
                        <legend>Home/Away</legend>
                        <input type="radio" name="home_away" value="H" id="home_away_H" checked={this.state.home_away === 'H'} onChange={this.handleHomeAwayOptionChange} required /><label htmlFor="home_away_H">Home</label>
                        <input type="radio" name="home_away" value="A" id="home_away_A" checked={this.state.home_away === 'A'} onChange={this.handleHomeAwayOptionChange} /><label htmlFor="home_away_A">Away</label>
                        <input type="radio" name="home_away" value="X" id="home_away_X" checked={this.state.home_away === 'X'} onChange={this.handleHomeAwayOptionChange} /><label htmlFor="home_away_X">Unknown</label>
                    </fieldset>
                    
                    <label>Team</label><input type="text" defaultValue={fixture.team} placeholder="e.g. Chester FC" ref="team"/>
                    <label>Competition</label><input type="text" defaultValue={fixture.competition} placeholder="e.g. Vanarama National League" ref="competition"/>
                    
                    <fieldset className="fieldset">
                        <legend>W/L/D</legend>
                        <input type="radio" name="w_l_d" value="W" id="w_l_d_W" checked={this.state.w_l_d == 'W'} onChange={this.handleWLDOptionChange} required /><label htmlFor="w_l_d_W">Win</label>
                        <input type="radio" name="w_l_d" value="L" id="w_l_d_L" checked={this.state.w_l_d == 'L'} onChange={this.handleWLDOptionChange} /><label htmlFor="w_l_d_L">Lose</label>
                        <input type="radio" name="w_l_d" value="D" id="w_l_d_D" checked={this.state.w_l_d == 'D'} onChange={this.handleWLDOptionChange} /><label htmlFor="w_l_d_D">Draw</label>
                        <input type="radio" name="w_l_d" value="X" id="w_l_d_X" checked={this.state.w_l_d == 'X'} onChange={this.handleWLDOptionChange} /><label htmlFor="w_l_d_X">Not Yet Played</label>
                    </fieldset>
                    
                    <label>Result</label><input type="text" defaultValue={fixture.result} placeholder="e.g. 1 - 0" ref="result"/>
                    <label>Attendance</label><input type="text" defaultValue={fixture.attendance} placeholder="e.g. 1,000" ref="attendance"/>
                    <label>Report/Preview Link</label><input type="text" defaultValue={report} placeholder="e.g. http://www.daggers.co.uk/news/12345" ref="report"/>
                    <label>Logo</label><input type="text" defaultValue={fixture.logo} placeholder="Pick a team badge image above." ref="logo" readOnly/>
                    
                    <button className="expanded button success"><i className="fi-save"></i> Save</button>
                    <Link to="/admin/fixtures" className="expanded button alert"><i className="fi-x"></i> Cancel</Link>
                </form>
            </div>
        );
    }
}
