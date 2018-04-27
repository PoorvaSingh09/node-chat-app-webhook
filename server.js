const express = require('express');
const bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

var port = process.env.PORT || 4567;

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
  var changed_files = req.body.pull_request.changed_files;
  if (changed_files && changed_files > 1) {
    return res.send({url:'GET /', comment: 'Please keep the number of files to minimum for a pull request', reject: true});
  }
  res.send({url:'POST /', status: true});
});

app.get('/', (req, res) => {
  res.send({url:'GET /', status: true});
});

app.listen(port, () => {
  console.log(`Server is up at ${port}`);
});

module.exports = {app};
