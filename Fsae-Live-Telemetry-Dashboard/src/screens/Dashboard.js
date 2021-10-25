import React, { useState } from "react";
import styled from "@emotion/styled";
import logo from "../assets/LargeLogo.png";
import Button from "react-bootstrap/Button";
import OffCanvas from "react-bootstrap/Offcanvas";
import Form from "react-bootstrap/Form";
import MenuIcon from "@mui/icons-material/MenuRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

const Page = styled.div`
	width: 100%;
	height: 100vh;
	background-color: #32343a;
	padding-top: 20px;
	padding-left: 40px;
	padding-right: 40px;
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

const ListItem = styled.button`
	width: 100%;
	height: 60px;
	background-color: transparent;
	border: none;
	text-decoration: none;
	border-bottom: 1px solid #d1d1d1;
	padding-left: 20px;
	padding-right: 20px;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
	:hover {
		background-color: #d1d1d1;
	}
`;

const ListItemCreatedTime = styled.div`
	font-size: 11px;
	color: gray;
`;

export default function Dashboard() {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	return (
		<Page>
			<Navbar>
				<Button variant="outline-light" onClick={handleShow}>
					<MenuIcon />
				</Button>

				<Logo src={logo} />
				<Button variant="outline-light">
					<AddRoundedIcon />
				</Button>
			</Navbar>

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
						<ListItem>
							<Form.Control type="text" placeholder="Start New Test" />
						</ListItem>
						<ListItem>
							<div>test #3</div>
							<ListItemCreatedTime>2021/10/25 20:08:25</ListItemCreatedTime>
						</ListItem>
						<ListItem>
							<div>test #2</div>
							<ListItemCreatedTime>2021/10/22 22:05:01</ListItemCreatedTime>
						</ListItem>
						<ListItem>
							<div>test #1</div>
							<ListItemCreatedTime>2021/10/20 16:15:30</ListItemCreatedTime>
						</ListItem>
					</List>
				</OffCanvas.Body>
			</OffCanvas>
		</Page>
	);
}
