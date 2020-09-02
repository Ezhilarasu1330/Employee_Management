const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

/* Models */
const { Department } = require('./models/department');
const { Employee } = require('./models/employee');

//=================================
//             DEPARTMENT
//=================================
app.get('/api/department', (req, res) => {
    Department.find({}, (err, departList) => {
        if (err) {
            return res.json({ status: "ERROR", err });
        }
        else {
            res.status(200).json({
                status: "SUCCESS",
                data: departList
            })
        }
    })
})

app.post('/api/department', (req, res) => {
    const DepartmentObj = new Department(req.body);

    DepartmentObj.save((err, doc) => {
        if (err) {
            return res.json({ status: "ERROR", err });
        }
        else {
            res.status(200).json({
                status: "SUCCESS",
                message: 'Department added successfully.',
                data: doc
            })
        }
    })
})

app.put('/api/department', (req, res) => {

    const data = { departmentName: req.body.departmentName };
    Department.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.body.departmentId) }, data, { new: true }, (err, doc) => {
        if (err) {
            return res.json({ status: "ERROR", err });
        }
        else {
            res.status(200).json({
                status: "SUCCESS",
                message: 'Department updated successfully.',
                data: doc
            })
        }
    })
})

app.delete('/api/department/:id', (req, res) => {
    let departmentId = req.params.id;
    Department.deleteOne({ _id: departmentId }, (err, doc) => {
        if (err) {
            return res.json({ status: "ERROR", err });
        }
        else {
            res.status(200).json({
                status: "SUCCESS",
                message: 'Department deleted successfully.',
                data: doc
            })
        }
    })
})


//=================================
//             EMPLOYEE
//=================================
app.get('/api/employee', (req, res) => {
    Employee.find({}).populate({ path: 'department', model: 'Department' }).exec(function (err, departList) {
        if (err) {
            return res.json({ status: "ERROR", err });
        }
        else {
            res.status(200).json({
                status: "SUCCESS",
                data: departList
            })
        }
    })
})

app.post('/api/employee', (req, res) => {
    const EmployeeObj = new Employee(req.body);
    EmployeeObj.save((err, doc) => {
        if (err) {
            return res.json({ status: "ERROR", err });
        }
        else {
            res.status(200).json({
                status: "SUCCESS",
                message: 'Employee added successfully.',
                data: doc
            })
        }
    })
})

app.put('/api/employee', (req, res) => {
    const data = {
        employeeName: req.body.empName,
        department: req.body.deptId,
        mailId: req.body.mailId,
        DOJ: req.body.doj
    }

    Employee.findOneAndUpdate({ _id: req.body.empId }, data, { new: true }, (err, doc) => {
        if (err) {
            return res.json({ status: "ERROR", err });
        }
        else {
            res.status(200).json({
                status: "SUCCESS",
                message: 'Employee updated successfully.',
                data: doc
            })
        }
    })
})

app.delete('/api/employee/:id', (req, res) => {
    let empId = req.params.id;
    Employee.deleteOne({ _id: empId }, (err, doc) => {
        if (err) {
            return res.json({ status: "ERROR", err });
        }
        else {
            res.status(200).json({
                status: "SUCCESS",
                message: 'Employee deleted successfully.',
                data: doc
            })
        }
    })
})

const port = process.env.PORT || 3002;

app.listen(port, () => {
    console.log(`Server running at ${port}`);
})