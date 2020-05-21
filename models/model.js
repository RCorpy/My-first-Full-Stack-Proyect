const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    body:{
        type:String,
        required: true
    },
    newID:{
        type:Date,
        required: true
    }

})

const Model = mongoose.model('Task', Schema)

module.exports= Model