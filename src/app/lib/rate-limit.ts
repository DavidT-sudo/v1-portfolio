/* ============================================================
   Minimal in-memory fixed-window rate limiter.

   NOTE: state lives in the module scope, so it is per serverless
   instance and does NOT share across regions/cold starts. That is
   acceptable for a low-traffic portfolio contact form. For a
   stronger guarantee on Vercel, swap this for Upstash Redis
   (@upstash/ratelimit + @upstash/redis) behind the same interface.
   ============================================================ */

type Entry = { count: number; resetAt: number };

const store = new Map<string, Entry>();

const LIMIT = 5; // max requests
const WINDOW_MS = 10 * 60 * 1000; // per 10 minutes
const MAX_KEYS = 10_000; // hard cap so the map can't grow unbounded

/** Remove expired entries; called opportunistically to bound memory. */
function prune(now: number) {
  for (const [key, entry] of store) {
    if (now > entry.resetAt) store.delete(key);
  }
}

/**
 * Returns { ok: false } once a key exceeds LIMIT within the window.
 * `key` is typically the client IP.
 */
export function rateLimit(key: string): {
  ok: boolean;
  remaining: number;
  resetAt: number;
} {
  const now = Date.now();

  if (store.size > MAX_KEYS) prune(now);

  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    const resetAt = now + WINDOW_MS;
    store.set(key, { count: 1, resetAt });
    return { ok: true, remaining: LIMIT - 1, resetAt };
  }

  if (entry.count >= LIMIT) {
    return { ok: false, remaining: 0, resetAt: entry.resetAt };
  }

  entry.count += 1;
  return { ok: true, remaining: LIMIT - entry.count, resetAt: entry.resetAt };
}
