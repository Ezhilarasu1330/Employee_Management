import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { Button, ButtonToolbar } from 'react-bootstrap';

import { AddEmpModal } from './AddEmpModal';
import { EditEmpModal } from './EditEmpModal';

import axios from 'axios';

export class Employee extends Component {

    constructor(props) {
        super(props);
        this.state = { emps: [], addModalShow: false, editModalShow: false }
    }

    componentDidMount() {
        this.refreshList();
    }

    // componentDidUpdate() {
    //     this.refreshList();
    // }

    refreshList() {
        axios.get('/api/employee').then(response => {
            if (response.data.status === 'SUCCESS') {
                this.setState({ emps: response.data.data });
            }
            else {
                this.setState({ emps: [] });
            }
        });
    }

    async deleteEmployee(empId) {
        if (window.confirm('Are you sure ?')) {
            await axios.delete('/api/employee/' + empId).then(response => {
                if (response.data.status === 'SUCCESS') {
                    this.refreshList();
                }
                else {
                }
            });
        }
    }

    render() {

        const { emps, empId, empName, deptName, mailId, doj } = this.state;
        let addModalClose = () => this.setState({ addModalShow: false });
        let editModalClose = () => this.setState({ editModalShow: false });

        return (
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Employee ID</th>
                            <th>Employee Name</th>
                            <th>Department</th>
                            <th>Mail ID</th>
                            <th>DOJ</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {emps.map(empObj =>
                            <tr key={empObj._id}>
                                <td>{empObj._id}</td>
                                <td>{empObj.employeeName}</td>
                                <td>{empObj.department.departmentName}</td>
                                <td>{empObj.mailId}</td>
                                <td>{empObj.DOJ}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant='info'
                                            onClick={() => this.setState({
                                                editModalShow: true,
                                                empId: empObj._id,
                                                empName: empObj.employeeName,
                                                deptName: empObj.department.departmentName,
                                                mailId: empObj.mailId,
                                                doj: empObj.DOJ
                                            })} >Edit</Button>


                                        <Button className="mr-2" variant='danger'
                                            onClick={() => this.deleteEmployee(empObj._id)} >Delete</Button>

                                        <EditEmpModal
                                            show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            empid={empId}
                                            empname={empName}
                                            deptname={deptName}
                                            mailid={mailId}
                                            doj={doj}
                                        />

                                    </ButtonToolbar>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                        onClick={() => this.setState({ addModalShow: true })} >
                        Add Employee
                </Button>

                    <AddEmpModal
                        show={this.state.addModalShow}
                        onHide={addModalClose}
                    />

                </ButtonToolbar>
            </div>
        );
    }
}