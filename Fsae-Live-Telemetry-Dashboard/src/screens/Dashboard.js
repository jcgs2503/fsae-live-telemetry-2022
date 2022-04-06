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
import NewChart from "../components/NewChart";

const Page = styled.div`
	width: 100%;
	height: fit-content;
	min-height: 100vh;
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
	const [selecteddbcdashboard, setselecteddbcdashboard] = useState([]);
	const [content, setContent] = useState([]);
	let initialChosedData = {};
	dbc["params"].forEach((e) => {
		let names = e["signals"].map((ele) => ele["name"]);
		names.forEach((name) => {
			initialChosedData[name] = false;
		});
	});
	const [chosedData, setChosedData] = useState(initialChosedData);

	// console.log(dbc);

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

	// fix smppth scroll
	// figure out how to add timestamp
	// how to save time in firebase?
	// how to start graph with no prior data?

	useEffect(() => {
		let newContent = [];
		selecteddbcdashboard.map((dbc_item) => {
			let node = dbc["params"].filter((e) => e["name"] === dbc_item["name"])[0];
			console.log(node);
			if (node) {
				console.log(node);
				node["signals"]
					.sort((a, b) => (a.name > b.name ? 1 : -1))
					.map((s) => {
						if (chosedData[s.name]) {
							newContent.push({ id: node.canId, signal: s.name });
						}
					});
			}
		});
		setContent(newContent);
	}, [selecteddbcdashboard, chosedData]);

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

			<div className="chart-grid" style={{ paddingTop: "100px" }}>
				{content.map((e) => (
					<NewChart id={e.id} signal={e.signal} key={`${e.id}-${e.signal}`} />
				))}
			</div>

			<LeftOffCanvas
				show={show}
				handleClose={handleClose}
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
				selecteddbcdashboard={selecteddbcdashboard}
				setselecteddbcdashboard={setselecteddbcdashboard}
				chosedData={chosedData}
				setChosedData={setChosedData}
			/>
		</Page>
	);
}
