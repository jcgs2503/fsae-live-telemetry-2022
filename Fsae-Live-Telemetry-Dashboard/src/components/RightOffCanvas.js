import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import OffCanvas from "react-bootstrap/Offcanvas";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { select } from "d3";
import ListItemItem from "./DataListItemItem";

const List = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	padding-left: 30px;
	padding-right: 30px;
`;

const ListItem = styled.div`
	border-radius: 4px;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding-top: 13px;
	padding-bottom: 13px;
	border: 1px #dbdbdb solid;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
	margin-top: 10px;
	background-color: white;
	:hover {
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
	}
`;

const EditTitle = styled.div`
	padding-left: 18px;
	padding-right: 18px;
	font-size: 18px;
	font-weight: bold;
	margin-top: 20px;
	display: flex;
	justify-content: space-between;
`;

const StyledOffcanvasBody = styled(OffCanvas.Body)`
	-ms-overflow-style: none; /* IE and Edge */
	scrollbar-width: none; /* Firefox */
	&::-webkit-scrollbar {
		display: none;
	}
`;

export default function RightOffCanvas({
	rightShow,
	handleRightClose,
	dbcDataName,
	dbcDataNameDetail,
}) {
	const [selectedDBC, setSelectedDBC] = useState([]);
	const [draggableDBC, setDraggableDBC] = useState(dbcDataName);
	const [filteredDraggableDBC, setFilteredDraggableDBC] = useState(dbcDataName);
	const [search, setSearch] = useState("");
	function onDragEnd(res) {
		if (!res.destination) return;
		if (res.destination.droppableId !== res.source.droppableId) {
			if (res.source.droppableId === "availableData") {
				let newDraggableDBC = Array.from(draggableDBC);
				let newSelectedDBC = Array.from(selectedDBC);
				const [reorderedItem] = newDraggableDBC.splice(res.source.index, 1);
				newSelectedDBC.splice(res.destination.index, 0, reorderedItem);
				setDraggableDBC(newDraggableDBC);
				setSelectedDBC(newSelectedDBC);
			} else {
				let newDraggableDBC = Array.from(draggableDBC);
				let newSelectedDBC = Array.from(selectedDBC);
				const [reorderedItem] = newSelectedDBC.splice(res.source.index, 1);
				newDraggableDBC.splice(res.destination.index, 0, reorderedItem);
				setDraggableDBC(newDraggableDBC);
				setSelectedDBC(newSelectedDBC);
			}
		} else if (res.destination.droppableId == "availableData") {
			let newDraggableDBC = Array.from(draggableDBC);
			const [reorderedItem] = newDraggableDBC.splice(res.source.index, 1);
			newDraggableDBC.splice(res.destination.index, 0, reorderedItem);
			setDraggableDBC(newDraggableDBC);
		} else {
			let newSelectedDBC = Array.from(selectedDBC);
			const [reorderedItem] = newSelectedDBC.splice(res.source.index, 1);
			newSelectedDBC.splice(res.destination.index, 0, reorderedItem);
			setSelectedDBC(newSelectedDBC);
		}
	}

	function Select(e) {
		let selectArray = draggableDBC.map((e) => e.name);
		let idx = selectArray.indexOf(e.target.textContent);
		let newDraggableDBC = Array.from(draggableDBC);
		let newSelectedDBC = Array.from(selectedDBC);
		const [reorderedItem] = newDraggableDBC.splice(idx, 1);
		newSelectedDBC.splice(0, 0, reorderedItem);
		setDraggableDBC(newDraggableDBC);
		setSelectedDBC(newSelectedDBC);
	}

	useEffect(() => {
		setFilteredDraggableDBC(
			draggableDBC.filter(
				(item) =>
					item.name.toLowerCase().includes(search) ||
					dbcDataNameDetail[item.name].findIndex((name) => {
						return name.toLowerCase().includes(search.replace(" ", "_"));
					}) != -1
			)
		);
	}, [search]);

	return (
		<OffCanvas show={rightShow} onHide={handleRightClose} placement="end">
			<OffCanvas.Header closeButton>
				<OffCanvas.Title>Edit Dashboard</OffCanvas.Title>
			</OffCanvas.Header>
			<StyledOffcanvasBody
				style={{ paddingLeft: "0px", paddingRight: "0px", paddingTop: "0px" }}
			>
				<DragDropContext onDragEnd={onDragEnd}>
					<EditTitle>
						<div>Selected</div>
						<Button
							variant="link"
							onClick={() => {
								setSelectedDBC([]);
								setDraggableDBC(dbcDataName);
								setFilteredDraggableDBC(dbcDataName);
							}}
						>
							Reset
						</Button>
					</EditTitle>
					<List>
						<Droppable droppableId="selectedData">
							{(provided) => {
								if (selectedDBC) {
									return (
										<div
											ref={provided.innerRef}
											{...provided.droppableProps}
											style={{ minHeight: "30px" }}
										>
											{selectedDBC.map((item, index) => (
												<Draggable
													// adding a key is important!
													key={`${item.name}-${item.id}`}
													draggableId={`${item.name}-${item.id}`}
													index={index}
												>
													{(provided, snapshot) => (
														<ListItem
															ref={provided.innerRef}
															{...provided.draggableProps}
															{...provided.dragHandleProps}
														>
															{item.name}
															{dbcDataNameDetail[item.name].map((e) => (
																<ListItemItem
																	display={true}
																	name={e}
																	checked={true}
																/>
															))}
														</ListItem>
													)}
												</Draggable>
											))}
											{provided.placeholder}
										</div>
									);
								}
							}}
						</Droppable>
					</List>

					<EditTitle>Available Data</EditTitle>
					<div style={{ padding: "10px 28px" }}>
						<Form.Control
							type="text"
							placeholder="Search for Data"
							style={{
								borderRadius: "25px",
								paddingLeft: "20px",
								height: "50px",
								marginTop: "10px",
								marginBottom: "10px",
							}}
							onChange={(e) => {
								setSearch(e.target.value.toLowerCase());
							}}
						/>
					</div>

					<List>
						<Droppable droppableId="availableData">
							{(provided) => {
								if (draggableDBC) {
									return (
										<div
											ref={provided.innerRef}
											{...provided.droppableProps}
											style={{ minHeight: "30px" }}
										>
											{draggableDBC
												.sort(function (a, b) {
													var nameA = a.name.toUpperCase(); // ignore upper and lowercase
													var nameB = b.name.toUpperCase(); // ignore upper and lowercase
													if (nameA < nameB) {
														return -1;
													}
													if (nameA > nameB) {
														return 1;
													}

													// names must be equal
													return 0;
												})
												.map(
													(item, index) =>
														filteredDraggableDBC.includes(item) && (
															<Draggable
																// adding a key is important!
																key={`${item.name}-${item.id}`}
																draggableId={`${item.name}-${item.id}`}
																index={index}
															>
																{(provided, snapshot) => (
																	<ListItem
																		ref={provided.innerRef}
																		{...provided.draggableProps}
																		{...provided.dragHandleProps}
																		onClick={Select}
																	>
																		{item.name}
																	</ListItem>
																)}
															</Draggable>
														)
												)}
											{provided.placeholder}
										</div>
									);
								}
							}}
						</Droppable>
					</List>
				</DragDropContext>
			</StyledOffcanvasBody>
		</OffCanvas>
	);
}
