import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

import axios from 'axios';

export class EditEmpModal extends Component {

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
            empId: event.target.empId.value,
            empName: event.target.empName.value,
            deptId: event.target.deptname.value,
            mailId: event.target.mailId.value,
            doj: event.target.doj.value
        }

        axios.put('/api/employee', data).then(response => {
            if (response.data.status === 'SUCCESS') {
                this.setState({ snackbaropen: true, snackbarmsg: 'Employee Updated successfully' });
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
                            Edit Employee
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>

                                    <Form.Group controlId="empId">
                                        <Form.Label>Employee ID</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="empId"
                                            disabled
                                            defaultValue={this.props.empid}
                                            required />
                                    </Form.Group>

                                    <Form.Group controlId="empName">
                                        <Form.Label>Employee Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="empName"
                                            placeholder="Enter Employee Name"
                                            defaultValue={this.props.empname}
                                            required />
                                    </Form.Group>

                                    <Form.Group controlId="deptname">
                                        <Form.Label>Department</Form.Label>
                                        <Form.Control
                                            as="select"
                                            defaultValue={this.props.deptname}>
                                            {this.state.deps.map(dep =>
                                                <option key={dep._id} value={dep._id}>{dep.departmentName}</option>
                                            )}
                                        </Form.Control>
                                    </Form.Group>


                                    <Form.Group controlId="mailId">
                                        <Form.Label>Employee Email</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="mailId"
                                            placeholder="Enter Employee Email ID"
                                            defaultValue={this.props.mailid}
                                            required />
                                    </Form.Group>

                                    <Form.Group controlId="doj">
                                        <Form.Label>Date Of Joining</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="DOJ"
                                            placeholder="Enter Date Of Joining"
                                            defaultValue={this.props.doj}
                                            required />
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant="primary" type="submit">Update Employee</Button>
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