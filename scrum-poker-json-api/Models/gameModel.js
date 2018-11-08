const mongoose = require ('mongoose');
const User 	   = require('./userModel.js');
const Round    = require('./roundModel.js');


const GameSchema = new mongoose.Schema({
	title: 		  {type: String, required: true},
	description:  {type: String, required: true},
	scrum_master: User.schema,
	estimators:   [User.schema],
	rounds: 	  [Round.schema],
	status: 	  {type: String, required: true, enum: ['Pending', 'Current', 'Past']},
	roomId: 	  {type: String},
	date: 		  Date
});

module.exports = mongoose.model('Game', GameSchema);