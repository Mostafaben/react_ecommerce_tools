import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import style from "./app.module.css"
import "./index.css"
import ReduxApp from "./redux"
import reportWebVitals from "./reportWebVitals"
import store from "./state/store"

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<div className={style.mainContainer}>
				<ReduxApp />
			</div>
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
)

reportWebVitals()
