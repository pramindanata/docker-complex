const { Pool } = require('pg')
const { pg: pgConfig } = require('./config')

const client = new Pool({
  user: pgConfig.user,
  host: pgConfig.host,
  port: pgConfig.port,
  password: pgConfig.password,
  database: pgConfig.database,
})

client.on('error', () => console.log('Lost PG connection'))
client.query(`
  CREATE TABLE IF NOT EXISTS values (
    number INT
  )
`).catch(err => {
  console.log(err)
})

module.exports = client