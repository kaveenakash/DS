const mongoose = require('mongoose')
const Schema = mongoose.Schema

const adminSchema = new Schema({

    adminEmail:{
        type:String,
        required:true
    },
    adminName:{
        type:String,
        required:true
    },
    adminPassword:{
        type:String,
        required:true
    }
},{timestamps:true})

const Admin = mongoose.model('Admin',adminSchema)

module.exports = Admin
