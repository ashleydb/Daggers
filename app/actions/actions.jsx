/*
export var setSearchText = (searchText) => {
  return {
    type: 'SET_SEARCH_TEXT',
    searchText //ES6 for setting "searchText: searchText"
  };
}

export var addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    text
  };
}

export var addTodos = (todos) => {
    return {
        type: 'ADD_TODOS',
        todos
    };
}

export var toggleShowCompleted = () => {
  return {
    type: 'TOGGLE_SHOW_COMPLETED'
  };
}

export var toggleTodo = (id) => {
  return {
    type: 'TOGGLE_TODO',
    id
  };
}
*/




export const ADD_STORY      = 'ADD_STORY';
export const ADD_STORIES    = 'ADD_STORIES';
export const SHOW_STORY     = 'SHOW_STORY';
export const EDIT_STORY     = 'EDIT_STORY';

export var addStory = (story) => {
  return {
    type: ADD_STORY,
    story
  };
}

export var addStories = (stories) => {
    return {
        type: ADD_STORIES,
        stories
    };
}

export var showStory = (story) => {
  return {
    type: SHOW_STORY,
    story
  };
}

export var editStory = (story) => {
  return {
    type: EDIT_STORY,
    story
  };
}
