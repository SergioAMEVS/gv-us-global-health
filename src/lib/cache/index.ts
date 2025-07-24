import { LRUCache } from 'lru-cache';

export const cache = new LRUCache({
  max: 100, // max items
  ttl: 1000 * 60, // 1 minute
});
