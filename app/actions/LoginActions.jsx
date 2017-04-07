// Actions supporting login interaction

import * as LoginAPI from 'LoginAPI';

/*
// --- FIXTURES ---

export const REQUEST_FIXTURE_LIST = 'REQUEST_FIXTURE_LIST'
export const RECEIVE_FIXTURE_LIST = 'RECEIVE_FIXTURE_LIST'
export const RECEIVE_FIXTURE = 'RECEIVE_FIXTURE'

// (4) We are getting the list of fixtures
function requestFixtures() {
    return {
        type: REQUEST_FIXTURE_LIST
    }
}

// (5) We got the fixture list back
function receiveFixtures(fixtures) {
    return {
        type: RECEIVE_FIXTURE_LIST,
        fixtures,
        receivedAt: Date.now()
    };
}

// (3) Triggers the download of fixtures
function fetchFixtures() {
    return dispatch => {
        dispatch(requestFixtures())
        return FixturesAPI.getFixtures()
            .then(response => dispatch(receiveFixtures(response)))
    };
}

// (2) Checks if it would be necessary to download fixtures, or if the cache is valid
function shouldFetchFixtures(state) {
    const {fixtures, status} = state.fixtures;
    if (!fixtures) {
        return true;
    } else if (status.isFetching) {
        return false;
    } else {
        return status.didInvalidate;
    }
}

// (1) Starts the chain of events to load in the fixtures, if they are not already valid in the cache
export function fetchFixturesIfNeeded() {
    // Note that the function also receives getState()
    // which lets you choose what to dispatch next.

    // This is useful for avoiding a network request if
    // a cached value is already available.

    return (dispatch, getState) => {
        if (shouldFetchFixtures(getState())) {
            // Dispatch a thunk from thunk!
            return dispatch(fetchFixtures())
        } else {
            // Let the calling code know there's nothing to wait for.
            return Promise.resolve()
        }
    }
}
*/

/*
// --- LOGIN ---

export const INVALIDATE_LOGIN = 'INVALIDATE_LOGIN'

// So we reload the state.login objects if we dispatch promptLoginIfNeeded() again
export function invalidateLogin() {
    return {
        type: INVALIDATE_LOGIN
    }
}

// (4) We got the access token back. If it was empty, preload some default data.
function receiveFixture(fixture) {
    return {
        type: RECEIVE_FIXTURE,
        fixture,
        receivedAt: Date.now()
    };
}

// (3) Triggers the login
function promptLogin() {
    return dispatch => {
        // TODO: If this flow is needed, then I'm stuck here...
        var fixture = FixturesAPI.getFixture(fixtureId, fixtures)
        dispatch(receiveFixture(fixture));
    };
}

// (2) Checks if it would be necessary to login, or if the access token is valid
function shouldLogin(state) {
    const {status, login} = state.login;
    var timeInMs = Date.now();
    if (!login) {
        return true;
    } else if (status.isFetching) {
        return false;
    } else if (login.token.expires < timeInMs) {
        return true;
    } else {
        return status.didInvalidate;
    }
}

// (1) Starts the chain of events to login if not already authenticated
export function promptLoginIfNeeded() {
    return (dispatch, getState) => {
        if (shouldLogin(getState())) {
            // Dispatch a thunk from thunk!
            return dispatch(promptLogin());
        } else {
            // Let the calling code know there's nothing to wait for.
            return Promise.resolve();
        }
    }
}
*/

// --- LOGGING IN ---

export const SUBMIT_LOGIN_SUCCESS   = 'SUBMIT_LOGIN_SUCCESS';

export var submitLoginSuccess = (auth) => {
    return {
        type: SUBMIT_LOGIN_SUCCESS,
        auth
    };
}

export const SUBMIT_LOGIN_ERROR   = 'SUBMIT_LOGIN_ERROR';

export var submitLoginError = (auth, error) => {
    return {
        type: SUBMIT_LOGIN_ERROR,
        auth,
        error
    };
}

export const SUBMIT_LOGIN   = 'SUBMIT_LOGIN';
// TODO: Copy this catch logic to the other thunk actions I have!!
export var submitLogin = (username, password) => {
    return (dispatch, getState) => {
        LoginAPI.login(username, password)
        .then((auth) => {
            if (auth === {})
                dispatch(submitLoginError(auth, "Problem logging in."));
            else
                dispatch(submitLoginSuccess(auth));
        }).catch((e) => {
            // API call failed for some reason
            dispatch(submitLoginError(null, e));
        });
    };
}
