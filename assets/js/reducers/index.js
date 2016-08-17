import { combineReducers } from "redux";
import leaders from "./leaders.js";
import isDialogVisible from "./isDialogVisible.js";

export default combineReducers({
    leaders,
    isDialogVisible,
});
