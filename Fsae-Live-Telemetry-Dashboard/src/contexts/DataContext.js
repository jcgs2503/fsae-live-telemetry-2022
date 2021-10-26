import React, { useState, useContext, useEffect } from "react";
import firebase from "../firebase";
const dbc = require("./config.json");

const DataContext = React.createContext();
const db = firebase.database();

export function useData() {
	return useContext(DataContext);
}

export function DataProvider({ children }) {
	const dataGroupList = ["teststruct", "On Car Test"];
	const [currentData, setCurrentData] = useState({});

	useEffect(() => {
		dataGroupList.map((dg) => {
			const testRef = db.ref(dg);
			testRef.on("value", (snapshot) => {
				const testdata = snapshot.val();
				setCurrentData((prevdata) => ({ ...prevdata, [dg]: testdata }));
			});
		});
	}, []);
	const value = {
		currentData,
		dbc,
	};

	return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
