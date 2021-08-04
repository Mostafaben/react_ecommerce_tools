import { useDispatch, useSelector } from "react-redux"
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom"
import App from "./App"
import style from "./app.module.css"
import "./index.css"

function ReduxImplementation() {
	const counter = useSelector((state) => state.counter)
	const dispatch = useDispatch()

	function increment() {
		dispatch({ type: "INCREMENT" })
	}
	function decrement() {
		dispatch({ type: "DECREMENT" })
	}

	return (
		<div className={style.pageContainer}>
			<p>Hello World</p>
			<span>{counter}</span>
			<button onClick={increment}>Increment</button>
			<button onClick={decrement}>Decrement</button>
		</div>
	)
}

function LoginDialog() {
	const isShown = useSelector((state) => state.loginDialog)
	const dispatch = useDispatch()
	function hideDialog() {
		dispatch({ type: "HIDE_DIALOG" })
	}

	return isShown ? (
		<div className={style.loginDialogContainer}>
			<i className="fas fa-times" onClick={hideDialog}></i>
			<h2>Login</h2>
			<input
				className="form-control"
				type="email"
				required
				placeholder="email"
			/>
			<input
				className="form-control"
				type="password"
				required
				placeholder="**************"
			/>
			<button className="btn btn-primary">Login</button>
		</div>
	) : null
}

function ReduxApp() {
	const dispatch = useDispatch()
	function showLoginDialog() {
		dispatch({ type: "SHOW_DIALOG" })
	}

	return (
		<Router>
			<nav>
				<ul>
					<li>
						<Link to="/">Redux</Link>
					</li>
					<li>
						<Link to="/app">Images</Link>
					</li>
				</ul>
				<button
					className="btn btn-primary"
					onClick={showLoginDialog}
					style={{ marginLeft: "auto" }}
				>
					Login
				</button>
			</nav>
			<LoginDialog />
			<Switch>
				<Route path="/" exact>
					<ReduxImplementation />
				</Route>
				<Route path="/app" exact>
					<App />
				</Route>
			</Switch>
		</Router>
	)
}

export default ReduxApp
