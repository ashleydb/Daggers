import {actions} from 'actions';

export const INITIAL_STATE_FIXTURES = {
    fixtures: null, // Array of fixture objects
    fixture: null,  // Fixture object, e.g. FixturesAPI.DEFAULT_FIXTURE
    season: null,   // When paging through fixtures, which season are we on?
    status: {
        isFetching: false,
        didInvalidate: false,
        lastUpdated: null
    }
};

export var FixturesReducer = (state = INITIAL_STATE_FIXTURES, action) => {
    switch (action.type) {
        case actions.fixtures.SUBMIT_FIXTURE:
            return {
                ...state,
                fixture: action.fixture
            };
            break;

        case actions.fixtures.SUBMIT_FIXTURE_SUCCESS:
            var newFixture = true;
            var fixtures = state.fixtures.map((fixture) => {
                if (fixture.id == action.fixture.id) {
                    newFixture = false;
                    return action.fixture;
                } else {
                    return fixture;
                }
            });
            if (newFixture) {
                fixtures = [...fixtures, action.fixture];
            }

            return {
                ...state,
                fixtures,
                status: {
                    isFetching: false,
                    didInvalidate: false,
                    lastUpdated: action.receivedAt
                },
                fixture: null
            };
            break;

        case actions.fixtures.SUBMIT_FIXTURE_ERROR:
            return Object.assign({}, state, {
                status: {
                    isFetching: false,
                    didInvalidate: false,
                    error: action.error
                }
            });
            break;


        case actions.fixtures.ADD_FIXTURES:
            return {
                ...state,
                fixtures: [...state.fixtures, ...action.fixtures]
            };
            break;

        case actions.fixtures.INVALIDATE_FIXTURES:
            // Object.assign(<new state to copy into>, <existing state to copy from>, <change to make>);
            return Object.assign({}, state, {
                status: {
                    didInvalidate: true
                }
            });
            break;

        case actions.fixtures.REQUEST_FIXTURE_LIST:
            return Object.assign({}, state, {
                status: {
                    isFetching: true,
                    didInvalidate: false
                }
            });
            break;

        case actions.fixtures.RECEIVE_FIXTURE_LIST:
            // Fixtures are already sorted, so get the .season from the last one to set the state's .season
            var season = null;
            if (action.fixtures && action.fixtures.length) {
                season = action.fixtures[action.fixtures.length-1].season;
            }

            return Object.assign({}, state, {
                status: {
                    isFetching: false,
                    didInvalidate: false,
                    lastUpdated: action.receivedAt
                },
                fixtures: action.fixtures,
                season
            });
            break;

        case actions.fixtures.RECEIVE_FIXTURE:
            return Object.assign({}, state, {
                fixture: action.fixture
            });
            break;

        case actions.fixtures.SELECT_SEASON:
            return {
                ...state,
                season: action.season
            };
            break;

        // NOTE: Not actually used? (Thunk)
        case actions.fixtures.REMOVE_FIXTURE:
            return {
                ...state,
                fixture: {id: action.fixtureId}
            };
            break;

        case actions.fixtures.REMOVE_FIXTURE_SUCCESS:
            var fixtures = state.fixtures.filter((fixture) => {
                if (fixture.id != action.fixtureId) {
                    return fixture;
                }
            });

            return {
                ...state,
                fixtures,
                status: {
                    isFetching: false,
                    didInvalidate: false,
                    lastUpdated: action.receivedAt  // TODO: Not actually being set, (likely true elsewhere too)
                },
                fixture: null
            };
            break;

        case actions.fixtures.REMOVE_FIXTURE_ERROR:
            return Object.assign({}, state, {
                status: {
                    isFetching: false,
                    didInvalidate: false,
                    error: action.error
                }
            });
            break;

        default:
            return state;
            break;
    }
};
