import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import styled from "@emotion/styled";
import logo from "../assets/LargeLogo.png";
import Button from "react-bootstrap/Button";
import MenuIcon from "@mui/icons-material/MenuRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useData } from "../contexts/DataContext";
import Chart from "../components/Chart";
import LeftOffCanvas from "../components/LeftOffCanvas";
import RightOffCanvas from "../components/RightOffCanvas";

const Page = styled.div`
	width: 100%;
	height: 100vh;
	background-color: #32343a;
	padding-top: 20px;
	padding-left: 40px;
	padding-right: 40px;
	@media (max-width: 600px) {
		padding-left: 20px;
		padding-right: 10px;
	}
`;

const Navbar = styled.div`
	width: 100%;
	height: fit-content;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const Logo = styled.img`
	max-width: 200px;
	width: 30%;
	height: auto;
`;

const ChartStyle = styled.div`
	margin-top: 60px;
	color: white;

`;

const Charts = styled.div`
	/* display: flex;
	flex-wrap: wrap;
	justify-content: space-between; */
	padding-left: 0px;
	display: grid;
	grid-template-columns: 1fr 1fr;
`;

const CurrentData = styled.div`
	float: right;
	margin-right: 15%;
	margin-top: 10px;
`;

export default function Dashboard() {
	const { dataGroupList, currentData, dbc } = useData();
	const [show, setShow] = useState(false);
	const [rightShow, setRightShow] = useState(false);
	const [dataGroup, setDataGroup] = useState(dataGroupList[0]);
	const [selectedData, setSelectedData] = useState(0);
	const parseTime = d3.timeParse("%M:%S");
	const [i, setI] = useState(36);

	let initialMetaData = [
		{
			name: "test #1",
			createdTime: "2021/10/20 20:08:25",
			data: [
				{ date: "12:32", price: "20" },
				{ date: "12:33", price: "5" },
				{ date: "12:36", price: "8" },
				{ date: "12:39", price: "10" },
				{ date: "12:42", price: "10" },
			],
		},
		{
			name: "test #2",
			createdTime: "2021/10/22 16:25:36",
			data: [
				{ date: "12:32", price: "10" },
				{ date: "12:34", price: "5" },
				{ date: "12:37", price: "20" },
				{ date: "12:39", price: "5" },
				{ date: "12:42", price: "10" },
			],
		},
		{
			name: "test #3",
			createdTime: "2021/10/25 08:46:44",
			data: [
				{ date: "12:31", price: "6" },
				{ date: "12:33", price: "15" },
				{ date: "12:34", price: "150" },
				{ date: "12:35", price: "1" },
				{ date: "12:36", price: "100" },
			],
		},
	];
	initialMetaData.forEach((d) => {
		d.data.forEach((i) => {
			i.date = parseTime(i.date);
			i.price = Number(i.price);
		});
	});

	useEffect(() => {
		setI(37);
	}, [selectedData]);

	const [metaData, setMetaData] = useState(initialMetaData.reverse());
	const dbcDataName = dbc["params"]
		.map((e, idx) => ({
			name: e["name"],
			id: `${idx}`,
		}))
		.sort(function (a, b) {
			var nameA = a.name.toUpperCase();
			var nameB = b.name.toUpperCase();
			if (nameA < nameB) {
				return -1;
			}
			if (nameA > nameB) {
				return 1;
			}
			return 0;
		});
	let dbcDataNameDetail = [];
	dbc["params"].forEach((e) => {
		let names = e["signals"].map((ele) => ele["name"]);
		names = names.sort();
		dbcDataNameDetail[e["name"]] = names;
	});

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const handleRightShow = () => setRightShow(true);
	const handleRightClose = () => setRightShow(false);

	function addData() {
		setI(i + 1);
		setMetaData((prev) => {
			let prevCopy = [...prev];
			prevCopy[selectedData].data.push({
				date: parseTime(`12:${i}`),
				price: Number(Math.floor(Math.random() * 100)),
			});
			return prevCopy;
		});
	}

	return (
		<Page>
			<Navbar>
				<Button variant="outline-light" onClick={handleShow}>
					<MenuIcon />
				</Button>

				<Logo src={logo} />

				<Button variant="outline-light" onClick={handleRightShow}>
					<AddRoundedIcon />
				</Button>
			</Navbar>
			<Charts>
				<ChartStyle >
					<Button
						onClick={addData}
						variant="outline-light"
						style={{ marginBottom: "20px" }}
					>
						<AddRoundedIcon />
					</Button>
					<CurrentData>
						{
							metaData[selectedData].data[
								metaData[selectedData].data.length - 1
							].price
						}
					</CurrentData>

					<Chart
						data_json={metaData[selectedData].data}
						label={metaData[selectedData].name}
					></Chart>
				</ChartStyle>
				<ChartStyle>
					<Button
						onClick={addData}
						variant="outline-light"
						style={{ marginBottom: "20px" }}
					>
						<AddRoundedIcon />
					</Button>
					<CurrentData>
						{
							metaData[selectedData].data[
								metaData[selectedData].data.length - 1
							].price
						}
					</CurrentData>

					<Chart
						data_json={metaData[selectedData].data}
						label={metaData[selectedData].name}
					></Chart>
				</ChartStyle>
			</Charts>

			<LeftOffCanvas
				show={show}
				handleClose={handleClose}
				metaData={metaData}
				selectedData={selectedData}
				setSelectedData={setSelectedData}
				setDataGroup={setDataGroup}
				dataGroup={dataGroup}
				currentData={currentData}
			/>

			<RightOffCanvas
				rightShow={rightShow}
				handleRightClose={handleRightClose}
				dbcDataName={dbcDataName}
				dbcDataNameDetail={dbcDataNameDetail}
			/>
		</Page>
	);
}
