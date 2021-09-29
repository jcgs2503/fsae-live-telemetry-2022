import React from "react";
import { useData } from "../contexts/DataContext";
import { JsonToTable } from "react-json-to-table";

export default function Dashboard() {
	const { currentData } = useData();
	return (
		<div>
			<JsonToTable json={currentData} />
		</div>
	);
}
