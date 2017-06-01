import React from 'react';
import {Link, browserHistory} from 'react-router';
var { connect } = require('react-redux');
import adminComponent from 'AdminMessage';
import PlayerEditForm from 'PlayerEditForm';
import { actions } from 'actions';
import * as PlayersAPI from 'PlayersAPI';

export class PlayersEdit extends React.Component {
    // Need to override the constructor to set the initial state and do data binding
    constructor(props) {
        // Call the parent constructor with the props object we automatically get
        super(props);
        // BINDING: Keep 'this' scoped to this object in any handlers
        this.handleSavePlayer = this.handleSavePlayer.bind(this);
    }
    componentWillMount() {
        this.props.dispatch(actions.players.fetchPlayersIfNeeded());
    }
    handleSavePlayer(player) {
        this.props.dispatch(actions.players.submitPlayer(player, this.props.login.token));

        // TODO: Not great, since write could fail and then we've gone away from the form's contents
        browserHistory.push('/admin/players');
    }
    render() {
        // Are we editing at a player right now, or about to?
        var { playerId } = this.props.params;
        var { players, status } = this.props.players;
        var player = PlayersAPI.getPlayer(playerId, players) || PlayersAPI.DEFAULT_PLAYER;

        if (status.isFetching) {
            return (
                <div>
                    <div className="callout">
                        <h5>Loading</h5>
                        <p>Please wait while we get the players...</p>
                    </div>
                </div>
            );
        } else if (playerId == 'new' || player.id == playerId) {
            return (
                <div>
                    <PlayerEditForm player={player} onSavePlayer={this.handleSavePlayer} token={this.props.login.token} />
                </div>
            );
        } else if (players && players.length > 0) {
            // Show a list of players to edit

            var errorMessage = status.error === undefined ? null : (
                <div className="callout alert">
                    <h5>Error</h5>
                    <p>{status.error}</p>
                </div>
            );

            // Show as a table with names and buttons to edit/delete
            // TODO: Make the delete button work, or add one to the edit form.
            var contentRows = players.map((player) => {
                return (
                    <tr key={player.id}>
                        <td><Link to={`/admin/players/${player.id}`}>{`${player.first_name} ${player.last_name}`}</Link></td>
                        <td>{player.position}</td>
                        <td><Link to={`/admin/players/${player.id}`} className="button"><i className="fi-pencil"></i> Edit</Link></td>
                        <td><button className="button disabled"><i className="fi-x"></i> Delete</button></td>
                    </tr>
                );
            });

            return (
                <div>
                    {errorMessage}
                    <Link to={`/admin/players/new`} className="button expanded"><i className="fi-plus"></i> Create New</Link>
                    <table className="hover">
                        <tbody>
                            {contentRows}
                        </tbody>
                    </table>
                </div>
            );
        } else {
            return (
                <div>
                    <div className="callout alert">
                        <h5>Error</h5>
                        <p>No players found.</p>
                        <Link to={`/admin/players/new`}><i className="fi-plus"></i> Create New</Link>
                    </div>
                </div>
            );
        }
    }
};

export default connect(
    (state) => {
        return {
            players: state.players,
            login: state.login
        };
    })(adminComponent(PlayersEdit));
