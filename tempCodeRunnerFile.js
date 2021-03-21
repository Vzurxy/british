const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
	res.send({
		message: 'The server was configured correctly'
	});
	res.status(200);
});

app.post('/british', (req, res) => {
	const text = req.body?.text;
	if (!text) return res.status(422);
	res.send({
		result: text
	});
	res.status(200);
});

app.listen(6969, () => {
	console.log('Successful, server running on http://localhost:6969/');
});
