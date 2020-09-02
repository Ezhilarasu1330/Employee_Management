import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { Button, ButtonToolbar } from 'react-bootstrap';

import { AddDeptModal } from './AddDeptModal';
import { EditDeptModal } from './EditDeptModal';

import axios from 'axios';

export class Department extends Component {

    constructor(props) {
        super(props);
        this.state = { deps: [], addModalShow: false, editModalShow: false }
    }

    componentDidMount() {
        this.refreshList();
    }

    componentDidUpdate(prevProps, prevState) {
        // only update if not match I don't know what's your data is so add a 
        // simple check like we use for strings.
        if (prevState.data !== this.state.data) {
            this.refreshList();
        }
    }

    // componentDidUpdate() {
    //     this.refreshList();
    // }

    async deleteDepartment(departmentId) {
        if (window.confirm('Are you sure ?')) {
            await axios.delete('/api/department/' + departmentId).then(response => {
                if (response.data.status === 'SUCCESS') {
                    this.refreshList();
                }
                else {
                }
            });
        }
    }

    refreshList() {
        axios.get('/api/department').then(response => {
            if (response.data.status === 'SUCCESS') {
                this.setState({ deps: response.data.data });
            }
            else {
                this.setState({ deps: [] });
            }
        });
    }

    render() {

        const { deps, departmentId, departmentName } = this.state;
        let addModalClose = () => this.setState({ addModalShow: false });
        let editModalClose = () => this.setState({ editModalShow: false });

        return (
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Department ID</th>
                            <th>Department Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deps.map(depObj =>
                            <tr Key={depObj._id}>
                                <td>{depObj._id}</td>
                                <td>{depObj.departmentName}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant='info'
                                            onClick={() => this.setState({
                                                editModalShow: true,
                                                departmentId: depObj._id,
                                                departmentName: depObj.departmentName
                                            })} >Edit</Button>


                                        <Button className="mr-2" variant='danger'
                                            onClick={() => this.deleteDepartment(depObj._id)} >Delete</Button>

                                        <EditDeptModal
                                            show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            departmentid={departmentId}
                                            departmentname={departmentName}
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
                        Add Department
                </Button>

                    <AddDeptModal
                        show={this.state.addModalShow}
                        onHide={addModalClose}
                    />

                </ButtonToolbar>
            </div>
        );
    }
}