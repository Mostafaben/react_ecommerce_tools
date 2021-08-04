import { combineReducers } from "redux"
import counterReducer from "./counter_reducer"
import loginDialogReducer from "./login_dialog_reducer"
import pinsReducer from "./pins_reducer"

const reducers = combineReducers({
	counter: counterReducer,
	pins: pinsReducer,
	loginDialog: loginDialogReducer,
})

export default reducers
