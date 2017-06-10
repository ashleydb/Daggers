import {actions} from 'actions';

export const INITIAL_STATE_BANNER = {
    banner: null,     // Banner object, e.g. BannerAPI.DEFAULT_BANNER
    status: {
        isFetching: false,
        didInvalidate: false,
        lastUpdated: null
    }
};

export var BannerReducer = (state = INITIAL_STATE_BANNER, action) => {
    switch (action.type) {
        // NOTE: Not actually used? (Thunk)
        case actions.banner.SUBMIT_BANNER:
            return {
                ...state,
                banner: action.banner
            };
            break;

        case actions.banner.SUBMIT_BANNER_SUCCESS:
            return {
                banner: action.banner,
                status: {
                    isFetching: false,
                    didInvalidate: false,
                    lastUpdated: action.receivedAt
                }
            };
            break;

        case actions.banner.SUBMIT_BANNER_ERROR:
            return Object.assign({}, state, {
                status: {
                    isFetching: false,
                    didInvalidate: false,
                    error: action.error
                }
            });
            break;

        case actions.banner.INVALIDATE_BANNER:
            // Object.assign(<new state to copy into>, <existing state to copy from>, <change to make>);
            return Object.assign({}, state, {
                status: {
                    didInvalidate: true
                }
            });
            break;

        case actions.banner.REQUEST_BANNER:
            return Object.assign({}, state, {
                status: {
                    isFetching: true,
                    didInvalidate: false
                }
            });
            break;

        case actions.banner.RECEIVE_BANNER:
            return Object.assign({}, state, {
                banner: action.banner,
                status: {
                    isFetching: false,
                    didInvalidate: false,
                    lastUpdated: action.receivedAt
                }
            });
            break;

        case actions.banner.REMOVE_BANNER_SUCCESS:
            return {
                banner: null,
                status: {
                    isFetching: false,
                    didInvalidate: false,
                    lastUpdated: null
                }
            };
            break;

        case actions.banner.REMOVE_BANNER_ERROR:
            return Object.assign({}, state, {
                status: {
                    isFetching: false,
                    didInvalidate: false,
                    error: action.error
                }
            });
            break;

        default:
            return state;
            break;
    }
};
