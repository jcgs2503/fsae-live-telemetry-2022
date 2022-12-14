import React from "react";
import { DataProvider } from "./contexts/DataContext";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import Table from "./screens/Table";
import Dashboard from "./screens/Dashboard";

export default function App() {
	return (
		<Router>
			<DataProvider>
				<Switch>
					<Route path="/" exact>
						<Redirect to="/dashboard" />
					</Route>
					<Route path="/table" exact component={Table} />
					<Route path="/dashboard" exact component={Dashboard} />
				</Switch>
			</DataProvider>
		</Router>
	);
}
