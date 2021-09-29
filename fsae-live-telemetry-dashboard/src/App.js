import React, { useState, useEffect } from "react";
import firebase from "./firebase";

export default function App() {
	const [data, setData] = useState();
	const db = firebase.database();
	useEffect(() => {
		const testRef = db.ref("teststruct");
		testRef.on("value", (snapshot) => {
			const testdata = snapshot.val();
			setData(testdata);
		});
	}, []);

	return <div>{JSON.stringify(data)}</div>;
}
