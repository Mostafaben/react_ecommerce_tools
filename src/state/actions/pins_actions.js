export function addPinAction({ name, price, x, y }) {
	return {
		type: "ADD_PIN",
		payload: {
			name,
			price,
			x,
			y,
		},
	}
}

export function deletePinAction(id) {
	return {
		type: "DELETE_PIN",
		payload: {
			id,
		},
	}
}
