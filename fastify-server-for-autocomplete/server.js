const fastify = require('fastify')
const path = require('path')
const axios = require("axios")
const fastify_cors = require('fastify-cors')
const app = fastify()
const {PORT = 3000} = process.env


app.register(fastify_cors, { 
  origin: '*'
  // put your options here
})

app.get('/', async (request, reply) => {

    // l('request.query', request.query.username)
    const username = request.query.username
    const URL = `https://www.op.gg/ajax/autocomplete.json/keyword=${encodeURI(request.query.username)}`
    // l({URL})
    const dbRes = await axios({
        url: URL,      
        // method: 'get',
    });
    // l('dbRes', dbRes)
    // l('dbRes.data', JSON.stringify(dbRes.data.sections))     
    return JSON.stringify(dbRes.data.sections)    
    // return reply.send({ hello: 'world' })
})

if (require.main === module) {
  // called directly i.e. "node app"
  app.listen(PORT, (err) => {
    if (err) console.error(err)
    console.log('server listening on 3000')
  })
} else {
  // required as a module => executed on aws lambda
  module.exports = app
}