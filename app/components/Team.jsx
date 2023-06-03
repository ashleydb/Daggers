import React from 'react';
import ReactDOM from 'react-dom';
var {connect} = require('react-redux');
//import {forceCheck} from 'react-lazyload';
import {actions} from 'actions';
import PlayerDetail from 'PlayerDetail';
import PlayerSummary from 'PlayerSummary';
import * as PlayersAPI from 'PlayersAPI';
import MedianetTag from 'MedianetTag';

export class Team extends React.Component {
    // Need to override the constructor to set the initial state and do data binding
    constructor(props) {
        // Call the parent constructor with the props object we automatically get
        super(props);
        // Now set the state here, based on the props
        this.state = {
            selectedTeam: -1,
            selectedPlayer: 0
        };
        // BINDING: Keep 'this' scoped to this object in any handlers
        this.onSelectTeam = this.onSelectTeam.bind(this);
        this.onSelectPlayer = this.onSelectPlayer.bind(this);
        this.loadPlayer = this.loadPlayer.bind(this);
    }
    componentWillMount() {
        //this.loadPlayer(this.props.id);
        this.props.dispatch(actions.players.fetchPlayersIfNeeded());
    }
    componentDidMount() {
        ReactDOM.findDOMNode(this._contentTop).scrollIntoView();
    }
    onSelectTeam() {
        this.setState({
            selectedTeam: this.refs.teamSelect.value,
            selectedPlayer: 0
        });
        this.refs.playerSelect.value = 0;
    }
    onSelectPlayer() {
        this.setState({selectedPlayer: this.refs.playerSelect.value});
    }
    loadPlayer(id) {
        var player = PlayersAPI.getPlayer(id, this.props.players.players);
        this.props.dispatch(actions.players.changePlayer(player));
    }
    render() {
        var {players, status, player} = this.props.players;

        if (status.isFetching) {
            return (
                <div>
                    <div id="contentTop" name="contentTop" ref={(ref) => this._contentTop = ref} />
                    <div className="callout">
                      <h5>Loading</h5>
                      <p>Please wait while we get the players...</p>
                    </div>
                </div>
            );
        } else if (!players || players.length < 1) {
            return (
                <div>
                    <div id="contentTop" name="contentTop" ref={(ref) => this._contentTop = ref} />
                    <div className="callout alert">
                      <h5>Error</h5>
                      <p>No players found.</p>
                    </div>
                </div>
            );
        } else {
            var playersData = {}; // Will be an object containing arrays named for each squad, (e.g. {'First':[playerComponent, ...], 'U16':[], ...})
            var teamNames = []; // Will be an array of team names, (e.g. ['First', 'U16', ...])
            for (var i = 0; i < players.length; ++i) {
                // Only show Active players
                if (players[i].status == 'Active') {
                    var teamName = players[i].team;
                    if (!playersData[teamName]) {
                        playersData[teamName] = [];
                        teamNames.push(teamName);
                    }

                    playersData[teamName].push(
                        players[i]
                    );
                }
            }

            var teamIndex = this.state.selectedTeam;
            if (teamIndex == -1) {
                for (var i = 0; i < teamNames.length; ++i) {
                    if (teamNames[i] == 'First') {
                        teamIndex = i;
                        break;
                    }
                }
            }

            var playerIndex = this.state.selectedPlayer;
            var playerNames = []; // Will be an array of player names, (e.g. ['Bobby Smith', 'Jonny Smith', ...])
            var teamName = teamNames[teamIndex];
            for (var i = 0; i < playersData[teamName].length; ++i) {
                playerNames.push( playersData[teamName][i].first_name + " " + playersData[teamName][i].last_name );
            }

            var teamOptions = teamNames.map((teamName, index) => {
                return (
                    <option key={index} value={index}>{teamName}</option>
                );
            });

            var playerOptions = playerNames.map((playerName, index) => {
                return (
                    <option key={index} value={index}>{playerName}</option>
                );
            });

            var playerData = null; // Will be an individual player's details as a component to render
            if (playerIndex !== null) {
                playerData = (
                    <div>
                        <PlayerDetail player={playersData[teamName][playerIndex]} />
                    </div>
                );
            }

            return (
                <div>
                    <div id="contentTop" name="contentTop" ref={(ref) => this._contentTop = ref} />
                    <div className="row">
                        <div className="column medium-8">
                            <div className="row">
                                <div className="column small-10">
                                    <label>Team
                                        <select ref="teamSelect" defaultValue={teamIndex}>
                                            {teamOptions}
                                        </select>
                                    </label>
                                </div>
                                <div className="column small-2">
                                    <br/>
                                    <button className="button" onClick={this.onSelectTeam}>Go</button>
                                </div>
                            </div>

                            <div className="row">
                                <div className="column small-10">
                                    <label>Player
                                        <select ref="playerSelect" defaultValue={playerIndex}>
                                            {playerOptions}
                                        </select>
                                    </label>
                                </div>
                                <div className="column small-2">
                                    <br/>
                                    <button className="button" onClick={this.onSelectPlayer}>Go</button>
                                </div>
                            </div>

                            <div className="row">
                                <div id="playerData" name="playerData" ref={(ref) => this._playerData = ref} className="column">
                                    {playerData}
                                </div>
                            </div>
                        </div>

                        <div className="column medium-4">
                            <div className="placeholder-ad">
                                <MedianetTag cid="8CUM55E8A" crid="513062281" size="300x250" divId = "513062281"/>
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
        players: state.players
    };
  })(Team);
