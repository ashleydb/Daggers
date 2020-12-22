// Actions supporting sponsors interaction

import * as SponsorsAPI from '../api/SponsorsAPI';

export const INVALIDATE_SPONSORS = 'INVALIDATE_SPONSORS'

export const REQUEST_SPONSOR_LIST = 'REQUEST_SPONSOR_LIST'
export const RECEIVE_SPONSOR_LIST = 'RECEIVE_SPONSOR_LIST'
export const RECEIVE_SPONSOR = 'RECEIVE_SPONSOR'


// --- SPONSORS ---

// So we reload the state.sponsors objects if we dispatch fetchSponsorsIfNeeded() again
export function invalidateSponsors() {
    return {
        type: INVALIDATE_SPONSORS
    }
}

// (4) We are getting the list of sponsors
function requestSponsors() {
    return {
        type: REQUEST_SPONSOR_LIST
    }
}

// (5) We got the sponsor list back
function receiveSponsors(sponsors) {
    return {
        type: RECEIVE_SPONSOR_LIST,
        sponsors,
        receivedAt: Date.now()
    };
}

// (3) Triggers the download of sponsors
function fetchSponsors() {
    return dispatch => {
        dispatch(requestSponsors())
        return SponsorsAPI.getSponsors()
            .then(response => dispatch(receiveSponsors(response)))
    };
}

// (2) Checks if it would be necessary to download sponsors, or if the cache is valid
function shouldFetchSponsors(state) {
    const {sponsors, status} = state.sponsors;
    if (!sponsors) {
        return true;
    } else if (status.isFetching) {
        return false;
    } else {
        return status.didInvalidate;
    }
}

// (1) Starts the chain of events to load in the sponsors, if they are not already valid in the cache
export function fetchSponsorsIfNeeded() {
    // Note that the function also receives getState()
    // which lets you choose what to dispatch next.

    // This is useful for avoiding a network request if
    // a cached value is already available.

    return (dispatch, getState) => {
        if (shouldFetchSponsors(getState())) {
            // Dispatch a thunk from thunk!
            return dispatch(fetchSponsors())
        } else {
            // Let the calling code know there's nothing to wait for.
            return Promise.resolve()
        }
    }
}


// --- INDIVIDUAL SPONSOR ---

// (4) We got the sponsor back. If it was empty, preload some default data.
function receiveSponsor(sponsor) {
    return {
        type: RECEIVE_SPONSOR,
        sponsor,
        receivedAt: Date.now()
    };
}

// (3) Triggers the download of a sponsor
function fetchSponsor(sponsors, sponsorId) {
    return dispatch => {
        var sponsor = SponsorsAPI.getSponsor(sponsorId, sponsors)
        dispatch(receiveSponsor(sponsor));
    };
}

// (2) Checks if it would be necessary to download sponsors, or if the cache is valid
function shouldFetchSponsor(state, sponsorId) {
    const {status, sponsor} = state.sponsors;
    if (!sponsor) {
        return true;
    } else if (status.isFetching) {
        return false;
    } else if (sponsor.id != sponsorId) {
        return true;
    } else {
        return status.didInvalidate;
    }
}

// (1) Starts the chain of events to load in a single sponsor, if not already cached
export function fetchSponsorIfNeeded(sponsorId) {
    return (dispatch, getState) => {
        if (shouldFetchSponsor(getState(), sponsorId)) {
            // Dispatch a thunk from thunk!
            var state = getState();
            var sponsor = state.sponsors.sponsor;
            return dispatch(fetchSponsor(sponsors, sponsorId));
        } else {
            // Let the calling code know there's nothing to wait for.
            return Promise.resolve();
        }
    }
}


// --- ADDING & EDITING SPONSORS ---

export const SUBMIT_SPONSOR_SUCCESS   = 'SUBMIT_SPONSOR_SUCCESS';

export var submitSponsorSuccess = (sponsor) => {
    return {
        type: SUBMIT_SPONSOR_SUCCESS,
        sponsor
    };
}

export const SUBMIT_SPONSOR_ERROR   = 'SUBMIT_SPONSOR_ERROR';

export var submitSponsorError = (sponsor, error) => {
    return {
        type: SUBMIT_SPONSOR_ERROR,
        sponsor,
        error
    };
}

export const SUBMIT_SPONSOR   = 'SUBMIT_SPONSOR';

export var submitSponsor = (sponsor, token) => {
    return (dispatch, getState) => {
        SponsorsAPI.addSponsor(sponsor, token).then((newSponsor) => {
            if (newSponsor === {})
                dispatch(submitSponsorError(sponsor, "Sponsor not saved."));
            else
                dispatch(submitSponsorSuccess(newSponsor));
        });
    };
}


// --- REMOVING A SPONSOR ---

export const REMOVE_SPONSOR_SUCCESS = 'REMOVE_SPONSOR_SUCCESS';

export var removeSponsorSuccess = (sponsorId) => {
    return {
        type: REMOVE_SPONSOR_SUCCESS,
        sponsorId
    };
}

export const REMOVE_SPONSOR_ERROR = 'REMOVE_SPONSOR_ERROR';

export var removeSponsorError = (sponsorId, error) => {
    return {
        type: REMOVE_SPONSOR_ERROR,
        sponsorId,
        error
    };
}

export const REMOVE_SPONSOR = 'REMOVE_SPONSOR';

export var removeSponsor = (sponsorId, token) => {
    return (dispatch, getState) => {
        SponsorsAPI.removeSponsor(sponsorId, token).then((res) => {
            if (res === {})
                dispatch(removeSponsorError(res, "Sponsor not removed."));
            else
                dispatch(removeSponsorSuccess(res));
        });
    };
}
