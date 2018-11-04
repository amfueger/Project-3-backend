const mongoose = require ('mongoose');


const teamSchema = new mongoose.Schema({
	team_name: {type: String, required: true}
});


module.exports = mongoose.Model('Team', TeamSchema);