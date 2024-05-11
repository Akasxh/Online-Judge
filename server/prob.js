const mongoose = require("mongoose");

const ProbSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    tag: {
        type:String
    }
},{collection:'Problems'})

const Prob = mongoose.model('Problems', ProbSchema);

module.exports= {Prob};