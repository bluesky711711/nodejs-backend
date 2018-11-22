
var request = require('request');
module.exports = (express) => {
	var router      = express.Router();

	// Router Middleware
	router.use((req, res, next) => {
		// log each request to the console
		console.log("You have hit the /api", req.method, req.url);

		// Remove powered by header
		//res.set('X-Powered-By', ''); // OLD WAY
		//res.removeHeader("X-Powered-By"); // OLD WAY 2
		// See bottom of script for better way

		// CORS
		res.header("Access-Control-Allow-Origin", "*"); //TODO: potentially switch to white list version
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

		// we can use this later to validate some stuff

		// continue doing what we were doing and go to the route
		next();
	});

	// API ROOT - Display Available Routes
	router.get('/', (req, res) => {
		res.jsonp({
			name: 'NODEJS API',
			version: '1.0',
		});
	});

	router.post('/calling_api_from_nodejs', (req, res) => {
		var data = req.body; // maybe more carefully assemble this data
		var Client = require('node-rest-client').Client;

		var client = new Client();

		client.get(data.api_url, function (data, response) {
			// parsed response body as js object
		  console.log('first method way')
			console.log(data,response);
			res.jsonp({
				status: 'success',
				message: 'SUCCESSFULLY SENT',
				res:data
			});
		});
	});



	return router;
};
