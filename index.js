const express = require('express');
const formidable = require('formidable');
const cors = require('cors');
const path = require('path');

const app = express();

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.post('/upload', cors(), function (req, res) {
	const form = new formidable.IncomingForm();

	form.parse(req);

	form.on('fileBegin', (name, file) => {
		file.path = __dirname + '/uploads/' + file.name;
	});

	form.on('file', (name, file) => {
		res.json({
			result: [
				{
					url: `http://localhost:4000/uploads/${file.name}`,
					name: file.name,
					size: file.size,
				},
			],
		});
	});
});

app.listen(4000);
