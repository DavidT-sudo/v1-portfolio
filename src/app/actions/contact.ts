'use server';

import { headers } from 'next/headers';
import { rateLimit } from '../lib/rate-limit';

/* ============================================================
   Contact channel handler.
   The WhatsApp number and email address never reach the client
   as page content — they live in env vars and are only used
   server-side to build the outgoing channel:

   - whatsapp → wa.me click-to-chat URL with the message and the
     client's contact prefilled (WHATSAPP_NUMBER, digits only,
     country code, no "+", e.g. 26771234567)
   - email    → sent directly via Resend if RESEND_API_KEY is
     set (CONTACT_EMAIL as recipient); otherwise falls back to
     a mailto: URL built server-side.

   Anti-harvesting / anti-spam enforcement runs in this strict
   order, and NO wa.me/mailto URL is built until every check
   passes: honeypot → rate limit → Turnstile → build/send.

   SECURITY: never console.log the env values, the wa.me URL, or
   the mailto URL — they must not leak into server logs.
   ============================================================ */

export type ContactState = {
  status: 'idle' | 'ok' | 'error';
  message: string;
  /** wa.me or mailto URL for the client to open, when applicable */
  url?: string;
};

const GENERIC_OK: ContactState = {
  status: 'ok',
  message: 'OK: message received. I will get back to you.',
};

/** Best-effort client IP from platform-set proxy headers. */
async function clientIp(): Promise<string> {
  const h = await headers();
  const fwd = h.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  return h.get('x-real-ip')?.trim() || 'unknown';
}

/** Verify a Cloudflare Turnstile token. Skipped when no secret is set. */
async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // challenge not configured — allow (dev/local)
  if (!token) return false;
  try {
    const res = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ secret, response: token, remoteip: ip }),
      },
    );
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // 1) HONEYPOT — hidden field no human fills. If present, feign success.
  const honeypot = String(formData.get('company') ?? '').trim();
  if (honeypot) return GENERIC_OK;

  // 2) RATE LIMIT — before building any contact URL.
  const ip = await clientIp();
  if (!rateLimit(`contact:${ip}`).ok) {
    return {
      status: 'error',
      message: 'ERR: too many requests — try again shortly.',
    };
  }

  const name = String(formData.get('name') ?? '').trim();
  const replyTo = String(formData.get('replyTo') ?? '').trim();
  const channel = String(formData.get('channel') ?? 'whatsapp');
  const message = String(formData.get('message') ?? '').trim();

  if (!name || !replyTo || !message) {
    return { status: 'error', message: 'ERR: all fields are required.' };
  }
  if (name.length > 100 || replyTo.length > 100 || message.length > 2000) {
    return { status: 'error', message: 'ERR: input exceeds field limits.' };
  }

  // 3) TURNSTILE — bot challenge (no-op until keys are configured).
  const token = String(formData.get('cf-turnstile-response') ?? '');
  if (!(await verifyTurnstile(token, ip))) {
    return {
      status: 'error',
      message: 'ERR: verification failed — please retry.',
    };
  }

  // 4) BUILD / SEND — only reached once all checks pass.
  const body = `New inquiry via ohmerohm portfolio\nFrom: ${name}\nReply to: ${replyTo}\n\n${message}`;

  if (channel === 'whatsapp') {
    const number = process.env.WHATSAPP_NUMBER?.replace(/\D/g, '');
    if (!number) {
      return {
        status: 'error',
        message: 'ERR: whatsapp channel offline — try email.',
      };
    }
    return {
      status: 'ok',
      message: 'OK: opening WhatsApp with your message…',
      url: `https://wa.me/${number}?text=${encodeURIComponent(body)}`,
    };
  }

  const email = process.env.CONTACT_EMAIL;
  if (!email) {
    return {
      status: 'error',
      message: 'ERR: email channel offline — try WhatsApp.',
    };
  }

  const subject = `Portfolio inquiry from ${name}`;

  // Preferred: deliver server-side so the address never leaves the server.
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM ?? 'onboarding@resend.dev',
          to: [email],
          reply_to: replyTo.includes('@') ? replyTo : undefined,
          subject,
          text: body,
        }),
      });
      if (res.ok) {
        return {
          status: 'ok',
          message: 'OK: message transmitted. I will get back to you.',
        };
      }
    } catch {
      // fall through to mailto (no logging — must not leak the address)
    }
  }

  // Fallback: hand the visitor a prefilled mailto link.
  return {
    status: 'ok',
    message: 'OK: opening your mail client…',
    url: `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
  };
}
