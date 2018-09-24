import React from 'react';
import ReactDOM from 'react-dom';
var {connect} = require('react-redux');
import { Link } from 'react-router';
import LazyLoad from 'react-lazyload';
import PlaceholderComponent from 'Placeholder';
import {actions} from 'actions';
import * as FixturesAPI from 'FixturesAPI';
import MedianetTag from 'MedianetTag';

// TODO: Break out this table into smaller components, (like a table entry)?
// TODO: Does a fixture need a link to a Report AND a video?
// TODO: Need a league table component that pulls the full table or 5 positions, centered around Daggers where possible. Or just link to the league website for now.
// TODO: Who is going to update the league table & fixtures and how, e.g. game is postponed, or adding cup matches?
// TODO: Also need an Ad component, which can be adsense or overridden as a nice-to-have.
// TODO: Better mobile rendering? Stacking isn't great. Text is still small too.

export class Fixtures extends React.Component {
    // Need to override the constructor to set the initial state and do data binding
    constructor(props) {
        // Call the parent constructor with the props object we automatically get
        super(props);
        this.setSeasonAndSquad = this.setSeasonAndSquad.bind(this);
    }
    componentWillMount() {
        this.props.dispatch(actions.fixtures.fetchFixturesIfNeeded());
    }
    componentDidMount() {
        ReactDOM.findDOMNode(this._contentTop).scrollIntoView();
    }
    setSeasonAndSquad(season, squad) {
        // Change which season of fixtures we are showing
        this.props.dispatch(actions.fixtures.selectSeasonAndSquad(season, squad));
    }
    render() {
        var {fixtures, status, season, squad} = this.props.fixtures;
        
        function seasonAndSquadPicker(_that, _season, _squad) {
            // Pull out unique values on objects in an array
            function getUniqueValuesOfKey(array, key){
                return array.reduce(function(carry, item){
                    if(item[key] && !~carry.indexOf(item[key])) carry.push(item[key]);
                    return carry;
                }, []);
            }

            var seasons = getUniqueValuesOfKey(fixtures, 'season');
            // TODO: This doesn't take into account that we may not have fixtures for all squads in all seasons, so results may be blank if user selects a bad combo
            var squads = ['All', ...getUniqueValuesOfKey(fixtures, 'squad')];

            var seasonOptions = seasons.map((theSeason) => {
                return (
                    <option key={theSeason} value={theSeason}>{theSeason}</option>
                );
            });
            var squadOptions = squads.map((theSquad) => {
                return (
                    <option key={theSquad} value={theSquad}>{theSquad}</option>
                );
            });

            return (
                <div className="row">
                    <div className="column small-5">
                        <label>Season
                            <select ref="season" defaultValue={_season}>
                                {seasonOptions}
                            </select>
                        </label>
                    </div>
                    <div className="column small-5">
                        <label>Squad
                            <select ref="squad" defaultValue={_squad}>
                                {squadOptions}
                            </select>
                        </label>
                    </div>
                    <div className="column small-2">
                        <br/>
                        <button className="button" onClick={(e) => {_that.setSeasonAndSquad(_that.refs.season.value, _that.refs.squad.value)}}>Go</button>
                    </div>
                </div>
            );
        }

        if (status.isFetching) {
            return (
                <div>
                    <div id="contentTop" name="contentTop" ref={(ref) => this._contentTop = ref} />
                    <div className="callout">
                      <h5>Loading</h5>
                      <p>Please wait while we get the fixtures...</p>
                    </div>
                </div>
            );
        } else if (!fixtures || fixtures.length < 1) {
            return (
                <div>
                    <div id="contentTop" name="contentTop" ref={(ref) => this._contentTop = ref} />
                    <div className="callout alert">
                      <h5>Error</h5>
                      <p>No fixtures found.</p>
                    </div>
                </div>
            );
        } else {
            // Get a list of fixtures output as table rows
            var fixtureRows = [];
            fixtures.forEach((fixture) => {
                if (fixture.season == season && (squad == 'All' || squad == fixture.squad)) {
                    var logo = fixture.logo ?   `https://{-{gcp.storageBucket}-}.storage.googleapis.com${fixture.logo}` :    // `/images/uploads/teams/${fixture.logo}` :
                                                `https://{-{gcp.storageBucket}-}.storage.googleapis.com/basics/clublogo.png`;// '/images/clublogo.png';
                    // TODO: Need to fill in report links for all fixtures
                    var w_l_d = fixture.w_l_d === 'X' ? '' : fixture.w_l_d;
                    var link = '';
                    if (w_l_d && fixture.report)
                        link = <a href={fixture.report}>Report</a>;
                    else if (fixture.report)
                        link = <a href={fixture.report}>Preview</a>;
                    else
                        link = <a href="http://www.daggerstickets.co.uk">Tickets</a>;
                    
                    var home_away = fixture.home_away === 'X' ? '' : fixture.home_away;

                    fixtureRows.push((
                        <tr key={fixture.id}>
                            <td>{fixture.date}</td>
                            <td>
                                <LazyLoad placeholder={<PlaceholderComponent />}>
                                    <img src={logo} alt={fixture.team} className="fixture-logo" />
                                </LazyLoad>
                            </td>
                            <td><p className="team-name">{fixture.team}</p><p className="competition-name">{fixture.competition}</p></td>
                            <td>Att {fixture.attendance}</td>
                            <td>{home_away}</td>
                            <td>{fixture.result}</td>
                            <td>{w_l_d}</td>
                            <td>{link}</td>
                        </tr>
                    ));
                }
            });
            
            return (
                <div>
                    <div id="contentTop" name="contentTop" ref={(ref) => this._contentTop = ref} />
                    <div className="row">
                        <div className="columns small-12 large-8">

                            <h3>Fixtures &amp; Results</h3>
                            <Link to={'/fixturescalendar'} className="expanded button"><i className="fi-calendar"></i> Add Daggers Fixtures to your Calendar</Link>
                            <a href="https://storage.googleapis.com/daggers/downloads/CurrentFixtures.pdf" className="expanded button"><i className="fi-page"></i> Download Daggers Calendar Poster</a>
                            {seasonAndSquadPicker(this, season)}
                            <table className="hover stack text-center">
                                <tbody>
                                    {fixtureRows}
                                </tbody>
                            </table>

                        </div>
                        <div className="columns small-12 large-4">
                            <div className="placeholder-ad">
                                <MedianetTag cid="8CUM55E8A" crid="183428731" size="160x600" divId = "183428731"/>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
};

export default connect(
  (state) => {
    return {
        fixtures: state.fixtures
    };
  })(Fixtures);
