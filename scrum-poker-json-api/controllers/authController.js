const express 	= require('express');
const router 	= express.Router();
const User 		= require('../Models/userModel.js');

// const bcrypt 	= require('bcrypt');

// **********************************************************************************
// ******************************** RESTFUL ROUTES **********************************
// **********************************************************************************


// ************************* REGISTER CREATE ROUTE ***************************

router.post('/register', async (req, res, next) => {

	try {
		// await User.deleteMany();

    // const user = await User.find({username: req.body.username}); // Check if user exists

    // if (user.length == 0){

    	console.log(`---------- .post /register - req.body: ----------\n`, req.body);

    	const password = req.body.password;
    	// Hash password
			// const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

	    // Create object {} for database entry
	    const userDbEntry 		= {};

	    userDbEntry.username 	= req.body.username;
	    userDbEntry.company 	= req.body.company;
	    userDbEntry.email 		= req.body.email;
	    userDbEntry.password 	= password;
	    // userDbEntry.password = passwordHash;

	    const createdUser = await User.create(userDbEntry);

	    console.log(`---------- .post /register - createdUser: ----------\n`, createdUser);

        // Initialize session (attach properties to session middleware, accessible through every route)
	    req.session.username = req.body.username;
	    req.session.logged   = true;
	    req.session.userId	 = createdUser.id;

    	console.log(`---------- .post /register - req.session: ----------\n`, req.session);

	    res.json({
	      status: 200,
	      data: 'login successful'
	    });
    
    // } else {
	    // console.log('Sorry! This username has already been taken :(');
    // }
	} catch(err){
    next(err);
	}
});


// ************************* LOGIN CREATE ROUTE ***************************

router.post('/login', async(req, res, next) => {

	try {
    const user = await User.find({username: req.body.username})

    if (user.length !== 0){

	    req.session.username = req.body.username;
	    req.session.logged   = true;
	    req.session.userId 	 = user[0]._id;

	    // res.redirect('/users/' + user[0]._id);

			console.log(`-------------------- User Entry --------------------\n`, req.session);

    } else {
			console.log(`-------------------- User Entry --------------------\n`, req.body);
    	console.log(`Invalid username`);
    	// res.redirect('/auth/login');
    }
	} catch(err){
	    next(err);
	}
});

// ************************* LOGOUT INDEX ROUTE ***************************

router.get('/logout', (req, res) => {
	req.session.destroy((err)=>{
		if(err){
   		res.send(err);
  	} else {
   		res.redirect('/auth/login');
  	}
  	});
});


module.exports = router;

// ***********************************************************************
// ******************************** END **********************************
// ***********************************************************************