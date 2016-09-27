var Profile = require('./Profile');
var views = require('./views');
var querystring = require('querystring');

function home(request,response){
	if(request.url === '/'){
		if(request.method.toLowerCase() === 'get'){
			response.writeHead(200,{'Content-Type':'text/html'});
			//show the home page with header, search , footer
			views("header",{},response);
			views("search",{},response);
			views("footer",{},response);
			response.end();
		}
		else{
			request.on('data',function(postBody){
				var postData = querystring.parse(postBody.toString());
				response.writeHead(303,{'Location':'/'+postData.username});
				response.end();
			});
			
		}
	}
}

function user (request,response){
	var username = request.url.replace("/", "");
	if(username.length > 0){
		response.writeHead(200,{'Content-Type':'text/html'});

		var user = new Profile(username);
		user.on('end',function(profile){
			var values = {
				totalPoints: profile.points.total,
				username : profile.profile_name,
				imageUrl : profile.gravatar_url,
				badges   : profile.badges.length,
				jsPoints : profile.points.JavaScript,
				treehouseurl : profile.profile_url
			}
			console.log(values);
			views("header",{},response);
			views("profile",values,response);
			views("footer",{},response);
			response.end();
			// show the search page with header , profile , footer
		});
		user.on('error',function(error){
			views("header",{},response);
			views("error",{},response);
			views("search",{},response);
			views("footer",{},response);
			response.end();
		});
	}
}

module.exports.home=home;
module.exports.user=user;