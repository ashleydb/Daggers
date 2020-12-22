import React from 'react';
import LazyLoad from 'react-lazyload';
import PlaceholderComponent from './Placeholder';
import * as PlayersAPI from '../api/PlayersAPI';
import {gcpStorageBucket} from '../utils/constants';

export default class PlayerSummary extends React.Component {
    // Need to override the constructor to set the initial state and do data binding
    constructor(props) {
        // Call the parent constructor with the props object we automatically get
        super(props);
    }
    handleClickPlayer(event, playerId) {
        //Don't refresh the whole page when a link is clicked
        event.preventDefault();
        
        var {onSelectPlayer} = this.props;
        onSelectPlayer(playerId);
    }
    render() {
        // TODO: Change style based on 'selected'
        var { player, selected } = this.props;

        if (!player) {
            return (
                <div>
                    <div className="callout alert">
                        <h5>Error</h5>
                        <p>Player not found.</p>
                    </div>
                </div>
            );
        } else {
            var image = player.image;
            if (!image) {
                image = PlayersAPI.DEFAULT_PLAYER.image;
            }
            image = `https://${gcpStorageBucket}.storage.googleapis.com${image}`;

            var playerName = `${player.first_name} ${player.last_name}`;

            return (
                <div className="column column-block">
                    <div className="card">
                            <a href='#' onClick={(e) => this.handleClickPlayer(e, player.id)}>
                                <LazyLoad placeholder={<PlaceholderComponent />}>
                                    <img src={image} alt={playerName} className="player-thumbnail" />
                                </LazyLoad>
                            </a>
                            <div className="card-section">
                                <a href='#' onClick={(e) => this.handleClickPlayer(e, player.id)}>
                                    <h4>{playerName}</h4>
                                </a>
                                <p className="player-summary-position">{player.position}</p>
                            </div>
                        
                    </div>
                </div>
            );
        }
    }
};
