export default function pinsReducer(state = [], action) {
	switch (action.type) {
		case "ADD_PIN":
			return addPin(state, action)
		case "DELETE_PIN":
			return deletePin(state, action)
		default:
			return state
	}
}

function addPin(state, action) {
	const {
		payload: { name, price, x, y },
	} = action
	return [...state, { id: state.length + 1, name, price, x, y }]
}

function deletePin(state, action) {
	return [...state].filter(({ id }) => action.payload.id !== id)
}
