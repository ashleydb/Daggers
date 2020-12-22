// Actions supporting getting table data

import * as TableAPI from '../api/TableAPI';

// --- GET TABLE ---

export const INVALIDATE_TABLE = 'INVALIDATE_TABLE'

export const REQUEST_TABLE = 'REQUEST_TABLE'
export const RECEIVE_TABLE = 'RECEIVE_TABLE'

// So we reload the state.table objects if we dispatch fetchTableIfNeeded() again
export function invalidateTable() {
    return {
        type: INVALIDATE_TABLE
    }
}

// (4) We are getting the list of table contents
function requestTable() {
    return {
        type: REQUEST_TABLE
    }
}

// (5) We got the table contents back.
function receiveTable(table) {
    return {
        type: RECEIVE_TABLE,
        table,
        receivedAt: Date.now()
    };
}

// (3) Triggers the download of table content
function fetchTable() {
    return dispatch => {
        dispatch(requestTable())
        return TableAPI.getTable()
            .then(response => dispatch(receiveTable(response)))
    };
}

// (2) Checks if it would be necessary to download table, or if the cache is valid
function shouldFetchTable(state) {
    const {table, status} = state.table;
    if (!table) {
        return true;
    } else if (status.isFetching) {
        return false;
    } else {
        return status.didInvalidate;
    }
}

// (1) Starts the chain of events to load in the table content for all table, if it is not already valid in the cache
export function fetchTableIfNeeded() {
    // Note that the function also receives getState()
    // which lets you choose what to dispatch next.

    // This is useful for avoiding a network request if
    // a cached value is already available.

    return (dispatch, getState) => {
        if (shouldFetchTable(getState())) {
            // Dispatch a thunk from thunk!
            return dispatch(fetchTable())
        } else {
            // Let the calling code know there's nothing to wait for.
            return Promise.resolve()
        }
    }
}
