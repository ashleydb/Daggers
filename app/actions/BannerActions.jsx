// Actions supporting single banner content editing, (e.g. ticket sales banner)

import * as BannerAPI from 'BannerAPI';

// --- ALL BANNER ---

export const INVALIDATE_BANNER = 'INVALIDATE_BANNER'

export const REQUEST_BANNER = 'REQUEST_BANNER'
export const RECEIVE_BANNER = 'RECEIVE_BANNER'

// So we reload the state.banner objects if we dispatch fetchBannerIfNeeded() again
export function invalidateBanner() {
    return {
        type: INVALIDATE_BANNER
    }
}

// (4) We are getting the list of banner contents
function requestBanner() {
    return {
        type: REQUEST_BANNER
    }
}

// (5) We got the banner contents back.
function receiveBanner(banner) {
    return {
        type: RECEIVE_BANNER,
        banner,
        receivedAt: Date.now()
    };
}

// (3) Triggers the download of banner content
function fetchBanner() {
    return dispatch => {
        dispatch(requestBanner())
        return BannerAPI.getBanner()
            .then(response => dispatch(receiveBanner(response)))
    };
}

// (2) Checks if it would be necessary to download banner, or if the cache is valid
function shouldFetchBanner(state) {
    const {banner, status} = state.banner;
    if (!banner) {
        return true;
    } else if (status.isFetching) {
        return false;
    } else {
        return status.didInvalidate;
    }
}

// (1) Starts the chain of events to load in the banner content for all banner, if it is not already valid in the cache
export function fetchBannerIfNeeded() {
    // Note that the function also receives getState()
    // which lets you choose what to dispatch next.

    // This is useful for avoiding a network request if
    // a cached value is already available.

    return (dispatch, getState) => {
        if (shouldFetchBanner(getState())) {
            // Dispatch a thunk from thunk!
            return dispatch(fetchBanner())
        } else {
            // Let the calling code know there's nothing to wait for.
            return Promise.resolve()
        }
    }
}


// --- ADDING & EDITING A BANNER ---

export const SUBMIT_BANNER_SUCCESS = 'SUBMIT_BANNER_SUCCESS';

export var submitBannerSuccess = (banner, receivedAt) => {
    return {
        type: SUBMIT_BANNER_SUCCESS,
        banner,
        receivedAt
    };
}

export const SUBMIT_BANNER_ERROR = 'SUBMIT_BANNER_ERROR';

export var submitBannerError = (banner, error) => {
    return {
        type: SUBMIT_BANNER_ERROR,
        banner,
        error
    };
}

export const SUBMIT_BANNER = 'SUBMIT_BANNER';

export var submitBanner = (banner, token) => {
    return (dispatch, getState) => {
        BannerAPI.addBanner(banner, token).then((newBanner) => {
            if (newBanner === {})
                dispatch( submitBannerError(banner, "Banner not saved.") );
            else
                dispatch( submitBannerSuccess(newBanner, Date.now()) );
        });
    };
}


// --- REMOVING A BANNER ---

export const REMOVE_BANNER_SUCCESS = 'REMOVE_BANNER_SUCCESS';

export var removeBannerSuccess = () => {
    return {
        type: REMOVE_BANNER_SUCCESS
    };
}

export const REMOVE_BANNER_ERROR = 'REMOVE_BANNER_ERROR';

export var removeBannerError = (error) => {
    return {
        type: REMOVE_BANNER_ERROR,
        error
    };
}

export const REMOVE_BANNER = 'REMOVE_BANNER';

export var removeBanner = (token) => {
    return (dispatch, getState) => {
        BannerAPI.removeBanner(token).then((res) => {
            if (res === {})
                dispatch(removeBannerError(res, "Banner not removed."));
            else
                dispatch(removeBannerSuccess(res));
        });
    };
}
