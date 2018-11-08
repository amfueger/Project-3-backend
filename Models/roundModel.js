const mongoose = require('mongoose');
const Vote = require('./voteModel.js');


const RoundSchema = new mongoose.Schema({
	votes: [Vote.schema]
});


module.exports = mongoose.model('Round', RoundSchema);