const express 	= require('express');
const router 	= express.Router();
const User 		= require('../Models/userModel.js');
const Game 		= require('../Models/gameModel.js');


/**************************************************************************************
 *********************************** RESTFUL ROUTES *********************************** 
 **************************************************************************************/

// ************************* GAME INDEX ROUTE ***************************

router.get('/:id', async (req, res, next) => {

  const games = await Game.find({});
    res.json({
      status: 200,
      data: games,
      session: req.session
    });
});

// ************************* GAME SHOW ROUTE *************************** Logged or no logged shows a user's page

router.get('/:id', async (req, res, next) => {

});


// ************************* GAME NEW ROUTE ****************************

router.get('/new', (req, res) => {

});


// ************************* GAME EDIT ROUTE ***************************

router.get('/:id/edit', async (req, res, next) => {	

});


// ************************* GAME CREATE ROUTE *************************

router.post('/', async (req, res, next) => {

  try {
    console.log(` ---------- req.body ----------\n`, req.body);
    const createdGame = await Game.create(req.body);

    console.log(` ---------- createdGame ----------\n`, createdGame);

    res.json({
      status: 200,
      data: createdGame
    });

  } catch(err){
    console.log(`Error in Game .post: `, err);
    res.send(err);
  }

});


// ************************* GAME UPDATE ROUTE *************************

router.put('/:id', async (req, res, next) => {

});


// ************************* GAME DESTROY ROUTE *************************

router.delete('/:id', async (req, res, next) => {

});


module.exports = router;

// ***********************************************************************
// ******************************** END **********************************
// ***********************************************************************