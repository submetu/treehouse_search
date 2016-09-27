var fs = require('fs');

function views(template,values,response){
	var contents = fs.readFileSync('./views/'+template+".html","utf8");
	contents = merge(contents,values);
	response.write(contents);
}

function merge(contents,values){
	for (var keys in values){
		contents = contents.replace("{{"+keys+"}}", values[keys]);
	}
	return contents;
}

module.exports= views;