import React from 'react';
var {connect} = require('react-redux');
import {actions} from 'actions';
import * as FixturesAPI from 'FixturesAPI';

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
    }
    componentWillMount() {
        this.props.dispatch(actions.fixtures.fetchFixturesIfNeeded());
    }
    setSeason(season) {
        // Change which page of news stories we are showing
        this.props.dispatch(actions.fixtures.selectSeason(season));
    }
    render() {
        var {fixtures, status, season} = this.props.fixtures;
        
        function seasonPicker(_that, _season) {
            // Pull out unique values on objects in an array
            function getUniqueValuesOfKey(array, key){
                return array.reduce(function(carry, item){
                    if(item[key] && !~carry.indexOf(item[key])) carry.push(item[key]);
                    return carry;
                }, []);
            }

            var seasons = getUniqueValuesOfKey(fixtures, 'season');

            var seasonOptions = seasons.map((theSeason) => {
                return (
                    <option key={theSeason} value={theSeason}>{theSeason}</option>
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
                    <div className="column small-2">
                        <br/>
                        <button className="button" onClick={(e) => {_that.setSeason(_that.refs.season.value)}}>Go</button>
                    </div>
                    <div className="column small-5">
                        &nbsp;
                    </div>
                </div>
            );
        }

        if (status.isFetching) {
            return (
                <div>
                    <div className="callout">
                      <h5>Loading</h5>
                      <p>Please wait while we get the fixtures...</p>
                    </div>
                </div>
            );
        } else if (!fixtures || fixtures.length < 1) {
            return (
                <div>
                    <div className="callout alert">
                      <h5>Error</h5>
                      <p>No fixtures found.</p>
                    </div>
                </div>
            );
        } else {
            // Get a list of fixtures output as table rows
            var fixtureRows = fixtures.map((fixture) => {
                if (fixture.season == season) {
                    var logo = fixture.logo ?   `https://daggers-demo-eu.storage.googleapis.com${fixture.logo}` :    // `/images/uploads/teams/${fixture.logo}` :
                                                'https://daggers-demo-eu.storage.googleapis.com/basics/clublogo.png';       // '/images/clublogo.png';
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

                    return (
                        <tr key={fixture.id}>
                            <td>{fixture.date}</td>
                            <td><img src={logo} alt={fixture.team} className="fixture-logo"/></td>
                            <td><p className="team-name">{fixture.team}</p><p className="competition-name">{fixture.competition}</p></td>
                            <td>Att {fixture.attendance}</td>
                            <td>{home_away}</td>
                            <td>{fixture.result}</td>
                            <td>{w_l_d}</td>
                            <td>{link}</td>
                        </tr>
                    );
                }
            });
            
            return (
                <div>
                    <div className="row">
                        <div className="columns small-12 large-8">

                            <h3>Fixtures &amp; Results</h3>
                            <h4>Check the League Table via the <a href="https://thenationalleague.org.uk/tables.php?division_id=7">National League</a></h4>

                            {seasonPicker(this, season)}
                            <table className="hover stack text-center">
                                <tbody>
                                    {fixtureRows}
                                </tbody>
                            </table>

                        </div>
                        <div className="columns small-12 large-4">
                            <div className="placeholder-ad">
                                <p>Ads go here</p>
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
