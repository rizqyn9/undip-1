const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Users = new mongoose.Schema({
    Username:{
        type:String,
        unique:true,
        required: true
    },
    Email:{
        type:String,
        required: true,
        unique:true
    },
    Password:{
        type:String,
        required: true,
    },
    Profile : {
        type: String,
        default: "default"
    },
    Created_At: {
        type : Date,
        default: Date.now
    },
    Posisi: {
        type: String
    },
    Created_Moment: {
        type: String
    }
})

Users.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10),null)
}
Users.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.Password);
};

module.exports = mongoose.model('User',Users)