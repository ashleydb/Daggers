import {actions} from 'actions';

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
                news = [...news, action.story];
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


        case actions.news.ADD_STORIES:
            return {
                ...state,
                news: [...state.news, ...action.stories]
            };
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
            return Object.assign({}, state, {
                status: {
                    isFetching: false,
                    didInvalidate: false,
                    lastUpdated: action.receivedAt
                },
                news: action.stories
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
