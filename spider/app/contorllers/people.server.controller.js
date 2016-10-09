var mongoose = require('mongoose');
var People = mongoose.model('People');


module.exports = {
	create: function(req, res, next){
		var people = new People(req.body);
		people.save(function(err){
			if(err){
				return next(err);
			}

			return res.json(people);
		});
	},
	list: function(req, res, next){
		var pagesize = parseInt(req.query.pagesize,10) || 10;
		var pagestart = parseInt(req.query.pagestart,10) || 10;

		People
		.find()
		.sort({'_id':-1})
		.skip((pagestart - 1) * pagesize)
		.limit(pagesize)
		.exec(function(err, docs){
			if(err){
				return next(err);
			}
			return res.json(docs);
			// return res.json(docs.length);
		});

	},
	getById: function(req, res, next, id){
		if(!id){
			return next(new Error('News not Found'));
		}

		People
		.findOne({_id: id})
		.exec(function(err, doc){
			if(err){
				return next(err);
			}
			if(!doc){
				return next(new Error('News not Found'));
			}

			req.people = doc;

			return next();
		});


	},
	get: function(req, res, next){
		return res.json(req.people);
	},
	update: function(req, res, next){
		if(!id){
			return next(new Error('News not Found'));
		}
		var people = {};

		people.key = '其他';

		People.update({_id:_id},people,function(err){});
	}


}