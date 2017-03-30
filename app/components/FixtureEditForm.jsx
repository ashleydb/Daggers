var React = require('react');
var {Link} = require('react-router');

// For uploading images
import ImageUploader from 'ImageUploader';
import ImageLister from 'ImageLister';

// TODO: Need to pick which Daggers team this is for?
// TODO: Need to pick which season this is for?

var FixtureEditForm = React.createClass({
    getInitialState() {
        return {logo: null};
    },
    onFormSubmit: function(event) {
        //Don't refresh the whole page when the form button is clicked
        event.preventDefault();
        
        // TODO: Need to make images work to include team badges!
        // TODO: Sprinkle around some more foundation icons on buttons.
        
        // return the value of the radio button that is checked
        // return an empty string if none are checked, or
        // there are no radio buttons
        function getCheckedValue(radioObj) {
            if(!radioObj)
                return "";
            var radioLength = radioObj.length;
            if(radioLength == undefined)
                if(radioObj.checked)
                    return radioObj.value;
                else
                    return "";
            for(var i = 0; i < radioLength; i++) {
                if(radioObj[i].checked) {
                    return radioObj[i].value;
                }
            }
            return "";
        }
        
        var home_away = getCheckedValue(this.refs.home_away);
        var w_l_d = getCheckedValue(this.refs.w_l_d);
        
        var fixture = {};
        fixture.id = this.refs.id.value;
        fixture.date = this.refs.date.value;
        if (home_away != '' && home_away != 'X')
            fixture.home_away = home_away;
        fixture.logo = this.refs.logo.value;
        fixture.team = this.refs.team.value;
        if (w_l_d != '' && w_l_d != 'X')
            fixture.w_l_d = w_l_d;
        fixture.competition = this.refs.competition.value;
        fixture.attendance = this.refs.attendance.value;
        fixture.report = this.refs.report.value;
        fixture.result = this.refs.result.value;
        
        // Note: Not doing much validation. Assuming all elements are optional.
        this.props.onSaveFixture(fixture);
    },
    onNewImage(imgPath) {
        this.refs.logo.value = imgPath;
        this.setState({logo: imgPath});
    },
    onPickImage(imgPath) {
        this.refs.logo.value = imgPath;
        this.setState({logo: imgPath});
    },
    render: function() {
        var {fixture} = this.props;
        var logo = this.state.logo || fixture.logo;
        var report = fixture.report ? `http://www.daggers.co.uk/news/${fixture.report}` : null;
        return (
            <div>
                <div className="row">
                    <div className="columns small-6">
                        <ImageLister onPickImage={this.onPickImage}/>
                    </div>
                    <div className="columns small-6">
                        <ImageUploader onImageUploaded={this.onNewImage} ref="imageUploader"/>
                        <img src={logo} alt="Team Badge Preview" className="news-image-preview"/>
                    </div>
                </div>
                
                <form onSubmit={this.onFormSubmit}>
                    <input type="hidden" defaultValue={fixture.id} ref="id"/>
                    <label>Date</label><input type="text" defaultValue={fixture.date} placeholder="e.g. 01-JAN-2018" ref="date"/>
                    
                    <fieldset className="fieldset">
                        <legend>Home/Away</legend>
                        <input type="radio" name="home_away" value="H" id="home_away_H" defaultChecked={fixture.home_away == 'H'} required /><label htmlFor="home_away_H">Home</label>
                        <input type="radio" name="home_away" value="A" id="home_away_A"  defaultChecked={fixture.home_away == 'A'} /><label htmlFor="home_away_A">Away</label>
                        <input type="radio" name="home_away" value="X" id="home_away_X"  defaultChecked={fixture.home_away == undefined} /><label htmlFor="home_away_X">Unknown</label>
                    </fieldset>
                    
                    <label>Team</label><input type="text" defaultValue={fixture.team} placeholder="e.g. Chester FC" ref="team"/>
                    <label>Competition</label><input type="text" defaultValue={fixture.competition} placeholder="e.g. Vanarama National League" ref="competition"/>
                    
                    <fieldset className="fieldset">
                        <legend>W/L/D</legend>
                        <input type="radio" name="w_l_d" value="W" id="w_l_d_W" defaultChecked={fixture.w_l_d == 'W'} required /><label htmlFor="w_l_d_W">Win</label>
                        <input type="radio" name="w_l_d" value="L" id="w_l_d_L" defaultChecked={fixture.w_l_d == 'L'} /><label htmlFor="w_l_d_L">Lose</label>
                        <input type="radio" name="w_l_d" value="D" id="w_l_d_D" defaultChecked={fixture.w_l_d == 'D'} /><label htmlFor="w_l_d_D">Draw</label>
                        <input type="radio" name="w_l_d" value="X" id="w_l_d_X" defaultChecked={fixture.w_l_d == undefined} /><label htmlFor="w_l_d_X">Not Yet Played</label>
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
})

module.exports = FixtureEditForm;
