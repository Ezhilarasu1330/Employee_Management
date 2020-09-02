const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = mongoose.Schema({
    employeeName: {
        type: String,
        required: true
    },
    department: {
        type: Schema.Types.ObjectId,
        ref: "Department",
        required: true
    },
    mailId: {
        type: String,
        required: true,
        trin: true,
        unique: 1
    },
    DOJ: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = { Employee }