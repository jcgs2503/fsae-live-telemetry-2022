import React, { useState, useContext, useEffect } from "react";
import firebase from "../firebase";
const dbc = require("./config.json");

const DataContext = React.createContext();
const db = firebase.database();

export function startNewTest(dataGroup, testName, createdTimeStamp) {
	db.ref(`${dataGroup}/${testName}/init`).set({
		name: testName,
		createdTimeStamp: createdTimeStamp,
	});
}

export function useData() {
	return useContext(DataContext);
}

export function DataProvider({ children }) {
	const dataGroupList = ["On Car Test"];
	const [currentData, setCurrentData] = useState({});
	const [collectingDataName, setCollectingDataName] = useState("");

	useEffect(() => {
		dataGroupList.map((dg) => {
			const testRef = db.ref(dg);
			testRef.on("value", (snapshot) => {
				const testdata = snapshot.val();
				setCurrentData((prevdata) => ({ ...prevdata, [dg]: testdata }));
			});
		});
		const cdn = db.ref("CollectingDataName");
		cdn.on("value", (snapshot) => {
			const testdata = snapshot.val();
			setCollectingDataName(testdata);
		});
	}, []);
	const value = {
		currentData,
		dbc,
		dataGroupList,
		startNewTest,
		collectingDataName,
	};

	return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
