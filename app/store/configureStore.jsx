var redux = require('redux');
var thunk = require('redux-thunk').default;
var {newsReducer} = require('reducers');

const INITIAL_STATE = {
    news: {
        news: null,
        story: null,
        status: {
            isFetching: false,
            didInvalidate: false,
            lastUpdated: null
        }
    }
};

export var configure = (initialState = INITIAL_STATE) => {
    var reducer = redux.combineReducers({
        // <state property>: <designated reducer>
        news: newsReducer
        //story: newsReducer  // TODO: Break news and story up?
    });
    
    var store = redux.createStore(reducer, initialState, redux.compose(
        redux.applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    ));
    
    return store;
};
