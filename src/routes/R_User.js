const router = require('express').Router()
const User = require('../models/M_user')

router.get('/',async(req,res,next) => {
    // console.log(req.session.user.userData._id);
    const dataUser = await User.findById(req.session.user.userData._id)
    res.status(200).render('user',{
        user : req.session.user.userData,
        title : `Pengaturan Pengguna ${dataUser.Username}`,
        data : dataUser
    })
})

router.post('/', async (req,res,next) => {
    try {
        const update = await User.findByIdAndUpdate(req.body.id, {
            ...req.body
        })
        if (req.body.Password.split(' ').join('').length < 1) {
            console.log("Kosong");
            return res.status(201).redirect('/user')
        } else {
            update.Password = update.encryptPassword(req.body.Password)
            update.save((err,data) => {
                if(err){
                    console.log(err);
                    res.status(501).redirect('/user')

                } else{
                    console.log(data);
                    res.status(201).redirect('/user')
                }
            })

        }
        res.status(501).redirect('/user')
    } catch (error) {
        console.log(error);
        res.status(501).redirect('/user')
    }
})

module.exports = router