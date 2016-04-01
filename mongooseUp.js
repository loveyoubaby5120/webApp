var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/webApp');


var UserSchema = mongoose.Schema({
	username: String
});

var BookSchema = new mongoose.Schema({
		title: {
		type: String,
		enum: ['pankai','system'],
		default: 'pankai',
		trim: true,
		get: function(title){
			if(!title) return title;
			if(0 !== title.indexOf('pk_') && 0!== title.indexOf('pk_'));
				title = 'pk_' +  title;

			return title;
		}
	},
	author: {
		type: mongoose.Schema.ObjectId,
		ref:'UserSchema'
	},
	isbn: {
		type: Number,
		default: 1
	},
	blog: {
		type: String,
		match: /love/g,
		validate: function(blog){
			return blog.length >= 20;
		},
		default: 'http://wwww.loveyoubaby5120.com',
		set: function(url){
			if(!url) return url;
			if(0 !== url.indexOf('http://') && 0!== url.indexOf('https://'))
				url = 'http://' +  url;
			return url;
		}
	},
	count: {
		type: Number,
		required: true,
		max: 1000,
		min: 10,
		default: 10
	},
	createTime: {
		type: Date,
		default: Date.now
	}
});


// BookSchema.virtual('titleBlog').get(function(){
// 	return this.title + ' is blog url ' + this.blog;
// });

// BookSchema.set('toJSON',{getters:true,virtual:true});


// BookSchema.statics.findByISBN = function(isbn,cb){
// 	this.findOne({isbn:isbn},function(err,doc){
// 		cb(err,doc);
// 	});
// };


BookSchema.methods.print = function(){
	console.log('Book information');
	console.log('\ttitle: ',this.title);
	console.log('\tisbn: ',this.isbn);
}


// BookSchema.post('save',function(next){
// 	console.log('this is BookSchema post save middleware');
// 	next();   //?????????????
// });


// BookSchema.pre('save',true,function(next,done){
// 	console.log('this is BookSchema pre save middleware');
// 	next();
// 	done();
// });


var User = mongoose.model('UserSchema',UserSchema);


var Book = mongoose.model('BookSchema',BookSchema);

var user = new User({
	username: 'pankai'
});


var book = new Book({
	title:  'system',
	author: user
	// isbn: 1,
	// blog: 'loveyoubaby5120.com',
});

user.save(function(err){
	if(err){
		return console.log('save user failed: ',err);
	}


	book.save(function(err,doc){
		if(err){
			return console.log('save book failed',err);
		}

		Book.findOne().populate('author').exec(function(err,doc){
			console.log('after populate: ', err, doc);
		});

	});

});

// console.log('book: ',book);
// console.log('book.title: ',book.title);
// console.log('book JSON: ',JSON.stringify(book));

// book.save(function(err,doc){
// 		if(err){
// 			return console.log('save book failed',err);
// 		}


// 		Book.findByISBN(1,function(err,doc){
// 			console.log('findByIsNB, err, doc', err, doc);
// 		});

// 		book.print();

// });		



// var book2 = new Book({
// 	title:  'git',
// 	isbn: 1,
// 	blog: 'loginUp',
// 	count: 1111111
// });

// book2.save(function(err){
// 	if(err){
// 		return console.log('err: ',err);
// 	}
// });
