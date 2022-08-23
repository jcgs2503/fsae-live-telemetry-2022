import React, { useState } from "react";
import styled from "@emotion/styled";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useData } from "../contexts/DataContext";

const NewListItem = styled.button`
	width: 100%;
	height: fit-content;
	background-color: transparent;
	border: none;
	text-decoration: none;
	border-bottom: 1px solid #d1d1d1;
	padding-left: 20px;
	padding-right: 20px;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-evenly;
	padding-top: 8px;
	padding-bottom: 8px;
`;

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
	id,
	dataGroup,
	collectingData,
}) {
	const { startNewTest } = useData();
	const [newTest, setNewTest] = useState({});
	function handleSubmit() {
		startNewTest(dataGroup, newTest.name, newTest.createdTimeStamp);
	}
	if (active) {
		return (
			<ListItemActive>
				<div>
					{collectingData ? (
						<div>{name} - Collecting Data</div>
					) : (
						<div>{name}</div>
					)}

					{createdTime ? (
						<ListItemCreatedTimeActive>{createdTime}</ListItemCreatedTimeActive>
					) : (
						<ListItemCreatedTimeActive>
							No Created Time
						</ListItemCreatedTimeActive>
					)}
				</div>
				<div style={{ fontSize: "15px" }}>Current View</div>
			</ListItemActive>
		);
	} else if (createNew) {
		return (
			<NewListItem>
				<Form.Control
					type="text"
					placeholder="Start New Test"
					style={{
						borderRadius: "20px",
						paddingLeft: "20px",
						height: "40px",
						marginTop: "10px",
						marginBottom: "10px",
						marginRight: "10px",
					}}
					onChange={(e) => {
						setNewTest({
							name: e.currentTarget.value,
							createdTimeStamp: Math.floor(Date.now() / 1000),
						});
					}}
				/>
				<Button variant="primary" type="submit" onClick={handleSubmit}>
					Submit
				</Button>
			</NewListItem>
		);
	} else {
		return (
			<ListItem
				onClick={() => {
					setSelectedData(id);
				}}
			>
				<>
					{collectingData ? (
						<div>{name} - Collecting Data</div>
					) : (
						<div>{name}</div>
					)}

					{createdTime ? (
						<ListItemCreatedTime>{createdTime}</ListItemCreatedTime>
					) : (
						<ListItemCreatedTime>No Created Time</ListItemCreatedTime>
					)}
				</>
			</ListItem>
		);
	}
}
