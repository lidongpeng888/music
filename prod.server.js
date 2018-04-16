var express= require('express')
var config=require('./config/index')
var axios = require('axios')

const app = express()
var apiRoutes = express.Router()
app.get('/api/getDiscList', function (req, res) {
  var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})
app.use('/api', apiRoutes)

app.use(express.static('./dist'))
var port= process.env.PORT || config.build.port;
module.exports = app.listen(port,function (err) {
  if(err){return congols.log(err)}
  console.log('listening at http://localhost:' + port+'\n')
})
