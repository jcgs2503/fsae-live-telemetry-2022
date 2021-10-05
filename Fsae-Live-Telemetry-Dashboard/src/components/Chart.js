import React, { useRef } from "react";
import * as d3 from "d3";

export default function Chart() {
	const data = [12, 36, 6, 25, 35, 10, 20];
	const d3Ref = useRef();
	const accessToRef = d3
		.select(d3Ref.current)
		.append("svg")
		.attr("width", 500)
		.attr("height", 400)
		.style("background-color", "#cccccc")
		.style("padding", 10)
		.style("margin-left", 50);

	accessToRef.selectAll("rect").data(data).enter().append("rect");
	return <div ref={d3Ref}></div>;
}
