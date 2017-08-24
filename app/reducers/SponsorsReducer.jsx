import {actions} from 'actions';

export const INITIAL_STATE_SPONSORS = {
    sponsors: null, // Array of sponsor objects
    sponsor: null,  // Sponsor object, e.g. SponsorsAPI.DEFAULT_SPONSOR
    status: {
        isFetching: false,
        didInvalidate: false,
        lastUpdated: null
    }
};

export var SponsorsReducer = (state = INITIAL_STATE_SPONSORS, action) => {
    switch (action.type) {
        case actions.sponsors.SUBMIT_SPONSOR:
            return {
                ...state,
                sponsor: action.sponsor
            };
            break;

        case actions.sponsors.SUBMIT_SPONSOR_SUCCESS:
            var newSponsor = true;
            var sponsors = state.sponsors.map((sponsor) => {
                if (sponsor.id == action.sponsor.id) {
                    newSponsor = false;
                    return action.sponsor;
                } else {
                    return sponsor;
                }
            });
            if (newSponsor) {
                sponsors = [...sponsors, action.sponsor];
            }

            return {
                ...state,
                sponsors,
                status: {
                    isFetching: false,
                    didInvalidate: false,
                    lastUpdated: action.receivedAt
                },
                sponsor: null
            };
            break;

        case actions.sponsors.SUBMIT_SPONSOR_ERROR:
            return Object.assign({}, state, {
                status: {
                    isFetching: false,
                    didInvalidate: false,
                    error: action.error
                }
            });
            break;


        case actions.sponsors.ADD_SPONSORS:
            return {
                ...state,
                sponsors: [...state.sponsors, ...action.sponsors]
            };
            break;

        case actions.sponsors.INVALIDATE_SPONSORS:
            // Object.assign(<new state to copy into>, <existing state to copy from>, <change to make>);
            return Object.assign({}, state, {
                status: {
                    didInvalidate: true
                }
            });
            break;

        case actions.sponsors.REQUEST_SPONSOR_LIST:
            return Object.assign({}, state, {
                status: {
                    isFetching: true,
                    didInvalidate: false
                }
            });
            break;

        case actions.sponsors.RECEIVE_SPONSOR_LIST:
            return Object.assign({}, state, {
                status: {
                    isFetching: false,
                    didInvalidate: false,
                    lastUpdated: action.receivedAt
                },
                sponsors: action.sponsors
            });
            break;

        case actions.sponsors.RECEIVE_SPONSOR:
            return Object.assign({}, state, {
                sponsor: action.sponsor
            });
            break;

        // NOTE: Not actually used? (Thunk)
        case actions.sponsors.REMOVE_SPONSOR:
            return {
                ...state,
                sponsor: {id: action.sponsorId}
            };
            break;

        case actions.sponsors.REMOVE_SPONSOR_SUCCESS:
            var sponsors = state.sponsors.filter((sponsor) => {
                if (sponsor.id != action.sponsorId) {
                    return sponsor;
                }
            });

            return {
                ...state,
                sponsors,
                status: {
                    isFetching: false,
                    didInvalidate: false,
                    lastUpdated: action.receivedAt  // TODO: Not actually being set, (likely true elsewhere too)
                },
                sponsor: null
            };
            break;

        case actions.sponsors.REMOVE_SPONSOR_ERROR:
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
