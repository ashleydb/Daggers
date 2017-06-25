import React from 'react';
import ReactDOM from 'react-dom';
var {connect} = require('react-redux');
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
        // BINDING: Keep 'this' scoped to this object in any handlers
        this.loadPlayer = this.loadPlayer.bind(this);
    }
    componentWillMount() {
        //this.loadPlayer(this.props.id);
        this.props.dispatch(actions.players.fetchPlayersIfNeeded());
    }
    loadPlayer(id) {
        var player = PlayersAPI.getPlayer(id, this.props.players.players);
        this.props.dispatch(actions.players.changePlayer(player));
        this.scrollTo('playerData');
    }
    scrollTo(name) {
        switch (name) {
            case 'playerData':
                ReactDOM.findDOMNode(this._playerData).scrollIntoView()
                break;
            case 'playerList':
                ReactDOM.findDOMNode(this._playerList).scrollIntoView()
                break;
        }
    }
    render() {
        var {players, status, player} = this.props.players;

        if (status.isFetching) {
            return (
                <div>
                    <div className="callout">
                      <h5>Loading</h5>
                      <p>Please wait while we get the players...</p>
                    </div>
                </div>
            );
        } else if (!players || players.length < 1) {
            return (
                <div>
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
                        <PlayerSummary player={players[i]} selected={player && (players[i].id == player.id)} onSelectPlayer={this.loadPlayer} />
                    );
                }
            }

            var playersHTML = []; // Will be an array containing components to render
            for (var i = 0; i < teamNames.length; ++i) {
                var teamName = teamNames[i];
                var rowCount = 0;
                while (playersData[teamName].length) {
                    var playerA = playersData[teamName].shift();
                    var playerB = playersData[teamName].shift();
                    var playerC = playersData[teamName].shift();
                    var playerD = playersData[teamName].shift();

                    playersHTML.push(
                        <div className="row small-up-1 medium-up-2 large-up-4" key={`${teamName}-${rowCount}`}>
                            <div className="column" key={playerA ? playerA.props.player.id : 'playerA'}>
                                {playerA}
                            </div>
                            <div className="column" key={playerB ? playerB.props.player.id : 'playerB'}>
                                {playerB}
                            </div>
                            <div className="column" key={playerC ? playerC.props.player.id : 'playerC'}>
                                {playerC}
                            </div>
                            <div className="column" key={playerD ? playerD.props.player.id : 'playerD'}>
                                {playerD}
                            </div>
                        </div>
                    );

                    ++rowCount;
                }
            }

            // TODO: Should we only show either the team list OR player data with Back button?
            //  Wouldn't need a weird box to scroll through with odd background colours...
            var playerData = null; // Will be an individual player's details as a component to render
            if (player) {
                playerData = (
                    <div>
                        <a className="scroll-link" onClick={() => this.scrollTo('playerList')}>Back to Top</a>
                        <PlayerDetail player={player} />
                        <a className="scroll-link" onClick={() => this.scrollTo('playerList')}>Back to Top</a>
                    </div>
                );
            }

            return (
                <div>
                    <div className="row">
                        <div id="playerList" name="playerList" ref={(ref) => this._playerList = ref} className="column medium-8 player-list">
                            <div className="callout secondary">Scroll down for more players. Click one for more detail.</div>
                            {playersHTML}
                        </div>
                        <div className="column medium-4">
                            <div className="placeholder-ad">
                                <MedianetTag cid="8CUM55E8A" crid="513062281" size="300x250" divId = "513062281"/>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div id="playerData" name="playerData" ref={(ref) => this._playerData = ref} className="column medium-8">
                            {playerData}
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
