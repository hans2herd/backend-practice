const express = require('express')
const app = express()
const port = 4000
const monk = require('monk')
const url = 'mongodb://user1:Password1@firstcluster-shard-00-00-3kte1.mongodb.net:27017,firstcluster-shard-00-01-3kte1.mongodb.net:27017,firstcluster-shard-00-02-3kte1.mongodb.net:27017/mydatabase?ssl=true&replicaSet=FirstCluster-shard-0&authSource=admin&retryWrites=true'
const cors = require('cors')
const bodyParser = require('body-parser')
const db = monk(url);
  db.then(() => {
    console.log('Connected correctly to server')
})

const people = db.get('learning')

app.use(cors())
app.use(bodyParser.json())

app.get('/', async (req, res) => {
  const results = await people.find()
  res.status(200).send(results)
})

app.post('/', async (req, res) => {
  const results = await people.insert(req.body)
  res.status(200).send(results)

})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))