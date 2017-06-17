var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    id: {type: String},
    description: {type: String, required: true}
});

module.exports = mongoose.model('TaskMgmt', schema);