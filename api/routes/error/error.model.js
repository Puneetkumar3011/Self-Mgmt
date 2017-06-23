var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    detail: {type: String, required: true},
    createdOn: {type: Date, required: true}
});

module.exports = mongoose.model('TaskError', schema);