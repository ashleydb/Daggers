// Actions supporting News article interaction

import * as NewsAPI from 'NewsAPI';

export const INVALIDATE_NEWS = 'INVALIDATE_NEWS'

export const REQUEST_NEWS_STORIES = 'REQUEST_NEWS_STORIES'
export const RECEIVE_NEWS_STORIES = 'RECEIVE_NEWS_STORIES'
export const REQUEST_NEWS_STORY = 'REQUEST_NEWS_STORY'
export const RECEIVE_NEWS_STORY = 'RECEIVE_NEWS_STORY'


// --- NEWS POSTS ---

// So we reload the state.news objects if we dispatch fetchNewsStoriesIfNeeded() again
export function invalidateNews() {
    return {
        type: INVALIDATE_NEWS
    }
}

// (4) We are getting the list of news posts
function requestNewsStories(year, month, category) {
    return {
        type: REQUEST_NEWS_STORIES,
        year,
        month,
        category
    }
}

// (5) We got the news posts back.
function receiveNewsStories(stories, year, month, category) {
    return {
        type: RECEIVE_NEWS_STORIES,
        stories,
        receivedAt: Date.now(),
        year,
        month,
        category
    };
}

// (3) Triggers the download of news stories
function fetchNewsStories(year, month, category, token) {
    return dispatch => {
        dispatch(requestNewsStories(year, month, category))
        return NewsAPI.getStories(year, month, token)
            .then(response => dispatch(receiveNewsStories(response, year, month, category)),
                       err => dispatch(receiveNewsStories([], year, month, category)))
    };
}

// (2) Checks if it would be necessary to download news, or if the cache is valid
function shouldFetchNewsStories(year, month, state) {
    const {news, status} = state.news;
    if (!news) {
        return true;
    } else if (status.isFetching) {
        return false;
    } else if (year != status.year || month != status.month) {
        // TODO: Not the most intelligent test. We may already have the data and I'm not caching well elsewhere
        return true;
    } else {
        return status.didInvalidate;
    }
}

export const FETCH_LATEST = NewsAPI.FETCH_LATEST;
export const FETCH_RECENT = NewsAPI.FETCH_RECENT;
export const FETCH_ALL = NewsAPI.FETCH_ALL;

// (1) Starts the chain of events to load in the news posts, if they are not already valid in the cache.
// (Optional) year: e.g. 2017, to only get news stories from that year.
//  Pass FETCH_ALL for all news for all years.
//  Pass FETCH_LATEST for all news from most recent year that has news, (usually this year, possibly last year.)
// (Optional) month: e.g. 1 to 12, for a specific month. Must also specify a year.
//  Pass FETCH_LATEST for all news from most recent month in the specified year that has news.
export function fetchNewsStoriesIfNeeded(year = FETCH_ALL, month = FETCH_ALL, category = null, token = null) {
    // Note that the function also receives getState()
    // which lets you choose what to dispatch next.

    // This is useful for avoiding a network request if
    // a cached value is already available.

    return (dispatch, getState) => {
        if (shouldFetchNewsStories(year, month, getState()) || category != null) {
            if (category === '(All)' || category === '(Blank)') {
                category = null;
            }
            // Dispatch a thunk from thunk!
            return dispatch(fetchNewsStories(year, month, category, token))
        } else {
            // Let the calling code know there's nothing to wait for.
            return Promise.resolve()
        }
    }
}


// --- INDIVIDUAL NEWS STORY ---

// (4) We are getting the news post
function requestNewsStory(newsId) {
    return {
        type: REQUEST_NEWS_STORY,
        newsId
    }
}

// (5) We got the news post back (potentially default data).
function receiveNewsStory(story) {
    return {
        type: RECEIVE_NEWS_STORY,
        story,
        receivedAt: Date.now()
    };
}

// (3) Triggers the download of news story
function fetchNewsStory(news, newsId) {
    return dispatch => {
        dispatch(requestNewsStory(newsId))
        return NewsAPI.getStoryRemote(newsId, news)
            .then(response => dispatch(receiveNewsStory(response)),
                       err => dispatch(receiveNewsStory(err)))
    };
}

// (2) Checks if it would be necessary to download news, or if the cache is valid
function shouldFetchNewsStory(state, newsId) {
    const {status, story} = state.news;
    if (!story) {
        return true;
    } else if (status.isFetching) {
        return false;
    } else if (story.id != newsId) {
        return true;
    } else {
        return status.didInvalidate;
    }
}

// (1) Starts the chain of events to load in a single news post, if not already cached
export function fetchNewsStoryIfNeeded(newsId) {
    return (dispatch, getState) => {
        if (shouldFetchNewsStory(getState(), newsId)) {
            // Dispatch a thunk from thunk!
            var state = getState();
            var news = state.news.news;
            return dispatch(fetchNewsStory(news, newsId));
        } else {
            // Let the calling code know there's nothing to wait for.
            return Promise.resolve();
        }
    }
}


// --- ADDING & EDITING STORIES ---

export const SUBMIT_STORY_SUCCESS   = 'SUBMIT_STORY_SUCCESS';

export var submitStorySuccess = (story, receivedAt) => {
    return {
        type: SUBMIT_STORY_SUCCESS,
        story,
        receivedAt
    };
}

export const SUBMIT_STORY_ERROR   = 'SUBMIT_STORY_ERROR';

export var submitStoryError = (story, error) => {
    return {
        type: SUBMIT_STORY_ERROR,
        story,
        error
    };
}

export const SUBMIT_STORY   = 'SUBMIT_STORY';

export var submitStory = (story, token) => {
    return (dispatch, getState) => {
        NewsAPI.addStory(story, token).then((newStory) => {
            if (newStory === {})
                dispatch(submitStoryError(story, "Story not saved. Unknown Error."));
            else
                dispatch(submitStorySuccess(newStory,
                                           story.updatedAt ? story.updatedAt : story.createdAt));
        }).catch((error) => {
            console.log(error);
            dispatch(submitStoryError({}, "Story not saved: " + error));
        });
    };
}

// --- VIEWING HEADLINES ---

export const CHANGE_PAGE   = 'CHANGE_PAGE';

export var pageNews = (pageNum) => {
    return {
        type: CHANGE_PAGE,
        pageNum
    };
}


// --- REMOVING A STORY ---

export const REMOVE_STORY_SUCCESS = 'REMOVE_STORY_SUCCESS';

export var removeStorySuccess = (newsId) => {
    return {
        type: REMOVE_STORY_SUCCESS,
        newsId
    };
}

export const REMOVE_STORY_ERROR = 'REMOVE_STORY_ERROR';

export var removeStoryError = (newsId, error) => {
    return {
        type: REMOVE_STORY_ERROR,
        newsId,
        error
    };
}

export const REMOVE_STORY = 'REMOVE_STORY';

export var removeStory = (story, token) => {
    return (dispatch, getState) => {
        NewsAPI.removeStory(story, token).then((res) => {
            if (res === {})
                dispatch(removeStoryError(res, "Story not removed."));
            else
                dispatch(removeStorySuccess(res));
        });
    };
}
