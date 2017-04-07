var redux = require('redux');
var thunk = require('redux-thunk').default;
var {NewsReducer, FixturesReducer, LoginReducer} = require('reducers');

const INITIAL_STATE = {
    news: {
        news: null,
        story: null,
        status: {
            isFetching: false,
            didInvalidate: false,
            lastUpdated: null
        }
    },
    fixtures: {
        fixtures: null,
        fixture: null,
        status: {
            isFetching: false,
            didInvalidate: false,
            lastUpdated: null
        }
    },
    login: {
        token: null,
        expires: null,
        user: null, // {name, role, username}
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
        news: NewsReducer,
        //story: newsReducer  // TODO: Break news and story up?
        fixtures: FixturesReducer,
        login: LoginReducer
    });
    
    var store = redux.createStore(reducer, initialState, redux.compose(
        redux.applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    ));
    
    return store;
};
