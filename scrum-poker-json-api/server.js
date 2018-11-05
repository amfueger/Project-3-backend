const express        = require('express');
const app            = express();
const bodyParser     = require('body-parser');
const methodOverride = require('method-override');
const cors           = require('cors');
const session        = require('express-session');
// const request 		 = require('superagent');

require('./db/db');

// const User = require('./models/user');

// app.use(express.static('public'));
app.use(methodOverride('_method'));

app.use(session({
  secret: "This is a string, the string of strings",
  resave: false,
  saveUninitialized: false // legal
}));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true, 
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

// app.use((req, res, next) => {
// 	if(req.session.loggedIn == undefined) {
// 		req.session.loggedIn = false
// 	}
// 	//next logically belongs outside in case I do more in this section
// 	next()
// });



const authController 	 = require('./Controllers/authController.js');
const userController 	 = require('./Controllers/userController.js');
// const calendarController = require('./Controllers/calendarController.js');
// const gitHubController   = require('./Controllers/gitHubController.js');

app.use('/auth', authController);
app.use('/user', userController);
// app.use('/calendar', calendarController);
// app.use('/gitHub', gitHubController);

// app.get('/seed', async (req, res) => {
//  //For later data 
// })

app.listen(process.env.PORT || 9000, () => {
  console.log('listening on port 9000');
	const today = new Date();
	console.log(today.toLocaleDateString('en-US') + ': ' + today.toLocaleTimeString('en-US'));
});