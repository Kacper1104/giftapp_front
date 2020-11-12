import React from 'react';
import { Table, Button } from "react-bootstrap";

export const EventsList = props => {

    const printRow = (data) => {
        return data.map((event, index) => {
            //console.log(event);
            const { event_id, name, start_date, role } = event //destructuring
            return (
                <tr key={event_id} onClick={() => role === "Organiser" ? props.callback(event_id, true) : props.callback(event_id, false)}>
                    <td>{event_id}</td>
                    <td>{name}</td>
                    <td>{new Date(start_date).toLocaleDateString()}</td>
                    <td>{role === "Organiser" ? "Organizator" : "Gość"}</td>
                </tr>
            )
        });
    };

    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>Nazwa</td>
                        <td>Data wydarzenia</td>
                        <td>Rola</td>
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
