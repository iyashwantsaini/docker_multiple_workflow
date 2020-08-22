"use strict";

var keys = require('./keys');

var redis = require('redis');

var redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  // try to reconnect once every 1 second if connection is lost
  retry_strategy: function retry_strategy() {
    return 1000;
  }
});
var sub = redisClient.duplicate();

function fib(index) {
  if (index < 2) {
    return 1;
  }

  return fib(index - 1) + fib(index - 2);
}

sub.on('message', function (channel, message) {
  // add data to hash of values
  redisClient.hset('values', message, fib(parseInt(message)));
}); // insert in redis

sub.subscribe('insert');