import React from 'react';
import { Table, Button } from "react-bootstrap";
import { FaRegEye } from "react-icons/fa";

export const EventsList = props => {

    const printRow = (data) => {
        return data.map((event, index) => {
            //console.log(event);
            const { event_id, name, host, start_date, role } = event //destructuring
            return (
                <tr key={event_id} onClick={() => role === "Organiser" ? props.callback(event_id, true) : props.callback(event_id, false)}>
                    <td className="align-middle">{name}</td>
                    <td className="align-middle">{host}</td>
                    <td className="align-middle">{new Date(start_date).toLocaleDateString()}</td>
                    <td className="align-middle">{role === "Organiser" ? "Organizator" : "Gość"}</td>
                    <td><Button variant="link" className="pull-right"><FaRegEye size="22" /></Button></td>
                </tr>
            )
        });
    };

    return (
        <div>
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
                    {props.data === undefined ? undefined : printRow(props.data)}
                </tbody>
            </Table>
            { !props.data || props.data.length === 0 ? <p style={{ textAlign: "center" }}>Nie masz żadnych wydarzeń.</p> : undefined}
        </div>
    );
};
