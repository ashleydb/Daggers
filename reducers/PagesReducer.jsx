import {actions} from '../actions/actions';

export const INITIAL_STATE_PAGES = {
    pages: null,    // Array of page objects
    page: null,     // Page object, e.g. PagesAPI.DEFAULT_PAGE
    status: {
        isFetching: false,
        didInvalidate: false,
        lastUpdated: null
    }
};

export var PagesReducer = (state = INITIAL_STATE_PAGES, action) => {
    switch (action.type) {
        // NOTE: Not actually used? (Thunk)
        case actions.pages.SUBMIT_PAGE:
            return {
                ...state,
                page: action.page
            };
            break;

        case actions.pages.SUBMIT_PAGE_SUCCESS:
            var newPage = true;
            var pages = state.pages.map((page) => {
                if (page.id == action.page.id) {
                    newPage = false;
                    return action.page;
                } else {
                    return page;
                }
            });
            if (newPage) {
                pages = [...pages, action.page];
            }

            return {
                ...state,
                pages,
                status: {
                    isFetching: false,
                    didInvalidate: false,
                    lastUpdated: action.receivedAt
                },
                page: null
            };
            break;

        case actions.pages.SUBMIT_PAGE_ERROR:
            return Object.assign({}, state, {
                status: {
                    isFetching: false,
                    didInvalidate: false,
                    error: action.error
                }
            });
            break;

        case actions.pages.INVALIDATE_PAGES:
            // Object.assign(<new state to copy into>, <existing state to copy from>, <change to make>);
            return Object.assign({}, state, {
                status: {
                    didInvalidate: true
                }
            });
            break;

        case actions.pages.REQUEST_PAGES:
            return Object.assign({}, state, {
                status: {
                    isFetching: true,
                    didInvalidate: false
                }
            });
            break;

        case actions.pages.RECEIVE_PAGES:
            return Object.assign({}, state, {
                status: {
                    isFetching: false,
                    didInvalidate: false,
                    lastUpdated: action.receivedAt
                },
                pages: action.pages
            });
            break;

        case actions.pages.RECEIVE_PAGE:
            return Object.assign({}, state, {
                page: action.page
            });
            break;

        // NOTE: Not actually used? (Thunk)
        case actions.pages.REMOVE_PAGE:
            return {
                ...state,
                page: {id: action.pageId}
            };
            break;

        case actions.pages.REMOVE_PAGE_SUCCESS:
            var pages = state.pages.filter((page) => {
                if (page.id != action.pageId) {
                    return page;
                }
            });

            return {
                ...state,
                pages,
                status: {
                    isFetching: false,
                    didInvalidate: false,
                    lastUpdated: action.receivedAt  // TODO: Not actually being set, (likely true elsewhere too)
                },
                page: null
            };
            break;

        case actions.pages.REMOVE_PAGE_ERROR:
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
