import React from "react"
import style from "./app.module.css"
import { IMAGES } from "./config/dummy_data"

function App() {
	const [isAdding, setIsAdding] = React.useState(false)
	const [items, setItems] = React.useState([])
	const [isDeleting, setIsDeleting] = React.useState(false)
	const [item, setItem] = React.useState(null)
	const imageRef = React.useRef()

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
		setItem({
			x: (offsetX * 100) / clientWidth,
			y: (offsetY * 100) / clientHeight,
		})
	}

	function updateItems(newItem) {
		setItem(null)
		setItems([newItem, ...items])
		setIsAdding(false)
	}

	function cancelAddItem() {
		setIsAdding(false)
		setItem(null)
	}
	function removeItem(index) {
		if (!isDeleting) return
		setItems([...items].filter((_, i) => index !== i))
	}

	return (
		<div
			className={style.mainContainer}
			style={{ cursor: isAdding ? "crosshair" : "unset" }}
		>
			<div className={style.actions}>
				<button className={style.addButton} onClick={addNewItem}>
					{isAdding ? "Done" : "Add new Item"}
				</button>
				<button className={style.addButton} onClick={removeItems}>
					{isDeleting ? "Done" : "Remove Items"}
				</button>
			</div>

			<div className={style.imageWrapper}>
				{items.map((item, index) => (
					<Pin
						key={index}
						position={{
							x: (imageRef.current.clientWidth * item.x) / 100,
							y: (imageRef.current.clientHeight * item.y) / 100,
						}}
						name={item.name}
						onClick={() => removeItem(index)}
					/>
				))}
				<img
					ref={imageRef}
					src={IMAGES[0]}
					alt="image_1"
					className={style.image}
					onClick={clickOnImage}
				/>
			</div>
			<Dialog item={item} onCancel={cancelAddItem} onConfirm={updateItems} />
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
