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


// ************************* VOTE CREATE ROUTE *************************

router.post('/', async (req, res, next) => {

  try {
    console.log(` ---------- req.body ----------\n`, req.body);


    // ------------------------- CREATE VOTE ------------------------- 

    const createdVote = await Vote.create(req.body);

    await createdVote.save();

    console.log(` ---------- createdVote ----------\n`, createdVote);

    // ------------------------- ADD VOTE TO GAME ROUND ------------------------- 

    const gameToUpdate = await Game.findById(req.body.currentGameState.currentGame._id);

    if (gameToUpdate.rounds.length === 0) {          
      const roundForGame = await Round.create({
        votes: createdVote
      });                       // If no rounds in game yet, must instantiate one
      
      console.log(` ---------- roundForGame ----------\n`, roundForGame);

      roundForGame.votes.push(createdVote);

      await roundForGame.save();

      console.log(` ---------- roundForGame after vote pushed ----------\n`, roundForGame);

      gameToUpdate.rounds.push(roundForGame)                                      // Then add it to game
     

      // gameToUpdate.rounds[0].votes.push(createdVote);                          // Add votes to round 0
      // console.log(` ---------- gameToUpdate ----------\n`, gameToUpdate);

    } else {
      console.log(` ---------- gameToUpdate  ----------\n`, gameToUpdate);
      
      gameToUpdate.rounds.forEach((round, i)=>{
        console.log(` ---------- round[`+i+`] ----------\n`, round );
      // console.log(` ---------- gameToUpdate.rounds[0].votes ----------\n`, gameToUpdate.rounds[0].votes);
      })

      gameToUpdate.rounds[gameToUpdate.rounds.length-1].votes.push(createdVote);
      console.log(` ---------- gameToUpdate.rounds after vote pushed ----------\n`, gameToUpdate.rounds);
    }


    // console.log(`gameToUpdate.rounds.length: `, gameToUpdate.rounds.length);
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