
export const ADD_STORY      = 'ADD_STORY';
export const ADD_STORIES    = 'ADD_STORIES';

/*
export var addStory = (story) => {
    return {
        type: ADD_STORY,
        story
    };
}
*/

export var addStories = (stories) => {
    return {
        type: ADD_STORIES,
        stories
    };
}

/*
export const EDIT_STORY     = 'EDIT_STORY';

export var editStory = (story) => {
    return {
        type: EDIT_STORY,
        story
    };
}
*/


/*
export const SHOW_STORY     = 'SHOW_STORY';

export var showStory = (story) => {
  return {
    type: SHOW_STORY,
    story
  };
}
*/

import * as NewsAPI from 'NewsAPI';

export const INVALIDATE_NEWS = 'INVALIDATE_NEWS'

export const REQUEST_NEWS_STORIES = 'REQUEST_NEWS_STORIES'
export const RECEIVE_NEWS_STORIES = 'RECEIVE_NEWS_STORIES'

//export const REQUEST_NEWS_STORY = 'REQUEST_NEWS_STORY'
export const RECEIVE_NEWS_STORY = 'RECEIVE_NEWS_STORY'


// --- NEWS POSTS ---

// So we reload the state.news objects if we dispatch fetchNewsStoriesIfNeeded() again
export function invalidateNews() {
    return {
        type: INVALIDATE_NEWS
    }
}

// (4) We are getting the list of news posts
function requestNewsStories() {
    return {
        type: REQUEST_NEWS_STORIES
    }
}

// (5) We got the news posts back.
function receiveNewsStories(stories) {
    return {
        type: RECEIVE_NEWS_STORIES,
        stories,
        receivedAt: Date.now()
    };
}

// (3) Triggers the download of news stories
function fetchNewsStories() {
    return dispatch => {
        dispatch(requestNewsStories())
        return NewsAPI.getStories()
            .then(response => dispatch(receiveNewsStories(response)))
    };
}

// (2) Checks if it would be necessary to download news, or if the cache is valid
function shouldFetchNewsStories(state) {
    const {news, status} = state.news;
    if (!news) {
        return true;
    } else if (status.isFetching) {
        return false;
    } else {
        return status.didInvalidate;
    }
}

// (1) Starts the chain of events to load in the news posts, if they are not already valid in the cache
export function fetchNewsStoriesIfNeeded() {
    // Note that the function also receives getState()
    // which lets you choose what to dispatch next.

    // This is useful for avoiding a network request if
    // a cached value is already available.

    return (dispatch, getState) => {
        if (shouldFetchNewsStories(getState())) {
            // Dispatch a thunk from thunk!
            return dispatch(fetchNewsStories())
        } else {
            // Let the calling code know there's nothing to wait for.
            return Promise.resolve()
        }
    }
}

// --- INDIVIDUAL NEWS STORY ---

//// (4) We are getting the list of news posts
//function requestNewsStory() {
//    return {
//        type: REQUEST_NEWS_STORY
//    }
//}

// (5) We got the news posts back. If it was empty, preload some default data.
function receiveNewsStory(story) {
    return {
        type: RECEIVE_NEWS_STORY,
        story,
        receivedAt: Date.now()
    };
}
/*
// (3) Triggers the download of news stories
function fetchNewsStory(news, newsId) {
    debugger;
    return dispatch => {
        var story = NewsAPI.getStory(newsId, news);
        if (story) {
            return dispatch(receiveNewsStory(response));
        } else {
            return dispatch(fetchNewsStories());
        }
    };
}
*/
// (3) Triggers the download of news stories
function fetchNewsStory(news, newsId) {
    return dispatch => {
        var story = NewsAPI.getStory(newsId, news)
        dispatch(receiveNewsStory(story));
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

export var submitStorySuccess = (story, recievedAt) => {
    return {
        type: SUBMIT_STORY_SUCCESS,
        story,
        recievedAt
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

export var submitStory = (story) => {
    return (dispatch, getState) => {
        NewsAPI.addStory(story).then((newStory) => {
            if (newStory === {})
                dispatch(submitStoryError(story, "Story not saved."));
            else
                dispatch(submitStorySuccess(newStory,
                                           story.updatedAt ? story.updatedAt : story.createdAt));
        });
    };
}
