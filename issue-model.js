var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Issue = new Schema({
  issue_title: {type: String, required: true},
  issue_text: {type: String, required: true},
  created_on: Date,
  updated_on: Date,
  created_by: {type: String, required: true},
  assigned_to: String,
  open: Boolean,
  status_text: String
  

});

module.exports = mongoose.model('Issue', Issue);