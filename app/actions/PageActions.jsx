// Actions supporting single page content editing, (e.g. ticket sales page)

import * as PagesAPI from 'PagesAPI';

// --- ALL PAGES ---

export const INVALIDATE_PAGES = 'INVALIDATE_PAGES'

export const REQUEST_PAGES = 'REQUEST_PAGES'
export const RECEIVE_PAGES = 'RECEIVE_PAGES'

// So we reload the state.pages objects if we dispatch fetchPageIfNeeded() again
export function invalidatePages() {
    return {
        type: INVALIDATE_PAGES
    }
}

// (4) We are getting the list of page contents
function requestPages() {
    return {
        type: REQUEST_PAGES
    }
}

// (5) We got the page contents back.
function receivePages(pages) {
    return {
        type: RECEIVE_PAGES,
        pages,
        receivedAt: Date.now()
    };
}

// (3) Triggers the download of pages content
function fetchPages() {
    return dispatch => {
        dispatch(requestPages())
        return PagesAPI.getPages()
            .then(response => dispatch(receivePages(response)))
    };
}

// (2) Checks if it would be necessary to download pages, or if the cache is valid
function shouldFetchPages(state) {
    const {pages, status} = state.pages;
    if (!pages) {
        return true;
    } else if (status.isFetching) {
        return false;
    } else {
        return status.didInvalidate;
    }
}

// (1) Starts the chain of events to load in the page content for all pages, if it is not already valid in the cache
export function fetchPagesIfNeeded() {
    // Note that the function also receives getState()
    // which lets you choose what to dispatch next.

    // This is useful for avoiding a network request if
    // a cached value is already available.

    return (dispatch, getState) => {
        if (shouldFetchPages(getState())) {
            // Dispatch a thunk from thunk!
            return dispatch(fetchPages())
        } else {
            // Let the calling code know there's nothing to wait for.
            return Promise.resolve()
        }
    }
}


// --- INDIVIDUAL PAGE CONTENT ---

export const RECEIVE_PAGE = 'RECEIVE_PAGE'

// (4) We got the page back
function receivePage(page) {
    return {
        type: RECEIVE_PAGE,
        page,
        receivedAt: Date.now()
    };
}

// (3) Triggers the download of page content
function fetchPage(pages, pageId) {
    return dispatch => {
        var content = PagesAPI.getPage(pageId, pages)
        dispatch(receivePage(content));
    };
}

// (2) Checks if it would be necessary to download page, or if the cache is valid
function shouldFetchPage(state, pageId) {
    const {status, page} = state.pages;
    if (!page) {
        return true;
    } else if (status.isFetching) {
        return false;
    } else if (page.id != pageId) {
        return true;
    } else {
        return status.didInvalidate;
    }
}

// (1) Starts the chain of events to load in a single page, if not already cached
export function fetchPageIfNeeded(pageId) {
    return (dispatch, getState) => {
        if (shouldFetchPage(getState(), pageId)) {
            // Dispatch a thunk from thunk!
            var state = getState();
            var pages = state.pages.pages;
            return dispatch(fetchPage(pages, pageId));
        } else {
            // Let the calling code know there's nothing to wait for.
            return Promise.resolve();
        }
    }
}


// --- ADDING & EDITING A PAGE ---

export const SUBMIT_PAGE_SUCCESS = 'SUBMIT_PAGE_SUCCESS';

export var submitPageSuccess = (page, receivedAt) => {
    return {
        type: SUBMIT_PAGE_SUCCESS,
        page,
        receivedAt
    };
}

export const SUBMIT_PAGE_ERROR = 'SUBMIT_PAGE_ERROR';

export var submitPageError = (page, error) => {
    return {
        type: SUBMIT_PAGE_ERROR,
        page,
        error
    };
}

export const SUBMIT_PAGE = 'SUBMIT_PAGE';

export var submitPage = (page, token) => {
    return (dispatch, getState) => {
        PagesAPI.addPage(page, token).then((newPage) => {
            if (newPage === {})
                dispatch(submitPageError(page, "Page not saved."));
            else
                dispatch(submitPageSuccess(newPage,
                                           page.updatedAt ? page.updatedAt : page.createdAt));
        });
    };
}


// --- REMOVING A PAGE ---

export const REMOVE_PAGE_SUCCESS = 'REMOVE_PAGE_SUCCESS';

export var removePageSuccess = (pageId) => {
    return {
        type: REMOVE_PAGE_SUCCESS,
        pageId
    };
}

export const REMOVE_PAGE_ERROR = 'REMOVE_PAGE_ERROR';

export var removePageError = (pageId, error) => {
    return {
        type: REMOVE_PAGE_ERROR,
        pageId,
        error
    };
}

export const REMOVE_PAGE = 'REMOVE_PAGE';

export var removePage = (pageId, token) => {
    return (dispatch, getState) => {
        PagesAPI.removePage(pageId, token).then((res) => {
            if (res === {})
                dispatch(removePageError(res, "Page not removed."));
            else
                dispatch(removePageSuccess(res));
        });
    };
}
