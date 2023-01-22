const redis = require('redis');
require('dotenv').config();
const REDIS_PORT = process.env.REDIS_PORT ? process.env.REDIS_PORT : 6379;
const REDIS_HOST = process.env.REDIS_HOST ? process.env.REDIS_HOST : 'localhost';
const redisclient = redis.createClient(REDIS_PORT, REDIS_HOST);

async function redisConnection(){
    await redisclient.connect();
}

redisclient.on('connect', () => {
    console.log('redis connected!');
});

redisclient.on("error", (error) => {
    console.log(`redis disconnected ${error}`);
});

async function setKey(key, value){
    await redisclient.set(key, value);
}

async function getKey(key){
    const data = await redisclient.get(key, (error, data)=>{
        return error ? error : data;
    });
    return data;
}

async function expireAtKey(key, timeout){
    if(key)
     return await redisclient.expire(key, timeout);
    return false;
}

async function setKeyWithExpiry(key, value, expireWithinSeconds){
    return await redisclient.setEx(key, expireWithinSeconds, value);
}

async function deleteAtKey(key){
    const result = await redisclient.del(key, (error, isDeleted) => {
        return error ? error : isDeleted ;
    });
    return result;
}

module.exports = {
    redisConnection,
    setKey,
    getKey,
    expireAtKey,
    setKeyWithExpiry,
    deleteAtKey
};