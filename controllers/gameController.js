const express 	= require('express');
const router 	= express.Router();
const User 		= require('../models/userModel.js');
const Game 		= require('../models/gameModel.js');


/**************************************************************************************
 *********************************** RESTFUL ROUTES *********************************** 
 **************************************************************************************/

// ************************* GAME INDEX ROUTE ***************************

router.get('/', async (req, res, next) => {
  // await Game.deleteMany();

  const games = await Game.find({});
    res.json({
      status: 200,
      data: games,
      session: req.session
    });
});


// ************************* GAME SHOW ROUTE ***************************

router.get('/:id', async (req, res, next) => {

  const game = await Game.findById(req.params.id);
    res.json({
      status: 200,
      data: game,
      session: req.session
    });
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
    console.log(`---------- Error in Game .post ---------- \n`, err);
    res.send(err);
  }

});


// ************************* GAME UPDATE ROUTE *************************

router.put('/:id', async (req, res, next) => {
  console.log(`----------------------------------------------------\n`, req.body);

  try {
    const updatedGame = await Game.findByIdAndUpdate(req.params.id, req.body, {new: true});
    console.log(`---------- updatedGame ---------- \n`, updatedGame)

      res.json({
        status: 200,
        data: updatedGame
        });    
      
  } catch(err){
    // console.error(`---------- Error in Game .put ---------- \n`, err)
  }
});


// ************************* GAME DESTROY ROUTE *************************

router.delete('/:id', async (req, res, next) => {

});


module.exports = router;

// ***********************************************************************
// ******************************** END **********************************
// ***********************************************************************