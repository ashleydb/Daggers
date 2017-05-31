import {actions} from 'actions';

// For sorting arrays efficiently
var Sorter = require('app/Sorter.js');

export var INITIAL_STATE_PLAYERS = {
    players: null,   // Array of player objects
    player: null,    // Player object, e.g. PlayersAPI.DEFAULT_PLAYER
    status: {
        isFetching: false,
        didInvalidate: false,
        lastUpdated: null
    }
};

export var PlayersReducer = (state = INITIAL_STATE_PLAYERS, action) => {
    switch (action.type) {
        case actions.players.SUBMIT_PLAYER:
            return {
                ...state,
                player: action.player
            };
            break;

        case actions.players.SUBMIT_PLAYER_SUCCESS:
            var newPlayer = true;
            var players = state.players.map((player) => {
                if (player.id == action.player.id) {
                    newPlayer = false;
                    return action.player;
                } else {
                    return player;
                }
            });
            if (newPlayer) {
                players = [action.player, ...players];
            }

            return {
                ...state,
                players,
                status: {
                    isFetching: false,
                    didInvalidate: false,
                    lastUpdated: action.receivedAt
                },
                player: null
            };
            break;

        case actions.players.SUBMIT_PLAYER_ERROR:
            return Object.assign({}, state, {
                status: {
                    isFetching: false,
                    didInvalidate: false,
                    error: action.error
                }
            });
            break;

        case actions.players.INVALIDATE_PLAYERS:
            // Object.assign(<new state to copy into>, <existing state to copy from>, <change to make>);
            return Object.assign({}, state, {
                status: {
                    didInvalidate: true
                }
            });
            break;

        case actions.players.REQUEST_PLAYERS:
            return Object.assign({}, state, {
                status: {
                    isFetching: true,
                    didInvalidate: false
                }
            });
            break;

        case actions.players.RECEIVE_PLAYERS:
            return Object.assign({}, state, {
                status: {
                    isFetching: false,
                    didInvalidate: false,
                    lastUpdated: action.receivedAt,
                },
                players: action.players
            });
            break;

        case actions.players.RECEIVE_PLAYER:
            return Object.assign({}, state, {
                player: action.player
            });
            break;

        case actions.players.CHANGE_PLAYER:
            return {
                ...state,
                player: action.player
            };
            break;

        default:
            return state;
            break;
    }
};
