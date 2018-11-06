const mongoose = require ('mongoose');
const User 	   = require('./userModel.js');
const Round    = require('./roundModel.js');


const GameSchema = new mongoose.Schema({
	title: 		  {type: String, require: true},
	description:  {type: String, require: true},
	scrum_master: User.schema,
	estimators:   [User.schema],
	rounds: 	  [Round.schema],
	date: 		  Date
});

module.exports = mongoose.model('Game', GameSchema);