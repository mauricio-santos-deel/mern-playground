/* global module */

const path = require('path');
const uuid = require('uuid');
const multer = require('multer');

var storage = multer.diskStorage({
	destination: 'public/uploadedFiles/',
	filename: (req, file, cb) => {
		// implemented that function to set the extension on the filename.
		// multer doesn't do that by default or config
		cb(null, uuid.v4() + path.extname(file.originalname));
	}
});

// const upload = multer({ dest: 'public/uploadedFiles/' });
const upload = multer({ storage: storage });

module.exports = function(app) {
	var uploadController = require('../controllers/upload-controller');

	// multer middleware that uploads the file
	app.post('/api/uploads', upload.single('file'), (req, res, next) => {

		// set on request body multer file params
		req.body.fieldname = req.file.fieldname;
		req.body.originalname = req.file.originalname;
		req.body.encoding = req.file.encoding;
		req.body.mimetype = req.file.mimetype;
		req.body.size = req.file.size;
		req.body.destination = req.file.destination;
		req.body.filename = req.file.filename;
		req.body.path = req.file.path;

		// extract extension
		req.body.extension = path.extname(req.file.originalname);

		next();
	});

	// uploads Routes
	app.route('/api/uploads')
		.post(uploadController.saveUpload);
};
