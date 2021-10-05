import React, { useRef } from "react";
import * as d3 from "d3";
import LineChart from "react-linechart";
// import "../node_modules/react-linechart/dist/styles.css";

export default function Chart() {
	const data = [12, 36, 6, 25, 35, 10, 20];
	const d3Ref = useRef();

	return <div ref={d3Ref}></div>;
}
