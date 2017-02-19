var UUID = require('node-uuid');
var moment = require('moment');
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

import {ADD_STORY, ADD_STORIES, SHOW_STORY, EDIT_STORY} from "actions";

import {DEFAULT_STORY} from "NewsAPI";

const INITIAL_STATE = { news: [],
						story: DEFAULT_STORY
};

export var newsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_STORY:
            return {
                ...state,
                news: [...state.news,
                    {
                        ...action.story,
                        id: UUID(),
                        created: moment().unix(),
//                        headline: action.story.headline,
//                        image: action.story.image,
//                        summary: action.story.summary,
//                        story: action.story.story
                    }
                ],
                story: DEFAULT_STORY
            };
            break;
            
        case ADD_STORIES:
            return {
                ...state,
                news: [...state.news, ...action.stories]
            };
            break;
            
        case SHOW_STORY:
            return {
                ...
                action.story
            };
            break;
            
        case EDIT_STORY:
            return {
                ...
                action.story
            };
            break;
            
        default:
            return state;
            break;
    }
};
