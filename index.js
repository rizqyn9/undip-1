const express = require('express')
const app = express()
const mongoose = require('mongoose')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const {flash} = require('express-flash-message')
var cookieParser = require("cookie-parser");
var path = require("path");

const expressLayout = require('express-ejs-layouts')


// Konfigurasi Server
const {PORT,SECRET,DB_URL} =require('./config')

//  Konfigurasi Database
mongoose.connect(DB_URL,{useNewUrlParser: true, useUnifiedTopology:true, useCreateIndex:true})
    .then(()=> console.log("Database Connected"))
    .catch(err => console.log(err))

const store = new MongoDBStore({
    uri : DB_URL,
    collection: "session"
})

// Middleware
// app.use(flash({ sessionKeyName: 'flashMessage' }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(flash({ sessionKeyName: 'flashMessage' }))

// Template Engines
app.set('halaman', path.join(__dirname, 'halaman'));
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'client')));
// app.use(expressLayout)

// menggunakan session
app.use(
    session({
        key: "user_sid",
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: false,
        store: store,
        cookie: { maxAge: 6000000 },
    })
);

// Route yang digunakan
app.use('/',require('./src/routes/R_Auth'))
app.use(require('./src/library/cekAuth'))
app.use('/dashboard', require('./src/routes/R_Core'))
app.use('/inaktif', require('./src/routes/R_Inaktif'))
app.use('/test', (req,res,next) => {
    console.log(req.session);
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})