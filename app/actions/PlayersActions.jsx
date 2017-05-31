// Actions supporting Player data interaction

import * as PlayersAPI from 'PlayersAPI';

export const INVALIDATE_PLAYERS = 'INVALIDATE_PLAYERS'

export const REQUEST_PLAYERS = 'REQUEST_PLAYERS'
export const RECEIVE_PLAYERS = 'RECEIVE_PLAYERS'
export const RECEIVE_PLAYER = 'RECEIVE_PLAYER'


// --- PLAYERS ---

// So we reload the state.players objects if we dispatch fetchPlayersIfNeeded() again
export function invalidatePlayers() {
    return {
        type: INVALIDATE_PLAYERS
    }
}

// (4) We are getting the list of players
function requestPlayers() {
    return {
        type: REQUEST_PLAYERS
    }
}

// (5) We got the players back.
function receivePlayers(players) {
    return {
        type: RECEIVE_PLAYERS,
        players,
        receivedAt: Date.now()
    };
}

// (3) Triggers the download of players
function fetchPlayers() {
    return dispatch => {
        dispatch(requestPlayers())
        return PlayersAPI.getPlayers()
            .then(response => dispatch(receivePlayers(response)))
    };
}

// (2) Checks if it would be necessary to download players, or if the cache is valid
function shouldFetchPlayers(state) {
    const {players, status} = state.players;
    if (!players) {
        return true;
    } else if (status.isFetching) {
        return false;
    } else {
        return status.didInvalidate;
    }
}

// (1) Starts the chain of events to load in the players, if they are not already valid in the cache.
export function fetchPlayersIfNeeded() {
    // Note that the function also receives getState()
    // which lets you choose what to dispatch next.

    // This is useful for avoiding a network request if
    // a cached value is already available.

    return (dispatch, getState) => {
        if (shouldFetchPlayers(getState())) {
            // Dispatch a thunk from thunk!
            return dispatch(fetchPlayers())
        } else {
            // Let the calling code know there's nothing to wait for.
            return Promise.resolve()
        }
    }
}


// --- INDIVIDUAL PLAYER ---

// (4) We got the player back. If it was empty, preload some default data.
function receivePlayer(player) {
    return {
        type: RECEIVE_PLAYER,
        player,
        receivedAt: Date.now()
    };
}

// (3) Triggers the download of a player
function fetchPlayer(players, playerId) {
    return dispatch => {
        var player = PlayersAPI.getPlayer(playerId, players)
        dispatch(receivePlayer(player));
    };
}

// (2) Checks if it would be necessary to download player, or if the cache is valid
function shouldFetchPlayer(state, playerId) {
    const {status, player} = state.players;
    if (!player) {
        return true;
    } else if (status.isFetching) {
        return false;
    } else if (player.id != playerId) {
        return true;
    } else {
        return status.didInvalidate;
    }
}

// (1) Starts the chain of events to load in a single player, if not already cached
export function fetchPlayerIfNeeded(playerId) {
    return (dispatch, getState) => {
        if (shouldFetchPlayer(getState(), playerId)) {
            // Dispatch a thunk from thunk!
            var state = getState();
            var players = state.players.players;
            return dispatch(fetchPlayer(players, playerId));
        } else {
            // Let the calling code know there's nothing to wait for.
            return Promise.resolve();
        }
    }
}


// --- ADDING & EDITING PLAYERS ---

export const SUBMIT_PLAYER_SUCCESS   = 'SUBMIT_PLAYER_SUCCESS';

export var submitPlayerSuccess = (player, receivedAt) => {
    return {
        type: SUBMIT_PLAYER_SUCCESS,
        player,
        receivedAt
    };
}

export const SUBMIT_PLAYER_ERROR   = 'SUBMIT_PLAYER_ERROR';

export var submitPlayerError = (player, error) => {
    return {
        type: SUBMIT_PLAYER_ERROR,
        player,
        error
    };
}

export const SUBMIT_PLAYER   = 'SUBMIT_PLAYER';

export var submitPlayer = (player, token) => {
    return (dispatch, getState) => {
        PlayersAPI.addPlayer(player, token).then((newPlayer) => {
            if (newPlayer === {})
                dispatch(submitPlayerError(player, "Player not saved."));
            else
                dispatch(submitPlayerSuccess(newPlayer, Date.now()));
        });
    };
}

// --- VIEWING PLAYERS ---

export const CHANGE_PLAYER   = 'CHANGE_PLAYER';

export var changePlayer = (player) => {
    return {
        type: CHANGE_PLAYER,
        player
    };
}
