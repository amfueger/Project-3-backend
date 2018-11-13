const express = require('express');
const router 	= express.Router();
const Game    = require('../models/gameModel.js');
const Round   = require('../models/roundModel.js');
const Vote    = require('../models/voteModel.js');


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


// ************************* VOTE SHOW ROUTE ***************************

router.get('/:id', async (req, res, next) => {
  // await Vote.deleteMany();

  const vote = await Vote.findById(req.params._id);
    res.json({
      status: 200,
      data: vote,
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
    const gameToUpdate = await Game.findById(req.body.game._id);                    // Find Game

    if (gameToUpdate.rounds.length === 0) {                                         // If no rounds in game yet

      const roundZero = await Round.create({votes: createdVote});                   // Must create roundZero
      roundZero.votes.push(createdVote);                                            // Add vote to roundZero
      await roundZero.save();                                                       // Save roundZero
      gameToUpdate.rounds.push(roundZero)                                           // Add roundZero to game
     

      // console.log(` ---------- gameToUpdate with no rounds yet ----------\n`, gameToUpdate);
      // console.log(` ---------- roundZero before vote pushed ----------\n`, roundZero);
      // console.log(` ---------- roundZero after vote pushed ----------\n`, roundZero);

    } else {                                                                        // If Game already has rounds
      gameToUpdate.rounds[gameToUpdate.rounds.length-1].votes.forEach((vote, i) => {  // Check whether user has already voted
        if (vote.voter == req.body.voter) {                                           // If yes, do nothing 
          console.log(`---------- User has already voted ----------`);
        } else {                                                                      // If not, add vote
          gameToUpdate.rounds[gameToUpdate.rounds.length-1].votes.push(createdVote);
        }
      });
      console.log(` ---------- game rounds after vote pushed ----------\n`, gameToUpdate.rounds);
    }

    await gameToUpdate.save();

    res.json({
      status: 200,
      createdVote: createdVote,
      gameToUpdate: gameToUpdate
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