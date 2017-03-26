// Actions supporting fixtures interaction

import * as FixturesAPI from 'FixturesAPI';

export const INVALIDATE_FIXTURES = 'INVALIDATE_FIXTURES'

export const REQUEST_FIXTURE_LIST = 'REQUEST_FIXTURE_LIST'
export const RECEIVE_FIXTURE_LIST = 'RECEIVE_FIXTURE_LIST'
export const RECEIVE_FIXTURE = 'RECEIVE_FIXTURE'


// --- FIXTURES ---

// So we reload the state.fixtures objects if we dispatch fetchFixturesIfNeeded() again
export function invalidateFixtures() {
    return {
        type: INVALIDATE_FIXTURES
    }
}

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


// --- INDIVIDUAL FIXTURE ---

// (4) We got the fixture back. If it was empty, preload some default data.
function receiveFixture(fixture) {
    return {
        type: RECEIVE_FIXTURE,
        fixture,
        receivedAt: Date.now()
    };
}

// (3) Triggers the download of a fixture
function fetchFixture(fixtures, fixtureId) {
    return dispatch => {
        var fixture = FixturesAPI.getFixture(fixtureId, fixtures)
        dispatch(receiveFixture(fixture));
    };
}

// (2) Checks if it would be necessary to download fixtures, or if the cache is valid
function shouldFetchFixture(state, fixtureId) {
    const {status, fixture} = state.fixtures;
    if (!fixture) {
        return true;
    } else if (status.isFetching) {
        return false;
    } else if (fixture.id != fixtureId) {
        return true;
    } else {
        return status.didInvalidate;
    }
}

// (1) Starts the chain of events to load in a single fixture, if not already cached
export function fetchFixtureIfNeeded(fixtureId) {
    return (dispatch, getState) => {
        if (shouldFetchFixture(getState(), fixtureId)) {
            // Dispatch a thunk from thunk!
            var state = getState();
            var fixture = state.fixtures.fixture;
            return dispatch(fetchFixture(fixtures, fixtureId));
        } else {
            // Let the calling code know there's nothing to wait for.
            return Promise.resolve();
        }
    }
}


// --- ADDING & EDITING FIXTURES ---

export const SUBMIT_FIXTURE_SUCCESS   = 'SUBMIT_FIXTURE_SUCCESS';

export var submitFixtureSuccess = (fixture) => {
    return {
        type: SUBMIT_FIXTURE_SUCCESS,
        fixture
    };
}

export const SUBMIT_FIXTURE_ERROR   = 'SUBMIT_FIXTURE_ERROR';

export var submitFixtureError = (fixture, error) => {
    return {
        type: SUBMIT_FIXTURE_ERROR,
        fixture,
        error
    };
}

export const SUBMIT_FIXTURE   = 'SUBMIT_FIXTURE';

export var submitFixture = (fixture) => {
    return (dispatch, getState) => {
        FixturesAPI.addFixture(fixture).then((newFixture) => {
            if (newFixture === {})
                dispatch(submitFixtureError(fixture, "Fixture not saved."));
            else
                dispatch(submitFixtureSuccess(newFixture));
        });
    };
}
