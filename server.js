// require needed libs
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

// load params
const env = process.env.NODE_ENV ? process.env.NODE_ENV.replace(/\s/g, '') : "dev";
const port = process.env.PORT || 8080;
const __TEST__ = env && env.indexOf("test") > -1 ? true : false;
const __DEV__ = env && env.indexOf("dev") > -1 ? true : false;

// load config
var config = require('./config.json');
config = config[env];

// Middleware to parse simple request bodies, this will not parse multipart bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Middleware  for error handling
app.use(function (err, req, res, next) {
	console.log(err);
	
	// todo: send email to administrators if prod

	// todo: send simple message on response if not dev

	// todo: send err message on response if dev
	
	next(err);
})

// Set and connect mongoose
mongoose.Promise = global.Promise;
const db = mongoose.connect(config.DBHost, { useMongoClient: true });

// Bind connection errors
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Wrapper JS that loads mongoose models.
const models = require('./src/server/models/models');

// Set sys API Routes
const routes = require('./src/server/routes/routes');
routes(app);

// Serve static assets
app.use(express.static(__dirname + '/public'))

// All GET routes, that has not /api prefix, will respond with index, as index is a SPA app
app.get('*', function (request, response){
	response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
});

// Listen
app.listen(port, function () {
	console.log("The app is running");
	console.log(`Environment: ${env}`);
	console.log(`Port: ${port}`);
	console.log(`Test: ${__TEST__}`);
	console.log(`Dev: ${__DEV__}`);
});

module.exports = app; // for testing