import React, { useEffect, useState } from "react";
import "chartjs-adapter-moment";
import {
	Chart as ChartJS,
	ArcElement,
	LineElement,
	BarElement,
	PointElement,
	BarController,
	BubbleController,
	DoughnutController,
	LineController,
	PieController,
	PolarAreaController,
	RadarController,
	ScatterController,
	CategoryScale,
	LinearScale,
	LogarithmicScale,
	RadialLinearScale,
	TimeScale,
	TimeSeriesScale,
	Decimation,
	Filler,
	Legend,
	Title,
	Tooltip,
	SubTitle,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { canParser } from "../lib/canParser.js";
import dbcConfig from "../contexts/config.json";
import { text } from "d3";
import { useData } from "../contexts/DataContext";

ChartJS.register(
	ArcElement,
	LineElement,
	BarElement,
	PointElement,
	BarController,
	BubbleController,
	DoughnutController,
	LineController,
	PieController,
	PolarAreaController,
	RadarController,
	ScatterController,
	CategoryScale,
	LinearScale,
	LogarithmicScale,
	RadialLinearScale,
	TimeScale,
	TimeSeriesScale,
	Decimation,
	Filler,
	Legend,
	Title,
	Tooltip,
	SubTitle
);

export default function NewChart({ id, signal, dataGroup, selectedData }) {
	const { currentData } = useData();
	const dataPoints =
		currentData[dataGroup][Object.keys(currentData[dataGroup])[selectedData]];
	const createdTime = dataPoints["init"]["createdTimeStamp"] * 1000;
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
		if (value["data"] && key != "init") {
			for (let i of value["data"]) {
				parsedData.push(canParser(i["id"], i["data"], i["timestamp_ms"]));
			}
		}
	}
	

	let filteredData = parsedData.filter((e) => e&&e["canId"] === id);
	console.log(filteredData);
	let finalData = [];
	let timestamps = [];
	for (let i of filteredData) {
		for (let j of i["signals"]) {
			if (j["name"] === signal) {
				if (j["data"] != null) {
					finalData.push(parseFloat(j["data"].toFixed(2)));
					timestamps.push(parseInt(j["timestamp"]));
				} else {
					finalData.push(finalData[finalData.length - 1]);
					timestamps.push(parseInt(j["timestamp"]));
				}
			}
		}
	}
	let i = 0;

	let text;
	if (unit) {
		text = `${idName} - ${signal} (${unit})`;
	} else {
		text = `${idName} - ${signal}`;
	}

	const plugins = [
		{
			afterDraw: (chart: { tooltip?: any, scales?: any, ctx?: any }) => {
				// eslint-disable-next-line no-underscore-dangle
				if (chart.tooltip._active && chart.tooltip._active.length) {
					// find coordinates of tooltip
					const activePoint = chart.tooltip._active[0];
					const { ctx } = chart;
					const { x } = activePoint.element;
					const topY = chart.scales.y.top;
					const bottomY = chart.scales.y.bottom;

					// draw vertical line
					ctx.save();
					ctx.beginPath();
					ctx.moveTo(x, topY);
					ctx.lineTo(x, bottomY);
					ctx.lineWidth = 1;
					ctx.strokeStyle = "#ffffff";
					ctx.stroke();
					ctx.restore();
				}
			},
		},
	];

	const options = {
		responsive: true,
		animation: false,
		interaction: {
			mode: "nearest",
			axis: "x",
			intersect: false,
		},
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
				tension: 0.15,
			},
		},
		scales: {
			x: {
				type: "time",

				time: {
					minunit: "millisecond",
					tooltipFormat: "HH:mm:ss.SSS",
					displayFormats: {
						millisecond: "HH:mm:ss",
					},
				},
				grid: {
					color: "#e1d9d1",
				},
				ticks: {
					color: "#e1d9d1",
					autoSkip: true,
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

	const labelsLength = [...Array(finalData.length).keys()];
	let dataset = labelsLength.map((e, idx) => ({
		x: timestamps[idx],
		y: finalData[idx],
	}));

	// if (timestamps[0]) {
	// 	dataset = labels.map((e, idx) => ({
	// 		x: timestamps[idx],
	// 		y: finalData[idx],
	// 	}));
	// } else {
	// 	dataset = labels.map((e, idx) => ({
	// 		x: labels[idx],
	// 		y: finalData[idx],
	// 	}));
	// }

	const data = {
		datasets: [
			{
				label: "Dataset 1",
				data: dataset,
				borderColor: "#ff3d12",
				backgroundColor: "rgb(255,93,57)",
				borderWidth: 1.4,
			},
		],
	};

	return (
		<div style={{ width: "650px", color: "white", marginTop: "50px" }}>
			<Line options={options} data={data} plugins={plugins} />
		</div>
	);
}
