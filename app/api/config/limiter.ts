import { RateLimiter } from "limiter";

const limiter = new RateLimiter({
  tokensPerInterval: 3,
  interval: "min",
  fireImmediately: true
})

export {limiter}