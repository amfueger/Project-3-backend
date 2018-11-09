const express 	= require('express');
const router 	= express.Router();
const Round 	= require('../models/roundModel.js');


/**************************************************************************************
 *********************************** RESTFUL ROUTES *********************************** 
 **************************************************************************************/

// ************************* ROUND INDEX ROUTE ***************************

router.get('/', async (req, res, next) => {
  // await Round.deleteMany();

  const rounds = await Round.find({});
    res.json({
      status: 200,
      data: rounds,
      session: req.session
    });
});


// ************************* ROUND CREATE ROUTE *************************

router.post('/', async (req, res, next) => {

  try {
    console.log(` ---------- req.body ----------\n`, req.body);
    const createdRound = await Round.create(req.body);

    console.log(` ---------- createdRound ----------\n`, createdRound);

    res.json({
      status: 200,
      data: createdRound
    });

		// ------------------------- FIND GAME ------------------------- 
		const game = await Game.findOne({id: req.body.currentGame._id});


		// ------------------------- MAKE ROUND ------------------------- 

		const round = await Round.create(req.body.currentGame.rounds);

		

  } catch(err){
    console.log(`---------- Error in Round .post ---------- \n`, err);
    res.send(err);
  }

});


// ************************* ROUND UPDATE ROUTE *************************

router.put('/:id', async (req, res, next) => {
  console.log(`----------------------------------------------------\n`, req.body);

  try {
    const updatedRound = await Round.findByIdAndUpdate(req.params.id, req.body, {new: true});
    console.log(`---------- updatedRound ---------- \n`, updatedRound)

      res.json({
        status: 200,
        data: updatedRound
        });    
      
  } catch(err){
    // console.error(`---------- Error in Round .put ---------- \n`, err)
  }
});



module.exports = router;

// ***********************************************************************
// ******************************** END **********************************
// ***********************************************************************