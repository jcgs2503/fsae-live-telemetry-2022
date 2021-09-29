import React, { useState, useContext, useEffect } from "react";
import firebase from "../firebase";

const DataContext = React.createContext();
const db = firebase.database();

export function useData() {
	return useContext(DataContext);
}

export function DataProvider({ children }) {
	const [currentData, setCurrentData] = useState();
	useEffect(() => {
		const testRef = db.ref("teststruct");
		testRef.on("value", (snapshot) => {
			const testdata = snapshot.val();
			setCurrentData(testdata);
		});
	}, []);
	const value = {
		currentData,
	};

	return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
