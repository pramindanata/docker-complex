const redis = require('redis')
const { redis: redisConfig } = require('./config')

const client = redis.createClient({
  host: redisConfig.host,
  port: redisConfig.port,
  retry_strategy: () => 1000,
})

const pub = client.duplicate()

module.exports = { client, pub }