import React from "react";
import styled from "@emotion/styled";
import { create } from "@mui/material/styles/createTransitions";
import Form from "react-bootstrap/Form";
import { curveNatural } from "d3-shape";

const ListItem = styled.button`
	width: 100%;
	height: fit-content;
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
	padding-top: 8px;
	padding-bottom: 8px;
`;

const ListItemActive = styled.div`
	width: 100%;
	height: fit-content;
	background-color: #07e363;
	border: none;
	text-decoration: none;
	border-bottom: 1px solid #d1d1d1;
	padding-left: 20px;
	padding-right: 20px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-top: 8px;
	padding-bottom: 8px;
`;

const ListItemCreatedTime = styled.div`
	font-size: 11px;
	color: gray;
`;

const ListItemCreatedTimeActive = styled.div`
	font-size: 11px;
	color: black;
`;

export default function DataListItem({
	active,
	name,
	createdTime,
	createNew,
	setSelectedData,
	data,
	setData
}) {
	if (active) {
		return (
			<ListItemActive>
				<div>
					<div>{name}</div>
					<ListItemCreatedTimeActive>{createdTime}</ListItemCreatedTimeActive>
				</div>
				<div style={{ fontSize: "15px" }}>Current View</div>
			</ListItemActive>
		);
	} else if (createNew) {
		return (
			<ListItem>
				<Form.Control
					type="text"
					placeholder="Start New Test"
					style={{
						borderRadius: "20px",
						paddingLeft: "20px",
						height: "40px",
						marginTop: "10px",
						marginBottom: "10px",
					}}
				/>
			</ListItem>
		);
	} else {
		return (
			<ListItem
				onClick={() => {
					setSelectedData(name);
					setData(data);
					
				}}
			>
				<>
					<div>{name}</div>
					<ListItemCreatedTime>{createdTime}</ListItemCreatedTime>
				</>
			</ListItem>
		);
	}
}
