const express = require('express');
const puppeteer = require('puppeteer');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
	res.send({
		message: 'The server was configured correctly'
	});
	res.status(200);
});

app.post('/british', async (req, res) => {
	const text = req.query?.text;
	if (!text) return res.status(422);

	try {
		const browser = await puppeteer.launch({ headless: false });
		const page = await browser.newPage();
		await page.goto('https://www.translatebritish.com/reverse.php');
		await page.type('#p', text);
		await page.click('[name="submit"]');
		await page.waitForSelector('.translation-text');

		const result = await page.evaluate(async () => {
			const selected = document.querySelector('.translation-text');
			return selected.innerHTML;
		});

		await browser.close();

		res.send({ result });
		return res.status(200);
	} catch (error) {
		res.send({ error });
		return res.status(500);
	}
});

app.listen(6969, () => {
	console.log('Successful, server running on http://localhost:6969/');
});
