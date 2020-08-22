const keys = require('./keys');

const redis = require('redis');

const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    // try to reconnect once every 1 second if connection is lost
    retry_strategy: () => 1000
});

const sub =redisClient.duplicate();

function fib(index){
    if(index<2){
        return 1
    }
    return fib(index-1)+fib(index-2);
}

sub.on('message',(channel,message)=>{
    // add data to hash of values
    redisClient.hset('values',message,fib(parseInt(message)));
});

// insert in redis
sub.subscribe('insert');