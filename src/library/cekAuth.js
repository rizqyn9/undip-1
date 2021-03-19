const cek = (req,res,next) => {
    const {user} = req.session
    if(user) {
        // console.log(user);
        next()
    } else {
        console.log("Login firs");
        res.redirect('/')
    }
}

module.exports = cek