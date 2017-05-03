import {actions} from 'actions';

// For sorting arrays efficiently
var Sorter = require('app/Sorter.js');

export var INITIAL_STATE_NEWS = {
    news: null,     // Array of news story objects
    story: null,    // News story object, e.g. NewsAPI.DEFAULT_STORY
    status: {
        isFetching: false,
        didInvalidate: false,
        lastUpdated: null
    }
};

export var NewsReducer = (state = INITIAL_STATE_NEWS, action) => {
    switch (action.type) {
        case actions.news.SUBMIT_STORY:
            return {
                ...state,
                story: action.story
            };
            break;

        case actions.news.SUBMIT_STORY_SUCCESS:
            var newStory = true;
            var news = state.news.map((story) => {
                if (story.id == action.story.id) {
                    newStory = false;
                    return action.story;
                } else {
                    return story;
                }
            });
            if (newStory) {
                news = [action.story, ...news];
            }

            return {
                ...state,
                news,
                status: {
                    isFetching: false,
                    didInvalidate: false,
                    lastUpdated: action.receivedAt
                },
                story: null
            };
            break;

        case actions.news.SUBMIT_STORY_ERROR:
            return Object.assign({}, state, {
                status: {
                    isFetching: false,
                    didInvalidate: false,
                    error: action.error
                }
            });
            break;

        case actions.news.INVALIDATE_NEWS:
            // Object.assign(<new state to copy into>, <existing state to copy from>, <change to make>);
            return Object.assign({}, state, {
                status: {
                    didInvalidate: true
                }
            });
            break;

        case actions.news.REQUEST_NEWS_STORIES:
            return Object.assign({}, state, {
                status: {
                    isFetching: true,
                    didInvalidate: false
                }
            });
            break;

        case actions.news.RECEIVE_NEWS_STORIES:
            // TODO: Trying to think ahead here by adding news to the state, rather than just fully replacing it.
            //  Could cause duplicates, paging back and forth or downloading all news when I had already had content in the state?
            var allNews = action.stories;
            //if (state.news)
            //    allNews = [...action.stories, ...state.news];

            // Sort stories by date, (note we included Sorter above.)
            // TODO: How do I reverse this so newest is first? This is oldest first.
            allNews.sortBy(function(o){ return new Date( o.date ) });

            return Object.assign({}, state, {
                status: {
                    isFetching: false,
                    didInvalidate: false,
                    lastUpdated: action.receivedAt
                },
                news: allNews
            });
            break;

        case actions.news.RECEIVE_NEWS_STORY:
            return Object.assign({}, state, {
                story: action.story
            });
            break;

        default:
            return state;
            break;
    }
};
