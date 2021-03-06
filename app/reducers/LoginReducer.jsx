import {actions} from 'actions';

export const INITIAL_STATE_LOGIN = {
    token: null,
    expires: null,
    user: null, // {name, role, username}
    status: {
        isFetching: false,
        didInvalidate: false,
        lastUpdated: null
    }
};

export var LoginReducer = (state = INITIAL_STATE_LOGIN, action) => {
    switch (action.type) {
        case actions.login.SUBMIT_LOGIN:
            return {
                ...state
            };
            break;

        case actions.login.SUBMIT_LOGIN_SUCCESS:
            return {
                ...state,
                ...action.auth,
                status: {
                    isFetching: false,
                    didInvalidate: false,
                    lastUpdated: action.receivedAt
                }
            };
            break;

        case actions.login.SUBMIT_LOGIN_ERROR:
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
