import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

import axios from 'axios';

export class AddDeptModal extends Component {

    constructor(props) {
        super(props);

        this.state = { snackbaropen: false, snackbarmsg: '' };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    snackbarClose = (event) => {
        this.setState({ snackbaropen: false });
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = {
            departmentName: event.target.DepartmentName.value
        }

        axios.post('/api/department', data).then(response => {
            if (response.data.status === 'SUCCESS') {
                this.setState({ snackbaropen: true, snackbarmsg: 'Department added successfully' });
            }
            else {
                this.setState({ snackbaropen: true, snackbarmsg: 'Unable to add department' });
            }
        });
    }

    render() {
        return (
            <div className="container">

                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={this.state.snackbaropen}
                    autoHideDuration={3000}
                    onClose={this.snackbarClose}
                    message={<span id="message-id">{this.state.snackbarmsg}</span>}

                    action={[
                        <IconButton
                            key="close"
                            aria-label="close" color="inherit" onClick={this.state.snackbarmsg}
                        >x</IconButton>
                    ]}
                />

                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add Department
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="DepartmentName">
                                        <Form.Label>Department Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="DepartmentName"
                                            placeholder="Enter Department Name"
                                            required />
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant="primary" type="submit"> Add Department</Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}