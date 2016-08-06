import { combineReducers } from "redux";

const number = (state=0, action) => state + 1;

export default combineReducers({
    number,
});
