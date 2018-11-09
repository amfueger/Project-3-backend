const mongoose = require('mongoose');
const Vote = require('./voteModel');


const RoundSchema = new mongoose.Schema({
	votes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Vote'}]
});


module.exports = mongoose.model('Round', RoundSchema);