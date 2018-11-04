const express        = require('express');
const app            = express();
const bodyParser     = require('body-parser');
const methodOverride = require('method-override');
const session        = require('express-session');
const request 		 = require('superagent');
const PORT           = 3000;

require('./db/db');

const User = require('./models/user');


app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
  secret: "This is a string, the string of strings",
  resave: false,
  saveUninitialized: false // legal
}))


// app.use((req, res, next) => {
// 	if(req.session.loggedIn == undefined) {
// 		req.session.loggedIn = false
// 	}
// 	//next logically belongs outside in case I do more in this section
// 	next()
// });



const profileController = require('./controllers/profileController');
const userController = require('./controllers/userController');
const authController = require('./controllers/authController');

app.use('/profile', profileController);
app.use('/user', userController);
app.use('/auth', authController);

  
});

// app.get('/seed', async (req, res) => {
//  //For later data 
// })


app.listen(PORT, () => {
	const today = new Date();
	console.log((today.toLocaleDateString('en-US') + ': ' + today.toLocaleTimeString('en-US')));
})