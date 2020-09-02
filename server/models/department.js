const mongoose = require('mongoose');

const departmentSchema = mongoose.Schema({
    departmentName: {
        type: String,
        required: true,
        unique: 1
    }
}, { timestamps: true });


const Department = mongoose.model('Department', departmentSchema);
module.exports = { Department }