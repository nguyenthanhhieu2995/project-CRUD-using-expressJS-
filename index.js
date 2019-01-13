const express = require('express');
const bodyParser = require('body-parser');

const userRoute = require('./routes/user.route');
const port = 3000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));
// file public được định nghĩa là file tĩnh có thể truy xuất localhost:3000/.....

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/',(req,res) => {
	res.render('index',{ 
		name : 'Learn ExpressJS 2018'
	})
});

app.use('/users',userRoute);

app.listen(port, () => console.log('Server listening on port '+ port));