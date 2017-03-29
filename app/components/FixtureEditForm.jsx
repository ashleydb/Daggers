var React = require('react');
var {Link} = require('react-router');

// For uploading images
import ImageUploader from 'ImageUploader';
import ImageLister from 'ImageLister';

// TODO: Need to pick which Daggers team this is for?
// TODO: Need to pick which season this is for?
// TODO: Set initial state, (or editors onLoad or something) so that the text isn't empty, since we validate story.length > 0, so if you don't change the text and only edit a headline, the story can't be saved.

var FixtureEditForm = React.createClass({
    getInitialState() {
        return {logo: null};
    },
    onFormSubmit: function(event) {
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
        
        story.story = this.refs.story.value;                    // Works as we're repurposing in onTextChange
        //story.story = this.refs.storyrich.target.innerHTML;   // This doesn't work
        //story.story = this.state.text;                        // This is if we manage the text on the state
        
        if (story.headline.length > 0 &&
            story.summary.length > 0 &&
            story.story.length > 0 &&
            story.image.length > 0) {
            
//            this.refs.headline.value = '';
//            this.refs.summary.value = '';
//            this.refs.story.value = '';
//            this.refs.image.value = '';
//            this.refs.youtube.value = '';
            
            this.props.onSaveStory(story);
            //this.props.dispatch(actions.news.addStory(story));
        }
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
                    <label>Date</label><input type="text" defaultValue={fixture.date} ref="date"/>
                    
                    <fieldset className="fieldset">
                        <legend>Home/Away</legend>
                        <input type="radio" name="home_away" value="H" id="home_away_H" required /><label for="home_away_H">Home</label>
                        <input type="radio" name="home_away" value="A" id="home_away_A" /><label for="home_away_A">Away</label>
                    </fieldset>
                    
                    <label>Team</label><input type="text" defaultValue={fixture.team} ref="team"/>
                    <label>Competition</label><input type="text" defaultValue="Vanarama National League" ref="competition"/>
                    
                    <fieldset className="fieldset">
                        <legend>W/L/D</legend>
                        <input type="radio" name="w_l_d" value="W" id="w_l_d_W" required /><label for="w_l_d_W">Win</label>
                        <input type="radio" name="w_l_d" value="L" id="w_l_d_L" /><label for="w_l_d_L">Lose</label>
                        <input type="radio" name="w_l_d" value="D" id="w_l_d_D " /><label for="w_l_d_D">Draw</label>
                    </fieldset>
                    
                    <label>Result</label><input type="text" defaultValue={fixture.result} ref="result"/>
                    <label>Attendance</label><input type="text" defaultValue={fixture.attendance} ref="attendance"/>
                    <label>Report Link</label><input type="text" defaultValue={report} placeholder="e.g. http://www.daggers.co.uk/news/12345" ref="report"/>
                    <label>Logo</label><input type="text" defaultValue={fixture.logo} ref="logo" readOnly/>
                    
                    <button className="expanded button success">Submit</button>
                    <Link to="/admin/fixtures" className="expanded button alert">Cancel</Link>
                </form>
            </div>
        );
    }
})

module.exports = FixtureEditForm;
