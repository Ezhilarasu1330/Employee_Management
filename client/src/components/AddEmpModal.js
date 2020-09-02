import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

import axios from 'axios';

export class AddEmpModal extends Component {

    constructor(props) {
        super(props);
        this.state = { deps: [], snackbaropen: false, snackbarmsg: '' };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        axios.get('/api/department').then(response => {
            if (response.data.status === 'SUCCESS') {
                this.setState({ deps: response.data.data });
            }
            else {
                this.setState({ deps: [] });
            }
        });
    }

    snackbarClose = (event) => {
        this.setState({ snackbaropen: false });
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = {
            employeeName: event.target.EmployeeName.value,
            department: event.target.Department.value,
            mailId: event.target.MailID.value,
            DOJ: event.target.DOJ.value
        }

        axios.post('/api/employee', data).then(response => {
            if (response.data.status === 'SUCCESS') {
                this.setState({ snackbaropen: true, snackbarmsg: 'Employee added successfully' });
            }
            else {
                this.setState({ snackbaropen: true, snackbarmsg: 'Unable to add employee' });
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
                            Add Employee
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="EmployeeName">
                                        <Form.Label>Employee Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="EmployeeName"
                                            placeholder="Enter Employee Name"
                                            required />
                                    </Form.Group>


                                    <Form.Group controlId="Department">
                                        <Form.Label>Department</Form.Label>
                                        <Form.Control as="select">
                                            {this.state.deps.map(dep =>
                                                <option key={dep._id} value={dep._id}>{dep.departmentName}</option>
                                            )}
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="MailID">
                                        <Form.Label>Employee Email</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="mailId"
                                            placeholder="Enter Employee Email ID"
                                            required />
                                    </Form.Group>

                                    <Form.Group controlId="DOJ">
                                        <Form.Label>Date Of Joining</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="DOJ"
                                            placeholder="Enter Date Of Joining"
                                            required />
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant="primary" type="submit"> Add Employee</Button>
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