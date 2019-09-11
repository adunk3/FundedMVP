import { SET_CURRENT_USER, LOGOUT_USER } from '../constants';
import setAuthToken from "../utils/setAuthToken";
const isEmpty = require("is-empty");

const initialState = {
    currentUser: {},
    isAuthenticated: false,
}


const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload,
                isAuthenticated: !isEmpty(action.payload),
            };
        case LOGOUT_USER:
            localStorage.removeItem("jwtToken");
            setAuthToken(false);
            return {
                currentUser: {},
            }
        default:
            return state;
    }
}

export default rootReducer;