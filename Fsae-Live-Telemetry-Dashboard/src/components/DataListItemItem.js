import React from "react";
import styled from "@emotion/styled";
import Form from "react-bootstrap/Form";

const ListItemItem = styled.div`
	width: 90%;
	margin-top: 8px;
	border-radius: 2px;
	padding-top: 10px;
	padding-bottom: 10px;
	display: flex;
	justify-content: space-between;
	padding-left: 10px;
	padding-right: 10px;
	border: 1px #dbdbdb solid;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
	height: 50px;
`;

const Check = styled.input`
	width: 20px;
	height: 20px;
	padding: 0px;
	position: relative;
	top: 3px;
`;

export default function DataListItemItem({
	display,
	name,
	checked,
	setChosedData,
}) {
	if (display) {
		return (
			<ListItemItem>
				{name}
				<Check
					type="checkbox"
					checked={checked}
					onChange={() => {
						setChosedData((init) => {
							let copy = Object.assign({}, init);
							copy[name] = !copy[name];
							return copy;
						});
					}}
				/>
			</ListItemItem>
		);
	} else {
		return <></>;
	}
}
