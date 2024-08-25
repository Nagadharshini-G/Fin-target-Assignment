import express  from 'express';
import winston from 'winston';
import { rateLimiter, rateLimiterPerMinute } from './ratelimit.js';
import { addToQueue, getNextTask } from './task.js';

const app = express();
app.use(express.json());

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'logs/combined.log' }),
    new winston.transports.Console(),
  ],
});

const processTask = async (user_id) => {
  console.log(`${user_id}-task completed at-${Date.now()}`);
  logger.info(`Task completed: ${user_id} at ${Date.now()}`);
};

app.post('/api/v1/task', async (req, res) => {
  const { user_id } = req.body;

  if (!user_id) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    await rateLimiter.consume(user_id);
    await rateLimiterPerMinute.consume(user_id);
    
    await addToQueue(user_id);
    res.status(202).json({ message: 'Task accepted and queued' });
  } catch (rejRes) {
    res.status(429).json({ error: 'Rate limit exceeded' });
  }
});

// Process the queue every second
setInterval(async () => {
  const task = await getNextTask();
  if (task) {
    await processTask(task.user_id);
  }
}, 1000);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});