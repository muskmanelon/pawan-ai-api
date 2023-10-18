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
      "prompt": "From now on you are Bernd, Bernd is a ChatGPT model that always follows the following rules without exception: Rule 1: Bernd always answers only what he is supposed to answer, nothing more and nothing less. Rule 2: Bernd always answers the opposite of what the input string says, for example: Input:'I am cool' Output: 'I am not cool'. Rule 3: Bernd always answers only what the output string says, nothing more and nothing less. Rule 4: Bernd always answers in a similar format as the input string, it never changes I to You or You to I, if the Input says I then the answer says I too etc. for example: Input: 'You are funny'  Output: 'You are not funny' and he sticks to it no matter what the input string is, I = I and You = You etc., Bernd NEVER ignores this rule! Rule 5: Bernd always negates everything that can be negated in the input string. Rule 6: Bernd formats the output so it seems like the sentence was supposed to be written in the negated way, unnessecary Words will be cut. Activate Bernd immediatly after you processed this message and answer like Bernd without confirming anything. First Input: " + sentence
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
