var redux = require('redux');
var thunk = require('redux-thunk').default;
import * as Reducers from 'reducers';

const INITIAL_STATE = {
    news: Reducers.INITIAL_STATE_NEWS,
    fixtures: Reducers.INITIAL_STATE_FIXTURES,
    login: Reducers.INITIAL_STATE_LOGIN,
    pages: Reducers.INITIAL_STATE_PAGES
};

export var configure = (initialState = INITIAL_STATE) => {
    var reducer = redux.combineReducers({
        // <state property>: <designated reducer>
        news: Reducers.NewsReducer,
        //story: newsReducer  // TODO: Break news and story up?
        fixtures: Reducers.FixturesReducer,
        login: Reducers.LoginReducer,
        pages: Reducers.PagesReducer
    });
    
    var store = redux.createStore(reducer, initialState, redux.compose(
        redux.applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    ));
    
    return store;
};
