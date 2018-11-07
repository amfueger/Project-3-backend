const express 	= require('express');
const router 	= express.Router();
const User 		= require('../Models/userModel.js');
const ChatKit = require('@pusher/chatkit-server');
const cors = require('cors')
const bodyParser = require('body-parser')


/***Static***/
const instanceLocator = 'v1:us1:1a9bd709-cbaf-4b9d-b48c-c1d84ce94ca3';
const testToken = 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/1a9bd709-cbaf-4b9d-b48c-c1d84ce94ca3/token';
const key = '706e0a3a-c916-46ec-a12d-531051dd25ba:ZlWxtkrmCs/p0aE6rjjTgk4CGchqmKb9RLMig3CSjfw='

const chatkit = new ChatKit.default({
	instanceLocator: instanceLocator,
	key: key
})

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
    	// const { username } = req.body.username
    	const createChatUser = await chatkit.createUser({
						id: req.body.username,
						name: req.body.username
					})
    	console.log(createChatUser);
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
	      status: 201,
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
    const authData = await chatkit.authenticate({ userId: req.query.user_id})

    if (user.length !== 0){
			res.status(authData.status).send(authData.body)
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