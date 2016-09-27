var https = require('https');
var eventEmitter = require('events').EventEmitter;
var util = require('util');

function Profile(username){
	eventEmitter.call(this);
	var profileThis = this;

	var request = https.get("https://teamtreehouse.com/"+username+".json",function(response){
		var body='';
		if(response.statusCode !== 200){
			profileThis.emit('error',new Error("Can't find this profile"));
		}
		response.on('data',function(chunk){
			body+=chunk;
			profileThis.emit('data',chunk);
		});
		if(response.statusCode === 200){
					
					try {
						response.on('end',function(){
						var profile = JSON.parse(body);
						profileThis.emit('end',profile);
					});
					} catch(error) {
						profileThis.emit('error',error);
					}
			}
	}).on('error',function(error){
		profileThis.emit('error',error);
	});
}

util.inherits(Profile,eventEmitter);

module.exports = Profile;