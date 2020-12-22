import React from 'react';
import {Link, browserHistory} from 'next/link';
var {connect} = require('react-redux');
import { swal } from 'react-redux-sweetalert2';
import adminComponent from '../components/AdminMessage';
import FixtureEditForm from '../components/FixtureEditForm';
import {actions} from '../actions/actions';
import * as FixturesAPI from '../api/FixturesAPI';

// TODO: Need to lock behind authentication
// TODO: Need to split these into Seasons in some way. Probably a dedicated field

export class FixturesEdit extends React.Component {
    // Need to override the constructor to set the initial state and do data binding
    constructor(props) {
        // Call the parent constructor with the props object we automatically get
        super(props);
        // BINDING: Keep 'this' scoped to this object in any handlers
        this.handleSaveFixture = this.handleSaveFixture.bind(this);
        this.setSeasonAndSquad = this.setSeasonAndSquad.bind(this);
        this.promptRemoveFixture = this.promptRemoveFixture.bind(this);
        this.handleRemoveFixture = this.handleRemoveFixture.bind(this);
        this.props.showAlert.bind(this);
    }
    componentDidMount() {
        this.props.dispatch(actions.fixtures.fetchFixturesIfNeeded());
    }
    handleSaveFixture(fixture) {
        this.props.dispatch(actions.fixtures.submitFixture(fixture, this.props.login.token));

        // TODO: Not great, since write could fail and then we've gone away from the form's contents
        browserHistory.push('/admin/fixtures');
    }
    setSeasonAndSquad(season, squad) {
        // Change which season of fixtures we are showing
        this.props.dispatch(actions.fixtures.selectSeasonAndSquad(season, squad));
    }
    promptRemoveFixture(fixture) {
        // TODO: Not sure how to do binding here, so I'll hack it with 'that'
        var that = this;
		this.props.showAlert({
            title: 'Are you sure?',
            text: `Delete "${fixture.team}" fixture? You won't be able to revert this!`,
            type: 'warning',
            allowOutsideClick: false,
            showCancelButton: true,
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            confirmButtonColor: '#3085d6',
            showLoaderOnConfirm: true,
            cancelCallback: () => {},
            preConfirm: () => {
                return new Promise(function (resolve) {
                    that.handleRemoveFixture(fixture.id);
                    resolve();
                });
            }
        });
    }
    handleRemoveFixture(id) {
        this.props.dispatch(actions.fixtures.removeFixture(id, this.props.login.token));
    }
    render() {
        var {fixtureId} = this.props.params;
        var {fixtures, status, season, squad} = this.props.fixtures;
        var fixture = FixturesAPI.getFixture(fixtureId, fixtures);

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

            var fixtureRows = [];
            fixtures.forEach((game) => {
                if (game.season == season && (squad == 'All' || squad == game.squad)) {
                    fixtureRows.push((
                        <tr key={game.id}>
                            <td>{game.date}</td>
                            <td><p className="team-name">{game.team}</p><p className="competition-name">{game.competition}</p></td>
                            <td><Link href={`/admin/fixtures/${game.id}`} className="button"><i className="fi-pencil"></i> Edit</Link></td>
                            <td><button className="button" onClick={() => this.promptRemoveFixture(game)}><i className="fi-x"></i> Delete</button></td>
                        </tr>
                    ));
                }
            });
            
            return (
                <div>
                    {seasonAndSquadPicker(this, season, squad)}
                    {errorMessage}
                    
                    <Link href={`/admin/fixtures/new`} className="button expanded"><i className="fi-plus"></i> Create New</Link>
                    <table className="hover text-center">
                        <tbody>
                            {fixtureRows}
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

import { bindActionCreators } from 'redux'

function mapStateToProps(state) {
    return {
        fixtures: state.fixtures,
        login: state.login
    };
}

function mapDispatchToProps(dispatch) {
    let actions = bindActionCreators({...swal}, dispatch);
    return { ...actions, dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(adminComponent(FixturesEdit))
