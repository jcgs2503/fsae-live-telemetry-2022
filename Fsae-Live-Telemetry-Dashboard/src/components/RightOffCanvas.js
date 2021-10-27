import React from "react";
import styled from "@emotion/styled";
import OffCanvas from "react-bootstrap/Offcanvas";

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

export default function RightOffCanvas({ rightShow, handleRightClose }) {
	return (
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
	);
}
