import React from 'react';
import { Form, Col } from "react-bootstrap";

export const ReserveGift = props => {



    return (
        <div>
            <Form>
                <Form.Row className="align-items-center">
                    <Col xs="auto" className="my-1">
                        <Form.Label className="mr-sm-2" htmlFor="inlineFormCustomSelect" srOnly>
                            Preference
                        </Form.Label>
                        <Form.Control
                            as="select"
                            className="mr-sm-2"
                            id="inlineFormCustomSelect"
                            custom
                        >
                            <option value="0">Wybierz...</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </Form.Control>
                    </Col>
                </Form.Row>
            </Form>
        </div>
    );
};
