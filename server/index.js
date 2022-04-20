const express = require('express')
const app = express()
// const ytlist = require('youtube-playlist-getter');
const ytpl = require('ytpl');
var cors = require('cors')


app.use(cors())
app.use(express.json());

const PORT = process.env.PORT || 3002;

app.get('/playlist', async (req, response,next) => {
  try {
    if (!ytpl.validateID(req.query.url)) { response.send([]); console.log('invalid url'); return next('invalid url'); }
    const playlistData = await ytpl(req.query.url, { limit: Infinity, pages: Infinity});
    const titleAndURL = playlistData.items.map((song,index) => {
      return {title: song.title, url: song.shortUrl }
    })
    response.send(titleAndURL);
  } catch (error) {
    console.log(error);
    return next(error);
  }
  

})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
