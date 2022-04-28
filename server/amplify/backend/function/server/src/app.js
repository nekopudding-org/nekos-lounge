const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const ytsr = require('ytsr');
const ytpl = require('ytpl');

const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

app.get('/', (req,res) => {
  res.send("Hello!");
})
app.get('/ytsearch', async function(req, res,next) {
  // Add your code here
  try {
    //search playlist
    if (ytpl.validateID(req.query.url)) {
      const playlistData = await ytpl(req.query.url, { limit: Infinity, pages: Infinity});
      const titleAndURL = playlistData.items.map((song,index) => {
        return {title: song.title, url: song.shortUrl }
      })
      res.send(titleAndURL);
      res.end();
      return;
    }

    //search single video url/query
    const searchResults = await ytsr(req.query.url,{pages: 1, limit: 1 });
    if (searchResults.items.length >= 1) {
      const url = searchResults.items[0].url;
      const title = searchResults.items[0].title;
      res.send([{url: url, title: title}]);
      res.end();
      return;
    } else {
      res.send([]);
      res.end();
      return;
    }
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
