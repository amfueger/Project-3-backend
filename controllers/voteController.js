const express 	= require('express');
const router 	= express.Router();
const Vote 		= require('../models/voteModel.js');
const Game    = require('../models/gameModel.js');


/**************************************************************************************
 *********************************** RESTFUL ROUTES *********************************** 
 **************************************************************************************/

// ************************* VOTE INDEX ROUTE ***************************

router.get('/', async (req, res, next) => {
  // await Vote.deleteMany();

  const votes = await Vote.find({});
    res.json({
      status: 200,
      data: votes,
      session: req.session
    });
});


// ************************* VOTE CREATE ROUTE *************************

router.post('/', async (req, res, next) => {

  try {
    console.log(` ---------- req.body ----------\n`, req.body);


    // ------------------------- CREATE VOTE ------------------------- 

    const createdVote = await Vote.create(req.body);

    await createdVote.save();

    console.log(` ---------- createdVote ----------\n`, createdVote);

    // ------------------------- ADD VOTE TO GAME ROUND ------------------------- 

    const updatedGame = await Game.findById(req.body.currentGameState.currentGame._id);

    updatedGame.rounds[updatedGame.rounds.length-1].votes.push(createdVote);
    // console.log(`updatedGame.rounds.length: `, updatedGame.rounds.length);
    await updatedGame.save();

    console.log(` ---------- updatedGame ----------\n`, updatedGame);

    res.json({
      status: 200,
      createdVote: createdVote,
      updatedGame: updatedGame
    });

  } catch(err){
    console.log(`---------- Error in Vote .post ---------- \n`, err);
    res.json({
      status: 400,
      data: 'Unable to Create Vote'
    });
  }

});


// ************************* VOTE UPDATE ROUTE *************************

router.put('/:id', async (req, res, next) => {
  console.log(`----------------------------------------------------\n`, req.body);

  try {
    const updatedVote = await Vote.findByIdAndUpdate(req.params.id, req.body, {new: true});
    console.log(`---------- updatedVote ---------- \n`, updatedVote)

      res.json({
        status: 200,
        data: updatedVote
        });    
      
  } catch(err){
    // console.error(`---------- Error in Vote .put ---------- \n`, err)
  }
});



module.exports = router;

// ***********************************************************************
// ******************************** END **********************************
// ***********************************************************************