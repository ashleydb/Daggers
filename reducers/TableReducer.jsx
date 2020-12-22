import {actions} from '../actions/actions';

export const INITIAL_STATE_TABLE = {
    table: null,     // Table object, e.g. TableAPI.DEFAULT_TABLE
    status: {
        isFetching: false,
        didInvalidate: false,
        lastUpdated: null
    }
};

export var TableReducer = (state = INITIAL_STATE_TABLE, action) => {
    switch (action.type) {
        case actions.table.INVALIDATE_TABLE:
            // Object.assign(<new state to copy into>, <existing state to copy from>, <change to make>);
            return Object.assign({}, state, {
                status: {
                    didInvalidate: true
                }
            });
            break;

        case actions.table.REQUEST_TABLE:
            return Object.assign({}, state, {
                status: {
                    isFetching: true,
                    didInvalidate: false
                }
            });
            break;

        case actions.table.RECEIVE_TABLE:
            return Object.assign({}, state, {
                table: action.table,
                status: {
                    isFetching: false,
                    didInvalidate: false,
                    lastUpdated: action.receivedAt
                }
            });
            break;

        default:
            return state;
            break;
    }
};
