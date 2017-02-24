//var UUID = require('uuid');
//var moment = require('moment');
/*
export var searchTextReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_SEARCH_TEXT':
      return action.searchText;
      break;
    default:
      return state;
      break;
  }
};

export var showCompletedtReducer = (state = false, action) => {
  switch (action.type) {
    case 'TOGGLE_SHOW_COMPLETED':
      return !state;
      break;
    default:
      return state;
      break;
  }
};

export var todosReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                {id: UUID(), text: action.text, createdAt: moment().unix(),
                 completedAt: undefined, complete: false}
                ];
            break;
        case 'ADD_TODOS':
            return [
                ...state,
                ...action.todos
                ];
            break;
        case 'TOGGLE_TODO':
            return state.map((todo) => {
                if (action.id === todo.id) {
                    // Can't edit the state, (and therefore this todo,) so need to make a new object
                    return {
                        ...todo,
                        complete: !todo.complete,
                        completedAt: !todo.complete ? moment().unix() : undefined
                    }
                }
                return todo;
            });
            break;
        default:
            return state;
            break;
    }
};
*/


import {ADD_STORY, ADD_STORIES, EDIT_STORY, 
REQUEST_NEWS_STORIES,
RECEIVE_NEWS_STORIES,
REQUEST_NEWS_STORY,
RECEIVE_NEWS_STORY,
SUBMIT_STORY, SUBMIT_STORY_SUCCESS, SUBMIT_STORY_ERROR,
INVALIDATE_NEWS} from "actions";



import * as NewsAPI from 'NewsAPI';

const INITIAL_STATE = { news: [],
						story: NewsAPI.DEFAULT_STORY
};

export var newsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SUBMIT_STORY:
            return {
                ...state,
                story: action.story
            };
            break;
            
        case SUBMIT_STORY_SUCCESS:
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
                story: NewsAPI.DEFAULT_STORY
            };
            break;
            
        case SUBMIT_STORY_ERROR:
             return Object.assign({}, state, {
                  status: {
                      isFetching: false,
                      didInvalidate: false,
                      error: action.error
                  }
              });
            break;
            

        case ADD_STORIES:
            return {
                ...state,
                news: [...state.news, ...action.stories]
            };
            break;
            
//        case SHOW_STORY:
//            return {
//                ...
//                action.story
//            };
//            break;
            
//        case EDIT_STORY:
//            return {
//                ...
//                action.story
//            };
//            break;
            
//  case SELECT_NEWS_STORY:
//    return Object.assign({}, state, {
//          story: {id: action.newsId}
//      });
//    break;
    
    case INVALIDATE_NEWS:
      // Object.assign(<new state to copy into>, <existing state to copy from>, <change to make>);
      return Object.assign({}, state, {
          status: {
            didInvalidate: true
          }
      });
    break;
      
    case REQUEST_NEWS_STORIES:
      return Object.assign({}, state, {
          status: {
            isFetching: true,
            didInvalidate: false
          }
      });
      break;
      
    case RECEIVE_NEWS_STORIES:
      return Object.assign({}, state, {
          status: {
              isFetching: false,
              didInvalidate: false,
              lastUpdated: action.receivedAt
          },
          news: action.stories
      });
      break;
      
//    case REQUEST_NEWS_STORY:
//      return Object.assign({}, state, {
//          status: {
//            isFetching: true,
//            didInvalidate: false
//          }
//      });
      
    case RECEIVE_NEWS_STORY:
      return Object.assign({}, state, {
//          status: {
//              isFetching: false,
//              didInvalidate: false,
//              lastUpdated: action.receivedAt
//          },
          story: action.story
      });
      break;
      
        default:
            return state;
            break;
    }
};
