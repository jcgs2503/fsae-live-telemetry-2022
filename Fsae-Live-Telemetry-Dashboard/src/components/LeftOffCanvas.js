import React, { useState, useEffect } from "react";
import OffCanvas from "react-bootstrap/Offcanvas";
import styled from "@emotion/styled";
import ListItem from "./DataListItem";
import { useData } from "../contexts/DataContext";
import Dropdown from "react-bootstrap/Dropdown";
const List = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
`;

const StyledDropdown = styled(Dropdown)`
	:hover {
		cursor: default;
	}
`;

export default function LeftOffCanvas({
	show,
	handleClose,
	selectedData,
	setSelectedData,
	setDataGroup,
	dataGroup,
	currentData,
}) {
	const { dataGroupList } = useData();

	return (
		<OffCanvas show={show} onHide={handleClose}>
			<OffCanvas.Header
				style={{
					borderBottom: "1px solid #d1d1d1",
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					paddingLeft: "20px",
				}}
			>
				<OffCanvas.Title>Data List</OffCanvas.Title>
				<StyledDropdown>
					<Dropdown.Toggle variant="primary">
						{dataGroup && dataGroup}
					</Dropdown.Toggle>

					<Dropdown.Menu>
						{dataGroupList.map((e) => (
							<Dropdown.Item
								onClick={() => {
									setDataGroup(e);
								}}
							>
								{e}
							</Dropdown.Item>
						))}
					</Dropdown.Menu>
				</StyledDropdown>
			</OffCanvas.Header>

			<OffCanvas.Body
				style={{ paddingLeft: "0px", paddingRight: "0px", paddingTop: "0px" }}
			>
				{currentData[dataGroup] && (
					<List>
						<ListItem createNew />

						{Object.keys(currentData[dataGroup]).map((e, idx) => (
							<ListItem
								id={idx}
								name={e}
								active={selectedData === idx}
								setSelectedData={setSelectedData}
							/>
						))}
					</List>
				)}
			</OffCanvas.Body>
		</OffCanvas>
	);
}
