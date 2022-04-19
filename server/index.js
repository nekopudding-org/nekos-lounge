const express = require('express')
const app = express()
const ytlist = require('youtube-playlist-getter');
var cors = require('cors')


app.use(cors())
app.use(express.json());

const PORT = process.env.PORT || 3002;
const url = 'https://www.youtube.com/watch?v=KkVwuWH-woA&list=PLmD_XJcT9TYFW9jZ8gcGYX05DzYRGr6xh';

app.get('/playlist', (req, response) => {
  ytlist.searchPlaylist(req.query.url, res => {
    const playlist = res.map((item,index) => {
      return {title: item.title, url: item.url};
    })
    response.send(playlist)
  })
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
