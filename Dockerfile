# syntax=docker/dockerfile:1

# ============================================================
# OmerOhm LABS portfolio — production image
# Multi-stage build producing a minimal Next.js standalone
# runtime (no node_modules, non-root user).
# ============================================================

FROM node:22-alpine AS base
ENV NEXT_TELEMETRY_DISABLED=1

# -- deps: install only what package-lock pins -----------------
FROM base AS deps
# libc6-compat: glibc shim some native Node addons expect on Alpine
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# -- builder: compile the app ---------------------------------
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# NEXT_PUBLIC_* values are inlined at build time, so the Turnstile
# site key must be present here (not just at runtime). It is public.
ARG NEXT_PUBLIC_TURNSTILE_SITE_KEY=""
ENV NEXT_PUBLIC_TURNSTILE_SITE_KEY=$NEXT_PUBLIC_TURNSTILE_SITE_KEY

ENV NODE_ENV=production
RUN npm run build

# -- runner: minimal runtime ----------------------------------
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

# standalone bundles the server + only the deps it actually uses
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000 \
    HOSTNAME=0.0.0.0

# Secrets (WHATSAPP_NUMBER, CONTACT_EMAIL, RESEND_API_KEY,
# TURNSTILE_SECRET_KEY) are injected at RUN time — never baked in.
CMD ["node", "server.js"]
