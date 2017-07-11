import React from 'react';
import * as PlayersAPI from 'PlayersAPI';

export default class PlayerDetail extends React.Component {
    // Need to override the constructor to set the initial state and do data binding
    constructor(props) {
        // Call the parent constructor with the props object we automatically get
        super(props);
    }
    render() {
        var { player } = this.props;

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
            image = `https://{-{gcp.storageBucket}-}.storage.googleapis.com${image}`;

            var dateStr = '';
            if (player.date_of_birth) {
                var d = new Date(Number(player.date_of_birth));
                dateStr = d.toDateString();
            }

            var playerName = `${player.first_name} ${player.last_name}`;

            return (
                <div>
                    <table className="hover stack player-detail">
                        <tbody>
                            <tr>
                                <td className="player-label">Name</td>
                                <td className="player-data">{playerName}</td>
                                <td rowSpan={9} className="player-image">
                                    <img src={image} alt={playerName} className="player-portrait"/>
                                </td>
                            </tr>
                            <tr>
                                <td className="player-label">Team</td>
                                <td className="player-data">{player.team}</td>
                            </tr>
                            <tr>
                                <td className="player-label">Date of Birth</td>
                                <td className="player-data">{dateStr}</td>
                            </tr>
                            <tr>
                                <td className="player-label">Shirt Number</td>
                                <td className="player-data">{player.shirt_number}</td>
                            </tr>
                            <tr>
                                <td className="player-label">Position</td>
                                <td className="player-data">{player.position}</td>
                            </tr>
                            <tr>
                                <td className="player-label">Height</td>
                                <td className="player-data">{player.height}</td>
                            </tr>
                            <tr>
                                <td className="player-label">Weight</td>
                                <td className="player-data">{player.weight}</td>
                            </tr>
                            <tr>
                                <td className="player-label">Nationality</td>
                                <td className="player-data">{player.nationality}</td>
                            </tr>
                            <tr>
                                <td className="player-label">On Loan?</td>
                                <td className="player-data">{player.onloan_status}</td>
                            </tr>
                            <tr>
                                <td colSpan={3} className="player-data">
                                    {player.short_description}
                                    <br />
                                    <div dangerouslySetInnerHTML={{ __html: player.biography }} />
                                    &nbsp;
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            );
        }
    }
};
