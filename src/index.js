require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const { watsonServices } = require('./services/watson.services');

const app = express();
const port = 4020;

app.use(bodyParser.json());

app.post('/tone-analyzer', async (req, res) => {
	const data = req.body.data;

	const result = await watsonServices.analyse(data);

	switch (result.status) {
		case 200:
			res.status(200).send(result);
			break;

		default:
			res.status(500).send();
			break;
	}
});

app.listen(port, () => {
	console.log(`server running on http://127.0.0.1:${port}`);
});

exports.app = app;
