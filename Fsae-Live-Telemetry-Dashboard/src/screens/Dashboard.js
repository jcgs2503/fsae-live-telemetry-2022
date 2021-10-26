import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import styled from "@emotion/styled";
import logo from "../assets/LargeLogo.png";
import Button from "react-bootstrap/Button";
import OffCanvas from "react-bootstrap/Offcanvas";
import Form from "react-bootstrap/Form";
import MenuIcon from "@mui/icons-material/MenuRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ListItem from "../components/DataListItem";
import { useData } from "../contexts/DataContext";
import Chart from "../components/Chart";

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

const List = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
`;

const EditTitle = styled.div`
	padding-left: 18px;
	font-size: 18px;
	font-weight: bold;
`;

const ChartStyle = styled.div`
	margin-top: 60px;
	color: white;
	margin-left: 30px;
`;

export default function Dashboard() {
	const [show, setShow] = useState(false);
	const [rightShow, setRightShow] = useState(false);
	const [selectedData, setSelectedData] = useState(0);
	const parseDate = d3.timeParse("%m/%d/%Y");
	const [i, setI] = useState(17);

	let initialMetaData = [
		{
			name: "test #1",
			createdTime: "2021/10/20 20:08:25",
			data: [
				{ date: "10/12/2021", price: "20" },
				{ date: "10/13/2021", price: "5" },
				{ date: "10/14/2021", price: "8" },
				{ date: "10/15/2021", price: "10" },
				{ date: "10/16/2021", price: "10" },
			],
		},
		{
			name: "test #2",
			createdTime: "2021/10/22 16:25:36",
			data: [
				{ date: "10/12/2021", price: "10" },
				{ date: "10/13/2021", price: "5" },
				{ date: "10/14/2021", price: "20" },
				{ date: "10/15/2021", price: "5" },
				{ date: "10/16/2021", price: "10" },
			],
		},
		{
			name: "test #3",
			createdTime: "2021/10/25 08:46:44",
			data: [
				{ date: "10/12/2021", price: "6" },
				{ date: "10/13/2021", price: "15" },
				{ date: "10/14/2021", price: "150" },
				{ date: "10/15/2021", price: "1" },
				{ date: "10/16/2021", price: "100" },
			],
		},
	];
	initialMetaData.forEach((d) => {
		d.data.forEach((i) => {
			i.date = parseDate(i.date);
			i.price = Number(i.price);
		});
	});

	useEffect(() => {
		setI(17);
	}, [selectedData]);

	const [metaData, setMetaData] = useState(initialMetaData.reverse());
	const { dbc } = useData();
	const dbcDataName = dbc["params"].map((e) => e["name"]);
	let dbcDataNameDetail = [];
	dbc["params"].forEach((e) => {
		let names = e["signals"].map((ele) => ele["name"]);
		dbcDataNameDetail[e["name"]] = names;
	});

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const handleRightShow = () => setRightShow(true);
	const handleRightClose = () => setRightShow(false);

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
			<ChartStyle>
				<Button
					onClick={() => {
						setI(i + 1);
						setMetaData((prev) => {
							let prevCopy = [...prev];
							prevCopy[selectedData].data.push({
								date: parseDate(`10/${i}/2021`),
								price: Number(Math.floor(Math.random() * 100)),
							});
							return prevCopy;
						});
					}}
					variant="outline-light"
					style={{ marginBottom: "20px" }}
				>
					<AddRoundedIcon />
				</Button>
				<div style={{ float: "right", marginRight: "57%", marginTop: "10px" }}>
					{
						metaData[selectedData].data[metaData[selectedData].data.length - 1]
							.price
					}
				</div>
				<Chart
					data_json={metaData[selectedData].data}
					label={metaData[selectedData].name}
				></Chart>
			</ChartStyle>

			<OffCanvas show={show} onHide={handleClose}>
				<OffCanvas.Header
					closeButton
					style={{ borderBottom: "1px solid #d1d1d1" }}
				>
					<OffCanvas.Title>Data List</OffCanvas.Title>
				</OffCanvas.Header>
				<OffCanvas.Body
					style={{ paddingLeft: "0px", paddingRight: "0px", paddingTop: "0px" }}
				>
					<List>
						<ListItem createNew />

						{metaData.map((e, idx) => (
							<ListItem
								id={idx}
								name={e.name}
								data={e.data}
								createdTime={e.createdTime}
								active={selectedData === idx}
								setSelectedData={setSelectedData}
							/>
						))}
					</List>
				</OffCanvas.Body>
			</OffCanvas>

			<OffCanvas show={rightShow} onHide={handleRightClose} placement="end">
				<OffCanvas.Header closeButton>
					<OffCanvas.Title>Edit Dashboard</OffCanvas.Title>
				</OffCanvas.Header>
				<OffCanvas.Body
					style={{ paddingLeft: "0px", paddingRight: "0px", paddingTop: "0px" }}
				>
					<EditTitle>Selected</EditTitle>
					<List>BRK_IR_Internal_Temperature</List>
					<EditTitle>Available Data</EditTitle>
				</OffCanvas.Body>
			</OffCanvas>
		</Page>
	);
}
