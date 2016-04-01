var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/webApp');

var BookSchema = new mongoose.Schema({
	username: {
		type: String,
		default: 'pankai',
		get: function(name){
			if(!name) return name;
			if(0 !== name.indexOf('pk_') && 0!== name.indexOf('pk_'));
				name = 'pk_' +  name;

			return name;
		}
	},
	isbn: {
		type: Number,
		trim: true
	},
	createTime: {		
		type: Date,
		default: Date.now
	},
	blog: {
		type: String,
		set: function(url){
			if(!url) return url;
			if(0 !== url.indexOf('http://') && 0!== url.indexOf('https://'))
				url = 'http://' +  url;

			return url;
		}
	}
});


BookSchema.virtual('userBlog').get(function(){
	return this.username + ' is blog url ' + this.blog;
});

BookSchema.set('toJSON',{getters:true,virtual:true});


BookSchema.statics.findByISBN = function(isbn,cb){
	this.findOne({isbn:isbn},function(err,doc){
		cb(err,doc);
	});
};


BookSchema.methods.print = function(){
	console.log('Book information');
	console.log('\tusername: ',this.username);
	console.log('\tisbn: ',this.isbn);
}


var Book = mongoose.model('BookSchema',BookSchema);


var book = new Book({
	username:  'system',
	isbn: 1,
	blog: 'loveyoubaby5120.com'
});


// console.log('book: ',book);
// console.log('book.username: ',book.username);
// console.log('book JSON: ',JSON.stringify(book));


book.save(function(err,doc){
	if(err){
		return console.log('save book failed',err);
	}


	Book.findByISBN(1,function(err,doc){
		console.log('findByIsNB, err, doc', err, doc);
	});

	book.print();

});





