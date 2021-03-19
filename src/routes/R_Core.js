const route = require('express').Router()
const InAktif = require("../models/M_inaktif");


route.get('/', async (req,res,next) => {
    try {
        const data = await InAktif.find()
        console.log(data.length);
        res.render('dashboard',{
            user : req.session.user.userData,
            title : "Dashboard",
            data : data
        })
    } catch (error) {
        console.log(error);
    }
})



module.exports = route
