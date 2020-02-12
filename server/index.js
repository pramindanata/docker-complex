const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const config = require('./config')
const pg = require('./pg')
const redis = require('./redis')

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  return res.send('Hi there :)')
})

app.get('/values/all', async (req, res) => {
  const values = await pg.query('SELECT DISTINCT number FROM values')

  return res.json(values.rows)
})

app.get('/values/current', (req, res) => {
  redis.client.hgetall('values', (err, values) => {
    return res.json(values)
  })
})

app.post('/values', async (req, res) => {
  const { index } = req.body

  if (parseInt(index) > 40) {
    return res.status(422).json({
      error: 422,
      message: 'Index too high'
    })
  }
  
  redis.client.hset('values', index, 'Nothing yet !')
  // Trigger worker
  redis.pub.publish('insert', index)

  await pg.query('INSERT INTO values(number) VALUES($1)', [index])

  return res.json({
    working: true
  })
})

app.listen(config.app.port, () => {
  console.log(`Server is listening on http://localhost:${config.app.port}`)
})