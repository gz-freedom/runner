const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for PBLog
let PBLog = new Schema({
    logDate: {
        type: Date
    },
    type: {
        type: Number
    },
    score: {
        type: Number
    },
    note: {
        type: String
    }
},{
    collection: 'pb'
});

module.exports = mongoose.model('PBLog', PBLog);