import React from "react";
import * as d3 from "d3";
// import LineChart from "react-linechart";
// import "../node_modules/react-linechart/dist/styles.css";

import "../index.css";

export default function Chart(props) {
	const margin = { top: 40, right: 40, bottom: 60, left: 60 },
		width = 1300 - margin.left - margin.right,
		height = 280 - margin.top - margin.bottom,
		color = "OrangeRed";

	// This will generate the chart
	const [activeIndex, setActiveIndex] = React.useState(null),
		[data, setData] = React.useState([]);

	const yMinValue = d3.min(props.data_json, (d) => d.price),
		yMaxValue = d3.max(props.data_json, (d) => d.price);


		
		const overwidth = (width<props.data_json.length * 20+ margin.left + margin.right)? props.data_json.length * 100+ margin.left + margin.right: width;
		console.log(overwidth);
		console.log(width);

		

	const getX = d3
		.scaleTime()
		.domain(d3.extent(props.data_json, (d) => d.date))
		.range([margin.left, overwidth + margin.right]);

	const getY = d3
		.scaleLinear()
		.domain([yMinValue - 1, yMaxValue + 2])
		.range([height, 0]);

	const getXAxis = (ref) => {
		const xAxis = d3.axisBottom(getX);
		d3.select(ref).call(xAxis.tickFormat(d3.timeFormat("%M:%S")));


		
	};

	const getYAxis = (ref) => {
		const yAxis = d3.axisLeft(getY).tickSize(-overwidth).tickPadding(7);
		d3.select(ref).call(yAxis);
	};

	const linePath = d3
		.line(d3.curveStep)
		.x((d) => getX(d.date))
		.y((d) => getY(d.price))
		.curve(d3.curveMonotoneX)(props.data_json);

	const areaPath = d3
		.area()
		.x((d) => getX(d.date))
		.y0((d) => getY(d.price))
		.y1(() => getY(yMinValue - 1))
		.curve(d3.curveMonotoneX)(props.data_json);

	const handleMouseMove = (e) => {
		const bisect = d3.bisector((d) => d.date).left,
			x0 = getX.invert(d3.pointer(e, this)[0]),
			index = bisect(props.data_json, x0, 1);
		setActiveIndex(index);
	};

	const handleMouseLeave = () => {
		setActiveIndex(null);
	};



	// const parent = d3.create("div");

	// parent.append("svg")
	// 	.attr("width", width)
	// 	.attr("height", height)
	// 	.style("position", "absolute")
	// 	.style("pointer-events", "none")
	// 	.style("z-index", 1)
	// 	.call(svg => svg.append("g").call(getYAxis));
  
	// const body = parent.append("div")
	// 	.style("overflow-x", "scroll")
	// 	.style("-webkit-overflow-scrolling", "touch");
  
	// body.append("svg")
	// 	.attr("width", overwidth)
	// 	.attr("height", height)
	// 	.style("display", "block")
	// 	.call(svg => svg.append("g").ref(linePath) )
	  	

//   // Initialize the scroll offset after yielding the chart to the DOM.
//   body.node().scrollBy(overwidth, 0);

	return (
		// 
		<div >
			<svg
			viewBox={`${margin.left+ margin.right+170} 0 ${width + margin.left + margin.right} // change the dimensions IT IS HARD_CODED right now
			${height + margin.top + margin.bottom}`}
			style={{height : height, position: "absolute", zIndex:"1",minHeight:height, maxHeight:height, width:width}}
		
			>
			<g className="axis" ref={getYAxis} transform={`translate(${margin.left })`} />
			<text
					transform={"rotate(-90)"}
					x={0 - height / 2}
					y={0}
					dy="1em"
				>
					{"y axis"}
				</text>
			

			</svg>


		<div style={{width:width, height : height, position: "absolute", zIndex:"2", pointerEvents:"auto",overflowX:"scroll", flexDirection: "row-reverse", overflowAnchor:"auto"}}>

			<svg
			
			height={height}
				viewBox={`0 0 ${overwidth + margin.left + margin.right} 
							${height + margin.top + margin.bottom}`}
				onMouseMove={handleMouseMove}
				onMouseLeave={handleMouseLeave}
				style={{minHeight:height, maxHeight:height, width:"fit-content"}}
				
			>
			
				{/* <g className="axis" ref={getYAxis} transform={`translate(${margin.left })`} /> */}
				<g
					className="axis xAxis"
					ref={getXAxis}
					transform={`translate(${0},${height})`}
				/>
				// area and line paths
				<path fill={color} d={areaPath} opacity={0.3} />
				<path strokeWidth={3} fill="none" stroke={color} d={linePath} />
				{props.data_json.map((item, index) => {
					return (
						<g key={index}>
							// hovering text
							<text
								fill="#666"
								x={getX(item.date)}
								y={getY(item.price) - 20}
								textAnchor="middle"
							>
								{index === activeIndex ? item.price : ""}
							</text>
							// hovering circle
							<circle
								cx={getX(item.date)}
								cy={getY(item.price)}
								r={index === activeIndex ? 4 : 2}
								fill={color}
								strokeWidth={index === activeIndex ? 2 : 0}
								stroke="#fff"
								// style={{ transition: "ease-out .1s" }}
							/>
						</g>
					);
				})}
			
				// x- and y-axes
				
				// y-axis label
				
				// chart title
				<text x={width / 2} y={0 - margin.top / 2} text-anchor="middle">
					{props.label}
				</text>
				// chart subtitle
				<a className="subtitle" target="_blank">
					<text x="0" y={height + 50}>
						{"Test Graph"}
					</text>
				</a>
				
			</svg>

			
			
		</div>
		</div>
	);
}
