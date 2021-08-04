export default function loginDialogReducer(state = true, action) {
	switch (action.type) {
		case "HIDE_DIALOG":
			return false
		case "SHOW_DIALOG":
			return true
		default:
			return state
	}
}
