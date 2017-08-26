// Helper for importing all reducers
export var {NewsReducer, INITIAL_STATE_NEWS} = require('app/reducers/NewsReducer');
export var {FixturesReducer, INITIAL_STATE_FIXTURES} = require('app/reducers/FixturesReducer');
export var {LoginReducer, INITIAL_STATE_LOGIN} = require('app/reducers/LoginReducer');
export var {PagesReducer, INITIAL_STATE_PAGES} = require('app/reducers/PagesReducer');
export var {PlayersReducer, INITIAL_STATE_PLAYERS} = require('app/reducers/PlayersReducer');
export var {BannerReducer, INITIAL_STATE_BANNER} = require('app/reducers/BannerReducer');
export var {TableReducer, INITIAL_STATE_TABLE} = require('app/reducers/TableReducer');
export var {SponsorsReducer, INITIAL_STATE_SPONSORS} = require('app/reducers/SponsorsReducer');

// For Sweet Alert
import { reducers } from 'react-redux-sweetalert2';
export var SweetAlertReducer = reducers;
