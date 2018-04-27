const express = require('express');
const bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

var port = process.env.PORT || 4567;

app.post('/repos/:owner/:repo/issues/:number/comments', (req, res) => {
  res.send({body: 'Great stuff'});
});

app.post('/', (req, res) => {
  var changed_files = req.body.pull_request.changed_files;
  if (changed_files && changed_files >= 1) {
    app.post('/repos/:owner/:repo/issues/:number/comments', (req, res) => {
      res.send({body: 'Great stuff'});
    });
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
