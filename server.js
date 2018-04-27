const express = require('express');

var app = express();

var port = process.env.PORT || 3000;

app.get('/repos/:owner/:repo/hooks', (req, res) => {
  console.log(req);
  console.log(res);
});

app.post('/repos/:owner/:repo/hooks', (req, res) => {
  console.log(req);
  console.log(res);
});

app.post('/', (req, res) => {
  console.log(req);
  console.log(res);
  return {status: true};
});

app.listen(port, () => {
  console.log(`Server is up at ${port}`);
});

module.exports = {app};
