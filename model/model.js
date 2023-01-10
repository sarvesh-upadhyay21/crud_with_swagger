const mongoose = require('mongoose');

//  Model that will define our database structure.
const dataSchema = new mongoose.Schema({
    companyName: {
        required: true,
        type: String
    },
    userName: {
        required: true,
        type: String
    },
    age: {
        required: true,
        type: Number
    },
    email: {
        required: true,
        type: String
    },
    phone: {
        required: true,
        type: Number
    },
    pincode: {
        required: true,
        type: Number
    },
    subscriptionId: {
        required: true,
        type: Number
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    // address: {
    //     street: {
    //         required: true,
    //         type: String
    //     },
    //     city: {
    //         required: true,
    //         type: String
    //     },

    // }


})

module.exports = mongoose.model('Data', dataSchema)