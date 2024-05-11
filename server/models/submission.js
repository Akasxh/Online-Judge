const mongoose = require("mongoose");

const SubSchema = mongoose.Schema({
  language: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  submittedAt: {
    type: String,
    required:true
  },
  verdict: {
    type: String,
    required:true
  },
  problemid: {
    type:String,
    required: true
  },
  probname:{
    type:String,
    required:true
  },
  usermail: {
    type:String,
    required: true
  }
});

const Sub = mongoose.model("Submission", SubSchema);
module.exports = {Sub}