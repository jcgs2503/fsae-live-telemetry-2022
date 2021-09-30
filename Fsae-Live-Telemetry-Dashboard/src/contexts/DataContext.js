import React, { useState, useContext, useEffect } from "react";
import firebase from "../firebase";

const DataContext = React.createContext();
const db = firebase.database();

export function useData() {
	return useContext(DataContext);
}

export function DataProvider({ children }) {
	const dataGroupList = ["teststruct"];
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
	};

	return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
