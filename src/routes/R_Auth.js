const router = require('express').Router()
const User = require('../models/M_user')
const route = require('./R_Core')
const moment = require('moment')

// ! AUTH
router.get('/',(req,res) => {
    res.status(200).render('signin', {
        title :"Sign In"
    })

})
// ! SIGN IN
router.post('/signin', async (req,res) => {
    try {
        let {email, password} = req.body
        // console.log(password);
        let user = await User.findOne({Email: email}).exec()
        if(!user) {
            // req.flash("alertMessage", "Username atau password salah")
            // req.flash("alertStatus", "fail")
            return res.status(401).redirect('/')
        } 
        // console.log(user);
        let passCheck = await user.validPassword(password)
        if(!passCheck) {
            console.log("Wrong Pass");
            res.redirect('/')
            return req.session.error = "Wrong Password"
        }
        let userData = {
            ...user._doc,
            Password:null
        }
        // console.log(userData);
        // console.log(`User log in :  as ${user}`);
        req.session.user = {
            userData : userData 
        }
        res.redirect('/dashboard')
    } catch (error) {
        console.log(error);     
    }
})

// ! SIGN UP
router.post('/signup', (req,res) => {
    try {
        const user                  = new User
        user.Username           = req.body.username
        user.Email                  = req.body.email
        user.Password           = user.encryptPassword(req.body.password)
        user.Created_At = Date.now()
        user.Created_Moment= moment().format('MMMM Do YYYY, h:mm:ss a')
        // console.log(user);
        user.save((err, result) => {
            if (err) {
                console.log(err)
                // req.flash("alertMessage", "Gagal mendaftarkan anggota baru. Email  atau username telah digunakan.")
                // req.flash("alertStatus", "fail")
                res.status(401).redirect('/')
            } else {
                console.log("New User Registered")
                // req.flash("alertMessage", "Berhasil menambahkan anggota baru")
                // req.flash("alertStatus", "success")
                console.log(result);
                res.status(201).redirect('/')
            }
        })

    } catch (error) {
        console.log(error);
        // req.flash("alertMessage", "Gagal menambahkan anggota baru. Server error")
        // req.flash("alertStatus", "fail")
        res.status(501).redirect('/admin')
    }

})

//  Logout
router.get('/keluar', (req,res,next) => {
    console.log("out");
    req.session.destroy((err) => {
        // delete session data from store, using sessionID in cookie
        if (err) throw err;
        res.clearCookie("user_sid");
        res.redirect('/authentication')
    });
})

module.exports= router