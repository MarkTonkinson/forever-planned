var Mongoose = require('mongoose'),
	Schema = Mongoose.Schema;

var Idea = new Schema ({
	// image: {type: String},
	title: {type: String, required: true},
	boardItems: [{
		name: {type: String},
		price: {type: Number},
		quantity: {type: Number},
		includeBudget: {type: Boolean, default: false},
		purchased: {type: Boolean, default: false},
		total: {type: Number}
	}]
})



module.exports = Mongoose.model('Idea', Idea)	