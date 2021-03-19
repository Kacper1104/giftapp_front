import React from "react";
import { Table, Button, ListGroup } from "react-bootstrap";
import { FaRegEye } from "react-icons/fa";
import { isMobile } from "react-device-detect";

export const EventsList = (props) => {
	const printTable = () => {
		return (
			<Table striped hover>
				<thead>
					<tr>
						<td className="align-middle">Nazwa wydarzenia</td>
						<td className="align-middle">Organizator</td>
						<td className="align-middle">Data wydarzenia</td>
						<td className="align-middle">Twoja rola</td>
						<td></td>
					</tr>
				</thead>
				<tbody>
					{props.data === undefined ? undefined : printTableRow(props.data)}
				</tbody>
			</Table>
		);
	};

	const printTableRow = (data) => {
		return data.map((event, index) => {
			//console.log(event);
			const { event_id, name, host, start_date, role } = event; //destructuring
			return (
				<tr
					key={index}
					onClick={() =>
						role === "Organiser"
							? props.callback(event_id, true)
							: props.callback(event_id, false)
					}
				>
					<td className="align-middle">{name}</td>
					<td className="align-middle">{host}</td>
					<td className="align-middle">
						{new Date(start_date).toLocaleDateString()}
					</td>
					<td className="align-middle">
						{role === "Organiser" ? "Organizator" : "Gość"}
					</td>
					<td>
						<Button variant="link" className="pull-right">
							<FaRegEye size="22" />
						</Button>
					</td>
				</tr>
			);
		});
	};

	const printListMobile = (data) => {
		return data.map((event, index) => {
			const { event_id, name, host, start_date, role } = event;
			return (
				<ListGroup
					variant="flush"
					className="my-2 border-top border-secondary"
					key={index}
					onClick={() =>
						role === "Organiser"
							? props.callback(event_id, true)
							: props.callback(event_id, false)
					}
				>
					<ListGroup.Item>{"Nazwa wydarzenia: " + name}</ListGroup.Item>
					<ListGroup.Item>{"Organizator: " + host}</ListGroup.Item>
					<ListGroup.Item>
						{"Data wydarzenia: " +
							new Date(start_date).toLocaleDateString("pl-PL", undefined)}
					</ListGroup.Item>
					<ListGroup.Item>
						{"Twoja rola: " + (role === "Organiser" ? "Organizator" : "Gość")}
					</ListGroup.Item>
					<ListGroup.Item
						variant="secondary"
						onClick={() => undefined}
						className="text-left"
					>
						<text className="mr-2">Pokaż</text>
						<FaRegEye size="22" />
					</ListGroup.Item>
				</ListGroup>
			);
		});
	};

	return (
		<div>
			{!props.data
				? undefined
				: isMobile
				? printListMobile(props.data)
				: printTable()}
			{!props.data || props.data.length === 0 ? (
				<p style={{ textAlign: "center" }}>Nie masz żadnych wydarzeń.</p>
			) : undefined}
		</div>
	);
};
