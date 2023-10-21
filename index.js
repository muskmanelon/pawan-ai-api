const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/:sentence', (req, res) => {
  const sentence = req.params.sentence;

  const options = {
    url: 'https://api.pawan.krd/v1/completions',
    headers: {
      'Authorization': 'Bearer pk-BNdbGpiJYsDEBOfSIXHTYLmObbMJHSvLjysKkTVyARLojzKy',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "model": "pai-001-light-beta",
      "max_tokens": 100,
      "prompt": "Generate the linguistic opposite sentence of the following sentence, and higlight it with '~'." + sentence
    })
  };

  request.post(options, (error, response, body) => {
    if (error) {
      console.error(error);
      res.status(500).send('An error occurred');
      return;
    }
    res.send(body);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
