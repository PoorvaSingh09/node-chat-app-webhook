const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const octokit = require('@octokit/rest')();
octokit.authenticate({
  type: 'token',
  token: 'b1f5f7c0a01d1f08dea20fad4d376237874bf149'
})

var app = express();
app.use(bodyParser.json());

var port = process.env.PORT || 4567;



var postCommentInGIT = async (owner, repo, number) => {
  try {
    var url = `https://api.github.com/repos/${owner}/${repo}/issues/${number}/comments?access_token=b1f5f7c0a01d1f08dea20fad4d376237874bf149`;
    return await axios.post(url, {
      body:'<html><body><table><tr><td>Please keep files to minimum.</td><td>X</td></tr></table></body></html>'
    });
  } catch (e) {
    throw new Error(e.message);
  }
};



// Client ID: Iv1.200164c956ff0f57
//
// Client secret: 5b098e4f8c7540a4d93ceb87d3a4c0239f8d1f39
// mckinsey+159983


var requestChanges = async (owner, repo, number, id) => {
  try {
    var body = '<html><body><table><tr><td>Please keep files to minimum.</td><td>X</td></tr></table></body></html>';
    var event = 'REQUEST_CHANGES';
    // const result = await octokit.authorization.check({access_token: '74a2f3ca051707f7f9657467408111fe361dfced', client_id: 'Iv1.200164c956ff0f57'})

    // const result = await octokit.authorization.create({client_id: 'Iv1.200164c956ff0f57', client_secret: '5b098e4f8c7540a4d93ceb87d3a4c0239f8d1f39'});
    // console.log('result---', result);
    return await octokit.pullRequests.submitReview({owner, repo, number, id, body, event});

    // var url = `https://api.github.com/repos/${owner}/${repo}/pulls/${number}/reviews/${id}/events?access_token=b1f5f7c0a01d1f08dea20fad4d376237874bf149`;
    // console.log(url);
    // return await axios.post(url, {
    //   event: 'REQUEST_CHANGES',
    //   body:'<html><body><table><tr><td>Please keep files to minimum.</td><td>X</td></tr></table></body></html>'
    // });
  } catch (e) {
    console.log('error', e.message);
    throw new Error(e.message);
  }
};

app.post('/', async (req, res) => {
  var pull_request = req.body.pull_request;
  if (pull_request) {
    var changed_files = pull_request.changed_files;
    if (changed_files && changed_files >= 1) {
      // const response = await postCommentInGIT(pull_request.head.repo.owner.login, pull_request.head.repo.name, pull_request.number);
      await requestChanges(pull_request.head.repo.owner.login, pull_request.head.repo.name, pull_request.number, pull_request.id);
      return res.send({body:'Please keep files to minimum'});
    }
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
