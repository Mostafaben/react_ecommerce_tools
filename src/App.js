import React from "react"
import { useDispatch, useSelector } from "react-redux"
import style from "./app.module.css"
import { IMAGES } from "./config/dummy_data"
import { addPinAction, deletePinAction } from "./state/actions/pins_actions"

function App() {
	const items = useSelector((state) => state.pins)
	const dispatch = useDispatch()
	const [isAdding, setIsAdding] = React.useState(false)
	const [isDeleting, setIsDeleting] = React.useState(false)
	const [currentItem, setCurrentItem] = React.useState(null)
	const [IMAGE_WIDTH, SET_IMAGE_WIDTH] = React.useState(null)
	const imageRef = React.useRef(null)

	React.useEffect(() => {
		SET_IMAGE_WIDTH(imageRef.current.clientWidth)
	}, [])

	function addNewItem() {
		setIsAdding(!isAdding)
		setIsDeleting(false)
	}
	function removeItems() {
		setIsDeleting(!isDeleting)
		setIsAdding(false)
	}

	function clickOnImage(e) {
		if (!isAdding) return
		const {
			target: { clientWidth, clientHeight },
			nativeEvent: { offsetX, offsetY },
		} = e
		setCurrentItem({
			x: (offsetX * 100) / clientWidth,
			y: (offsetY * 100) / clientHeight,
		})
	}

	function updateItems(newItem) {
		setCurrentItem(null)
		dispatch(addPinAction(newItem))
		setIsAdding(false)
	}

	function cancelAddItem() {
		setIsAdding(false)
		setCurrentItem(null)
	}

	function removeItem(index) {
		if (!isDeleting) return
		dispatch(deletePinAction(items[index].id))
	}

	function listItems() {
		return items.map((item, index) => (
			<Pin
				key={index}
				position={{
					x: (IMAGE_WIDTH * item.x) / 100,
					y: (IMAGE_WIDTH * item.y) / 100,
				}}
				name={item.name}
				onClick={() => removeItem(index)}
			/>
		))
	}

	return (
		<div
			className={style.mainContainer}
			style={{ cursor: isAdding ? "crosshair" : "unset" }}
		>
			<div className={style.actions}>
				<button
					className={style.addButton}
					style={{ backgroundColor: "blue", color: "white" }}
					onClick={addNewItem}
				>
					{isAdding ? "Done" : "Add new Item"}
				</button>
				<button
					className={style.addButton}
					onClick={removeItems}
					style={{ backgroundColor: "red", color: "white" }}
				>
					{isDeleting ? "Done" : "Remove Items"}
				</button>
			</div>

			<div className={style.imageWrapper}>
				{listItems()}
				<img
					ref={imageRef}
					src={IMAGES[0]}
					alt="image_1"
					className={style.image}
					onClick={clickOnImage}
				/>
			</div>
			<Dialog
				item={currentItem}
				onCancel={cancelAddItem}
				onConfirm={updateItems}
			/>
		</div>
	)
}

function Pin({ position: { x, y }, onClick, name }) {
	return (
		<div
			style={{
				left: x,
				top: y,
			}}
			className={style.pin}
			onClick={onClick}
		>
			{name}
			<span>1000$</span>
		</div>
	)
}

function Dialog({ item, onConfirm, onCancel }) {
	const inputRef = React.useRef(null)
	const containerRef = React.useRef(null)

	function clickOnWrapper(e) {
		if (e.target === containerRef.current) onCancel()
	}

	return !item ? null : (
		<div
			className={style.dialogContainer}
			ref={containerRef}
			onClick={clickOnWrapper}
		>
			<div className={style.dialog}>
				<h3>add new Item</h3>
				<input placeholder="name" ref={inputRef} />
				<div className={style.actions}>
					<button className={style.cancel} onClick={onCancel}>
						Cancel
					</button>
					<button
						className={style.confirm}
						onClick={() =>
							inputRef.current.value.length > 0
								? onConfirm({ ...item, name: inputRef.current.value })
								: null
						}
					>
						Confirm
					</button>
				</div>
			</div>
		</div>
	)
}

export default App
