import {actions} from 'actions';

// For sorting arrays efficiently
var Sorter = require('app/Sorter.js');

export var INITIAL_STATE_NEWS = {
    news: null,     // Array of news story objects
    story: null,    // News story object, e.g. NewsAPI.DEFAULT_STORY
    pageOfNews: 0,  // When paging through lists of news stories, which page are we on?
    status: {
        isFetching: false,
        didInvalidate: false,
        lastUpdated: null
        //year: undefined,  // Would be null for ALL, or a number like 2017
        //month: undefined  // Would be null for ALL in the year, or a number 1-12
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
                    didInvalidate: true,
                    year: undefined,
                    month: undefined
                }
            });
            break;

        case actions.news.REQUEST_NEWS_STORIES:
            return Object.assign({}, state, {
                status: {
                    isFetching: true,
                    didInvalidate: false,
                    year: action.year,
                    month: action.month
                }
            });
            break;

        case actions.news.RECEIVE_NEWS_STORIES:
            // TODO: Trying to think ahead here by adding news to the state, rather than just fully replacing it.
            //  Could cause duplicates, paging back and forth or downloading all news when I had already had content in the state?
            var allNews = action.stories;
            //if (state.news)
            //    allNews = [...action.stories, ...state.news];

            // Sort stories by date, newest first, (note we included Sorter above.)
            allNews.sortBy(function(o){ return new Date( -o.createdAt ) });

            return Object.assign({}, state, {
                status: {
                    isFetching: false,
                    didInvalidate: false,
                    lastUpdated: action.receivedAt,
                    year: action.year,
                    month: action.month
                },
                news: allNews,
                pageOfNews: 0
            });
            break;

        case actions.news.REQUEST_NEWS_STORY:
            return Object.assign({}, state, {
                status: {
                    isFetching: true,
                    didInvalidate: false,
                    id: action.newsId
                }
            });
            break;

        case actions.news.RECEIVE_NEWS_STORY:
            return Object.assign({}, state, {
                ...state,
                status: {
                    isFetching: false,
                    didInvalidate: false,
                    lastUpdated: action.receivedAt
                },
                story: action.story
            });
            break;

        case actions.news.CHANGE_PAGE:
            return {
                ...state,
                pageOfNews: action.pageNum
            };
            break;

        // NOTE: Not actually used? (Thunk)
        case actions.news.REMOVE_STORY:
            return {
                ...state,
                story: {id: action.newsId}
            };
            break;

        case actions.news.REMOVE_STORY_SUCCESS:
            var news = state.news.filter((story) => {
                if (story.id != action.newsId) {
                    return story;
                }
            });

            return {
                ...state,
                news,
                status: {
                    isFetching: false,
                    didInvalidate: false,
                    lastUpdated: action.receivedAt  // TODO: Not actually being set, (likely true elsewhere too)
                },
                story: null
            };
            break;

        case actions.news.REMOVE_STORY_ERROR:
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
