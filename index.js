require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const authRoute = require('./routes/auth.route');
const userRoute = require('./routes/user.route');
const regRoute = require('./routes/register.route');

const validateAuth = require('./validate/auth.validate');

const port = 3000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser(process.env.SECRET_STRING));

app.use(express.static('public'));
// file public được định nghĩa là file tĩnh có thể truy xuất localhost:3000/.....

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/',(req,res) => {
	res.render('index',{ 
		name : 'Using NodeJS-ExpressJS to create User Management App'
	})
});

app.use('/register',regRoute);
app.use('/auth',authRoute);
app.use('/users',validateAuth.requireAuth,userRoute);

app.listen(port, () => console.log('Server listening on port '+ port));