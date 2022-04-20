const express = require('express')
const ytsr = require('ytsr');
const ytpl = require('ytpl');
var cors = require('cors');

const app = express()

app.use(cors())
app.use(express.json());

const PORT = process.env.PORT || 3002;

app.get('/ytsearch', async (req, response,next) => {
  try {
    const searchResults = await ytsr(req.query.url,{pages: 1, limit: 1 });
    if (searchResults.items.length >= 1) {
      const url = searchResults.items[0].url;
      const title = searchResults.items[0].title;
      response.send([{url: url, title: title}]);
      response.end();
    }
    //else search playlist
    if (!ytpl.validateID(req.query.url)) { //if not a playlist
      var id = getYouTubeID(req.query.url);
      response.send([title]); 
      console.log('invalid url'); 
      return next('invalid url'); 
    } else {
      const playlistData = await ytpl(req.query.url, { limit: Infinity, pages: Infinity});
      const titleAndURL = playlistData.items.map((song,index) => {
        return {title: song.title, url: song.shortUrl }
      })
      response.send(titleAndURL);
    }
  } catch (error) {
    console.log(error);
    return next(error);
  }
  

})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
