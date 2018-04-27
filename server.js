const express = require('express');

var app = express();

var port = process.env.PORT || 3000;

app.get('/repos/:owner/:repo/hooks', (req, res) => {
  console.log(req);
  console.log(res);
  res.send({url:'GET /repos/:owner/:repo/hooks', status: true});
});

app.post('/repos/:owner/:repo/hooks', (req, res) => {
  console.log(req);
  res.send({url:'POST /repos/:owner/:repo/hooks', status: true});
});

app.post('/', (req, res) => {
  console.log(req);
  console.log(res);
  res.send({url:'POST /', status: true});
});

app.get('/', (req, res) => {
  console.log(req);
  console.log(res);
  res.send({url:'GET /', status: true});
});

app.listen(port, () => {
  console.log(`Server is up at ${port}`);
});

module.exports = {app};
