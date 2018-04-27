const express = require('express');

var app = express();

var port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is up at ${port}`);
});

module.exports = {app};
