import React, { useEffect, useState } from "react";
import { useData } from "../contexts/DataContext";
import { JsonToTable } from "react-json-to-table";
import { Form } from "react-bootstrap";
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
	const [options2, setOptions2] = useState([]);

	useEffect(() => {
		setDataGroup(options1[0]);
	}, [options1[0]]);

	useEffect(() => {
		if (currentData && dataGroup && currentData[dataGroup]) {
			setOptions2(Object.keys(currentData[dataGroup]));
		}
	}, [currentData, dataGroup]);

	const [dataNum, setDataNum] = useState();

	useEffect(() => {
		if (options2[0]) {
			setDataNum(options2[0]);
		}
	}, [options2[0], dataGroup]);

	return (
		<>
			<Select>
				<SelectOption
					as="select"
					onChange={(e) => {
						e.preventDefault();
						setDataGroup(e.currentTarget.value);
					}}
					defaultValue={options1[0]}
				>
					{options1.map((op) => (
						<option value={op} key={op}>
							{op}
						</option>
					))}
				</SelectOption>
				<SelectOption
					as="select"
					onChange={(e) => {
						e.preventDefault();
						setDataNum(e.currentTarget.value);
					}}
					defaultValue={options2[0]}
				>
					{options2.map((op) => (
						<option value={op} key={op}>
							{op}
						</option>
					))}
				</SelectOption>
			</Select>
			<Table>
				{dataNum}
				{currentData[dataGroup] && (
					<JsonToTable json={currentData[dataGroup][dataNum]} />
				)}
			</Table>
			{/* {currentData[dataGroup] && JSON.stringify(currentData[dataGroup])} */}
			{/* {dataNum} */}
		</>
	);
}
