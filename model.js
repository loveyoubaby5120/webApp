var mongoose = require('mongoose');
var uri = 'mongodb://username:password@hostname:prot/databasename';
uri = "mongodb://localhost/webApp";

mongoose.connect(uri);

var BookSchema = new mongoose.Schema({
	name: String,
	author: String,
	publichTime: Date
});


mongoose.model('Book',BookSchema);

