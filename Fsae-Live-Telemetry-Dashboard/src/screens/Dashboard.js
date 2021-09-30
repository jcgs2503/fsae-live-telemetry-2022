import React, { useEffect, useState } from "react";
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
	const [dataGroup, setDataGroup] = useState(options1[0]);

	useEffect(() => {
		setDataGroup(options1[0]);
	}, [options1[0]]);

	// const options2 = Object.keys(currentData[options1[0]]);
	// const [dataNum, setDataNum] = useState(options2[0]);

	return (
		<>
			<Select>
				<SelectOption
					as="select"
					onChange={(e) => {
						setDataGroup(e.currentTarget.value);
					}}
				>
					{options1.map((op) => (
						<option value={op} key={op}>
							{op}
						</option>
					))}
				</SelectOption>
				{/* <SelectOption
					as="select"
					onChange={(e) => {
						setDataNum(e.currentTarget.value);
					}}
				>
					{options2.map((op) => (
						<option value={op} key={op}>
							{op}
						</option>
					))}
				</SelectOption> */}
			</Select>

			<Table>
				<JsonToTable json={currentData[dataGroup]} />
			</Table>
		</>
	);
}
