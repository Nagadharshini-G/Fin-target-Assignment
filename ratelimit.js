import { RateLimiterRedis } from 'rate-limiter-flexible';
import Redis from 'redis';
const redisClient = Redis.createClient({
    url: 'redis://localhost:6379'
});
(async()=>{
    await redisClient.connect();
}
)();

const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  points: 1, // Number of points
  duration: 1, // Per second
  keyPrefix: 'rate_limit:', // Key prefix for Redis
});

const rateLimiterPerMinute = new RateLimiterRedis({
  storeClient: redisClient,
  points: 20, // Number of points
  duration: 60, // Per minute
  keyPrefix: 'rate_limit_minute:', // Key prefix for Redis
});

export{rateLimiter,rateLimiterPerMinute};
