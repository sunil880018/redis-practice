const express = require('express')
const app = express();
const redis = require ('./redis/redis')

redis.redisConnection();

app.get('/', async(req , res)=>{
  await redis.setKey('lang','System'); 
  const data = await redis.getKey('lang');
  // console.log(await redis.expireAtKey('lang',4))
  console.log(await redis.deleteAtKey('lang'));
  res.send(data);
});

app.listen('3000',()=>{
    console.log(`server run at 3000`);
});
