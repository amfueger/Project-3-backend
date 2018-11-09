const express 	= require('express');
const router 	= express.Router();
const Vote 		= require('../models/voteModel.js');


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
    const createdVote = await Vote.create(req.body);

    console.log(` ---------- createdVote ----------\n`, createdVote);

    res.json({
      status: 200,
      data: createdVote
    });

  } catch(err){
    console.log(`---------- Error in Vote .post ---------- \n`, err);
    res.send(err);
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