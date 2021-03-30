const route = require("express").Router();
const InAktif = require("../models/M_inaktif");

//  Show Table Inaktif
route.get('/', async(req,res,next) => {
    try {
        const data = await InAktif.find()
        // console.log(data.length);
        // console.log(req.session.user.userData);
        res.render('inaktif',{
            user : req.session.user.userData,
			title : "Surat Inaktif",
            data : data
        })

    } catch (error) {
        console.log(error);
    }
})


//  Show form data input
route.get("/input", (req, res, next) => {
	res.render("input",{
		user : req.session.user.userData,
		title : "Input Inaktif",
	});
});

//  Saved form data input
route.post("/input", async (req, res, next) => {
    console.log({...req.body});
	try {
		const inaktif = new InAktif({
			...req.body,
				Properties : {
					Author : req.body.Author,
					Bulan : req.body.Bulan,
					Tahun: req.body.Tahun
				},
				Date_Created: Date.now()
		});

		await inaktif.save((err, result) => {
			if (err) {
				// console.log("error : ", err);
				return res.redirect('/inaktif')
			} else {
				// console.log("Success : ", result);
				return res.redirect("/inaktif");
			}
		})
	} catch (err) {
		console.log(err);
		res.redirect('/inaktif')
	}
});


// Open a data from database
route.get('/:id',async (req,res,next) => {
	try {
		// console.log(req.params.id);
		const data = await InAktif.findById(req.params.id)
		// console.log(data);
		res.render('inputEdit', {
            user : req.session.user.userData,
			data : data,
			title : "Edit data"
		})
	} catch (error) {
		console.log(error);
		
	}
})

// Edit single data from database
route.post('/:id', async(req,res,next) => {
	// console.log(req.body);
	try {
		const data = await InAktif.findByIdAndUpdate(req.params.id,{
			Properties : {
				Author : req.body.Author,
				Bulan : req.body.Bulan,
				Tahun: req.body.Tahun
			},
			},
		)
		.then(data => {
			res.redirect("/inaktif")
		})
	} catch (error) {
		console.log(error);
	}
})

module.exports = route;