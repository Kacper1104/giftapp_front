import React, { Component } from 'react';
import { ListGroup, Table } from "react-bootstrap";
import { isMobile } from "react-device-detect";

export const CodesList = props => {
    const printTable = (data) => {
        return isMobile ?
         data.map((row, index) => {
            const {id, code, invitee} =  row ; //deconstruction
            return (<ListGroup variant="flush" className="my-2 border-top border-secondary" key={id}>
                        <ListGroup.Item>{"Kod dostępu: " + code}</ListGroup.Item>
                        <ListGroup.Item>{"Przypisany gość: " + invitee}</ListGroup.Item>
                    </ListGroup>);
        })
        :
        (<Table striped bordered hover>
            <thead>
                <tr>
                    <td>Kod dostępu</td>
                    <td>Przypisany gość</td>
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) => {
                    //console.log(event);
                    const {id, code, invitee} =  row ; //deconstruction
                    return (<tr key={index}>
                        <td>{code}</td>
                        <td>{invitee}</td>
                    </tr>);
                })}
            </tbody>
        </Table>);

    };

    return (
        <div>
            {props.data === undefined ? undefined : printTable(props.data)}
        </div>
    );
};
