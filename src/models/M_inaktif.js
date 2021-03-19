const mongoose = require('mongoose')

const InAktif = new mongoose.Schema({
    No_Arsip : {
        type: Number
    },
    Tanggal_Input : {
        type:String
    },
    Tanggal_Edit : {
        type : String,
    },
    Properties:{
        Author:{
            type:String,
        },
        Bulan:{
            type: String,
        },
        Tahun:{
            type: String,
        }
    },
    Kode_Klasifikasi:{
        type:String,
    },
    Unit_Pengolah : {
        type: String
    },
    Uraian : {
        type: String
    },
    Kelengkapan : {
        type : String
    },
    Media: {
        type : String,
    },
    Lokasi_Arsip: {
        type:String
    },
    Tingkat_Perkembangan: {
        type : String,
    },
    Date_Created: {
        type : Date,
    },
    Last_Modified: {
        type : Date,
        default: Date.now
    },
    Nomor_Boks: {
        type: Number
    },
    File : {
        type : String
    }
})

module.exports = mongoose.model('InAktif', InAktif)
