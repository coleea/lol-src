const fastify      = require('fastify')
const axios        = require("axios")
const fastify_cors = require('fastify-cors')
const app          = fastify()
const {PORT = 3000}= process.env

const l = console.log 

app.register(fastify_cors, { 
  origin: '*'
})

app.get('/', async (req, _) => {

    const username = req.query.username
    const URL = `https://www.op.gg/ajax/autocomplete.json/keyword=${encodeURI(req.query.username)}`
    const autocompeteInfo = await axios({url: URL,});
    return JSON.stringify(autocompeteInfo.data.sections)    
})

if (require.main === module) {
  app.listen(PORT, (err) => {
    if (err) console.error(err)
    l(`[Server Started] PORT ${PORT}`)
  })
} else {
  module.exports = app
}