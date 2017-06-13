var redux = require('redux');
var thunk = require('redux-thunk').default;
import * as Reducers from 'reducers';

const INITIAL_STATE = {
    news: Reducers.INITIAL_STATE_NEWS,
    fixtures: Reducers.INITIAL_STATE_FIXTURES,
    login: Reducers.INITIAL_STATE_LOGIN,
    pages: Reducers.INITIAL_STATE_PAGES,
    players: Reducers.INITIAL_STATE_PLAYERS,
    banner: Reducers.INITIAL_STATE_BANNER,
    table: Reducers.INITIAL_STATE_TABLE
};

export var configure = (initialState = INITIAL_STATE) => {
    var reducer = redux.combineReducers({
        // <state property>: <designated reducer>
        swal: Reducers.SweetAlertReducer,
        news: Reducers.NewsReducer,
        fixtures: Reducers.FixturesReducer,
        login: Reducers.LoginReducer,
        pages: Reducers.PagesReducer,
        players: Reducers.PlayersReducer,
        banner: Reducers.BannerReducer,
        table: Reducers.TableReducer
    });
    
    var store = redux.createStore(reducer, initialState, redux.compose(
        redux.applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    ));
    
    return store;
};
