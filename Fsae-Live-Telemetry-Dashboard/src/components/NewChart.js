import React, { useEffect, useState } from "react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import CarData from "../contexts/data/fsae-live-telemetry-default-rtdb-export (1).json";
import { canParser } from "../lib/canParser";
import dbcConfig from "../contexts/config.json";
import { text } from "d3";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

export default function NewChart({ id, signal }) {
	const dataPoints = CarData["On Car Test"]["test-1"];
	const [dynamicData, setDynamicData] = useState([]);

	let idName = dbcConfig["params"].filter((e) => e["canId"] === id)[0]["name"];
	let unit = "";
	if (
		dbcConfig["params"]
			.filter((e) => e["canId"] === id)[0]
			["signals"].filter((e) => e["name"] === signal)[0]["sourceUnit"]
	) {
		unit = dbcConfig["params"]
			.filter((e) => e["canId"] === id)[0]
			["signals"].filter((e) => e["name"] === signal)[0]
			["sourceUnit"].replace("�", "°");
	}
	let parsedData = [];

	for (const [key, value] of Object.entries(dataPoints)) {
		if (value["data"]) {
			for (let i of value["data"]) {
				parsedData.push(canParser(i["id"], i["data"]));
			}
		}
	}

	let filteredData = parsedData.filter((e) => e["canId"] === id);
	let finalData = [];
	for (let i of filteredData) {
		for (let j of i["signals"]) {
			if (j["name"] === signal) {
				if (j["data"] != null) {
					finalData.push(parseFloat(j["data"].toFixed(2)));
				} else {
					finalData.push(finalData[finalData.length - 1]);
				}
			}
		}
	}
	let i = 0;

	// useEffect(() => {
	// 	const interval = setInterval(() => {
	// 		setDynamicData((d) => [...d, finalData[i]]);
	// 		i = i + 1;
	// 	}, 100);
	// 	return () => clearInterval(interval);
	// }, []);
	let text;
	if (unit) {
		text = `${idName} - ${signal} (${unit})`;
	} else {
		text = `${idName} - ${signal}`;
	}

	const options = {
		responsive: true,
		plugins: {
			legend: {
				display: false,
			},
			title: {
				display: true,
				text: text,
				color: "white",
				font: {
					size: 20,
					weight: "normal",
					family: "'Open Sans','sans-serif'",
				},
			},
			tooltip: {
				callbacks: {
					label: (item) => `${item.formattedValue} ${unit}`,
				},
			},
		},
		elements: {
			point: {
				radius: 0,
			},
			line: {
				tension: 0.5,
			},
		},
		scales: {
			x: {
				grid: {
					color: "#e1d9d1",
				},
				ticks: {
					color: "#e1d9d1",
				},
			},
			y: {
				grid: {
					color: "#e1d9d1",
				},
				ticks: {
					color: "#e1d9d1",
				},
			},
		},
	};

	const labels = [...Array(finalData.length).keys()];

	const data = {
		labels,
		datasets: [
			{
				label: "Dataset 1",
				data: finalData,
				borderColor: "#ff3d12",
				backgroundColor: "rgb(255,93,57)",
				borderWidth: 1,
			},
		],
	};

	return (
		<div style={{ width: "650px", color: "white", marginTop: "50px" }}>
			<Line options={options} data={data} />
		</div>
	);
}
