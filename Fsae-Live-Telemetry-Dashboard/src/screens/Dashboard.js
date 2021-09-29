import React from "react";
import { useData } from "../contexts/DataContext";
import { JsonToTable } from "react-json-to-table";
import { Button, Form } from "react-bootstrap";
import styled from "@emotion/styled";

const SelectOption = styled(Form.Control)`
	margin-left: 20px;
`;

const Select = styled.div`
	margin-top: 20px;
	margin-right: 20px;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;

const Table = styled.div`
	margin: 20px 20px;
`;

export default function Dashboard() {
	const { currentData } = useData();
	const options1 = Object.keys(currentData);
	return (
		<>
			<Select>
				<SelectOption as="select">
					<option>1</option>
					<option>2</option>
				</SelectOption>
				<SelectOption as="select">
					<option>1</option>
					<option>2</option>
				</SelectOption>
			</Select>

			<Table>
				<JsonToTable json={currentData} />
			</Table>
		</>
	);
}
