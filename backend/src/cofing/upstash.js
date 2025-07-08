import {Ratelimit} from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

import dotenv from "dotenv";

dotenv.config();

// create a reatelimiter that allows 10 requestes per 20 seconds
const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(30, "60 s"),
});

export default ratelimit;
