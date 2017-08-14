/* global module */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UploadSchema = new Schema({
	fieldname: {
		type: String
	},
	originalname: {
		type: String
	},
	encoding: {
		type: String
	},
	mimetype: {
		type: String
	},
	extension: {
		type: String
	},
	size: {
		type: String
	},
	destination: {
		type: String
	},
	filename: {
		type: String
	},
	path: {
		type: String
	}
});

module.exports = mongoose.model('uploads', UploadSchema);
