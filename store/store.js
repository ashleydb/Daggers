import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import thunkMiddleware from 'redux-thunk'
import * as Reducers from '../reducers/reducers';

const INITIAL_STATE = {
    news: Reducers.INITIAL_STATE_NEWS,
    fixtures: Reducers.INITIAL_STATE_FIXTURES,
    login: Reducers.INITIAL_STATE_LOGIN,
    pages: Reducers.INITIAL_STATE_PAGES,
    players: Reducers.INITIAL_STATE_PLAYERS,
    banner: Reducers.INITIAL_STATE_BANNER,
    table: Reducers.INITIAL_STATE_TABLE,
    sponsors: Reducers.INITIAL_STATE_SPONSORS
};

const combinedReducer = combineReducers({
    // <state property>: <designated reducer>
    //swal: Reducers.SweetAlertReducer,
    news: Reducers.NewsReducer,
    fixtures: Reducers.FixturesReducer,
    login: Reducers.LoginReducer,
    pages: Reducers.PagesReducer,
    players: Reducers.PlayersReducer,
    banner: Reducers.BannerReducer,
    table: Reducers.TableReducer,
    sponsors: Reducers.SponsorsReducer
})

const reducer = (state, action) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state, // use previous state
            ...action.payload, // apply delta from hydration
        }
        //if (state.count.count) nextState.count.count = state.count.count // preserve count value on client side navigation
        return nextState
    } else {
        return combinedReducer(state, action)
    }
}

const bindMiddleware = (middleware) => {
    if (process.env.NODE_ENV !== 'production') {
        const { composeWithDevTools } = require('redux-devtools-extension')
        return composeWithDevTools(applyMiddleware(...middleware))
    }
    return applyMiddleware(...middleware)
}

const initStore = (initialState = INITIAL_STATE) => {
    return createStore(reducer, initialState, bindMiddleware([thunkMiddleware]))
}

export const wrapper = createWrapper(initStore, { debug: true })
