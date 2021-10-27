import React from "react";
import OffCanvas from "react-bootstrap/Offcanvas";
import styled from "@emotion/styled";
import ListItem from "./DataListItem";

const List = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
`;

export default function LeftOffCanvas({
	show,
	handleClose,
	metaData,
	selectedData,
	setSelectedData,
}) {
	return (
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
	);
}
