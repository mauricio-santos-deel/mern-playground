/* global exports */

var mongoose = require('mongoose');
var Upload = mongoose.model('uploads');

exports.saveUpload = function(req, res) {
	var newUpload = new Upload(req.body);

	newUpload.save(function(err, upload) {
		if (err) {
			res.send(err);
		} else {
			res.json(upload);
		}
	});
};
