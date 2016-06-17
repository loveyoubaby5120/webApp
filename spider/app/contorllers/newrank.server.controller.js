var mongoose = require('mongoose');
var NewRank = mongoose.model('NewRank');


module.exports = {
	create: function(req, res, next){
		var newrank = new NewRank(req.body);
		newrank.save(function(err){
			if(err){
				return next(err);
			}

			return res.json(newrank);
		});
	},
	list: function(req, res, next){
		var pagesize = parseInt(req.query.pagesize,10) || 10;
		var pagestart = parseInt(req.query.pagestart,10) || 10;

		NewRank
		.find()
		// .skip((pagestart - 1) * pagesize)
		// .limit(pagesize)
		.exec(function(err, docs){
			if(err){
				return next(err);
			}
			// return res.json(docs);
			return res.json(docs.length);
		});

	},
	getById: function(req, res, next, id){
		if(!id){
			return next(new Error('News not Found'));
		}

		NewRank
		.findOne({_id: id})
		.exec(function(err, doc){
			if(err){
				return next(err);
			}
			if(!doc){
				return next(new Error('News not Found'));
			}

			req.newrank = doc;

			return next();
		});


	},
	get: function(req, res, next){
		return res.json(req.newrank);
	}


}