import React, { useState, useEffect } from "react";
import { DataProvider } from "./contexts/DataContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Dashboard from "./screens/Dashboard";

export default function App() {
	return (
		<Router>
			<DataProvider>
				<Switch>
					<Route path="/dashboard" component={Dashboard} />
				</Switch>
			</DataProvider>
		</Router>
	);
}
