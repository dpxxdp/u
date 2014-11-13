var request = require('request');



var opt = {
	post : {
		url: 'http://' + clientCredentials + '@localhost:3000/oauth/token',
		form: {
			grant_type: 'password',
			username: 'alex@example.com',
			password: 'password',
			client_id: 'example-client',
			client_secret: 'password'
		}
	},
	get : {
		url: 'http://localhost:3000/secret',
		headers: { Authorization: 'Bearer ' + accessToken }
	},
};


/*

# Redirect the user to this page
https://www.coinbase.com/oauth/authorize?response_type=code&client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_CALLBACK_URL

# If the user accepts, they will be redirected to:
YOUR_CALLBACK_URL?code=CODE

# Initiate a POST request to get the access token
https://www.coinbase.com/oauth/token?grant_type=authorization_code&code=CODE&redirect_uri=YOUR_CALLBACK_URL&client_id=CLIENT_ID&client_secret=CLIENT_SECRET

# Response containing the 'access_token'
{
    "access_token": "...",
    "refresh_token": "...",
    "token_type": "bearer",
    "expire_in": 7200,
    "scope": "universal"
}

# Now you can use the 'access_token' to initiate authenticated requests
https://api.coinbase.com/v1/account/balance?access_token=...

# Response
{"amount"=>"50.00000000", "currency"=>"BTC"}


*/


request.get(opt.get, function(err, res, body) {
	console.log(body);
});




request.post(opt.post, function(err, res, body) {
	var accessToken = JSON.parse(body).access_token;

	request.get(opt.get, function(err, res, body) {
		console.log(body);
	});
});