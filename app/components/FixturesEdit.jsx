import React from 'react';
import {Link, browserHistory} from 'react-router';
var {connect} = require('react-redux');
import adminComponent from 'AdminMessage';
import FixtureEditForm from 'FixtureEditForm';
import {actions} from 'actions';
import * as FixturesAPI from 'FixturesAPI';

// TODO: Need to lock behind authentication
// TODO: Need to split these into Seasons in some way. Probably a dedicated field

export class FixturesEdit extends React.Component {
    // Need to override the constructor to set the initial state and do data binding
    constructor(props) {
        // Call the parent constructor with the props object we automatically get
        super(props);
        // BINDING: Keep 'this' scoped to this object in any handlers
        this.handleSaveFixture = this.handleSaveFixture.bind(this);
        this.setSeason = this.setSeason.bind(this);
    }
    componentWillMount() {
        this.props.dispatch(actions.fixtures.fetchFixturesIfNeeded());
    }
    handleSaveFixture(fixture) {
        this.props.dispatch(actions.fixtures.submitFixture(fixture, this.props.login.token));

        // TODO: Not great, since write could fail and then we've gone away from the form's contents
        browserHistory.push('/admin/fixtures');
    }
    setSeason(season) {
        // Change which page of news stories we are showing
        this.props.dispatch(actions.fixtures.selectSeason(season));
    }
    render() {
        var {fixtureId} = this.props.params;
        var {fixtures, status, season} = this.props.fixtures;
        var fixture = FixturesAPI.getFixture(fixtureId, fixtures);

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
            // Still loading data, so show a message
            return (
                <div>
                    <div className="callout">
                      <h5>Loading</h5>
                      <p>Please wait while we get the fixtures...</p>
                    </div>
                </div>
            );
        } else if (fixtureId == "new" || (fixture.id && fixture.id == fixtureId)) {
            // Editing a fixture, so show the form
            // TODO: Pass in the currently selected season as a hint for the form?
            return (
                <div>
                    <FixtureEditForm fixture={fixture} onSaveFixture={this.handleSaveFixture} token={this.props.login.token}/>
                </div>
            );
        } else if (fixtures && fixtures.length > 0) {
            // Got a list of fixtures, so show them
            var errorMessage = status.error === undefined ? null : (
                <div className="callout alert">
                  <h5>Error</h5>
                  <p>{status.error}</p>
                </div>
            );
            
            // TODO: Add a Delete button
            return (
                <div>
                    {seasonPicker(this, season)}
                    {errorMessage}
                    
                    <table className="hover text-center">
                        <tbody>
                            {fixtures.map((game) => {
                                if (game.season == season) {
                                    return (
                                        <tr key={game.id}>
                                            <td>{game.date}</td>
                                            <td><p className="team-name">{game.team}</p><p className="competition-name">{game.competition}</p></td>
                                            <td><Link to={`/admin/fixtures/${game.id}`}><i className="fi-pencil"></i> Edit</Link></td>
                                        </tr>
                                    );
                                }
                            })}
                            <tr>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td><Link to={`/admin/fixtures/new`}><i className="fi-plus"></i> Create New</Link></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            );
        } else {
            // Nothing is loading but we have no data, so show an error
            return (
                <div>
                    <div className="callout alert">
                      <h5>Error</h5>
                      <p>No fixtures found.</p>
                    </div>
                </div>
            );
        }
    }
};

export default connect(
  (state) => {
    return {
        fixtures: state.fixtures,
        login: state.login
    };
  })(adminComponent(FixturesEdit));
