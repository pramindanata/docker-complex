const config = require('./config')
const redis = require('redis')

const redisClient = redis.createClient({
  host: config.redis.host,
  port: config.redis.port,
  retry_strategy: () => 1000
})
const pub = redisClient.duplicate()

function fib(index) {
  if (index < 2) return 1

  return fib(index - 1) + fib(index - 2)
}

pub.on('message', (channel, message) => {
  redisClient.hset('values', message, fib(parseInt(message)))
})

// Duplicated redis client turns into "subscriber mode"
// For "insert" event
pub.subscribe('insert')