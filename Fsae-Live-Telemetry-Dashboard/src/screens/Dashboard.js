import React from "react";
import { useData } from "../contexts/DataContext";

export default function Dashboard() {
	const { currentData } = useData();
	return <div>{JSON.stringify(currentData)}</div>;
}
