'use client';

import Script from 'next/script';
import { useActionState, useEffect, useRef, useState } from 'react';
import { submitContact, type ContactState } from '../actions/contact';

const initialState: ContactState = { status: 'idle', message: '' };

// Public site key — inlined at build. When unset, the Turnstile widget
// is not rendered and the server skips verification (dev/local).
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const channels = [
  { value: 'whatsapp', label: 'WHATSAPP' },
  { value: 'email', label: 'EMAIL' },
] as const;

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitContact,
    initialState,
  );
  const [channel, setChannel] = useState<'whatsapp' | 'email'>('whatsapp');
  const openedUrl = useRef<string | null>(null);

  // When the server hands back a wa.me / mailto URL, open it once.
  useEffect(() => {
    if (state.status === 'ok' && state.url && openedUrl.current !== state.url) {
      openedUrl.current = state.url;
      window.open(state.url, '_blank', 'noopener,noreferrer');
    }
  }, [state]);

  return (
    <form action={formAction} className="mt-8 space-y-5">
      {/* Honeypot — hidden from humans; bots that fill it are dropped
          server-side. Off-screen (not type=hidden, which bots skip). */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '-9999px',
          width: 1,
          height: 1,
          overflow: 'hidden',
        }}
      >
        <label>
          Company
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            defaultValue=""
          />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block font-mono text-2xs tracking-[0.25em] text-sage-400">
            NAME *
          </span>
          <input
            name="name"
            type="text"
            required
            maxLength={100}
            autoComplete="name"
            placeholder="Your name"
            className="field"
          />
        </label>

        <label className="block">
          <span className="mb-2 block font-mono text-2xs tracking-[0.25em] text-sage-400">
            YOUR EMAIL / WHATSAPP *
          </span>
          <input
            name="replyTo"
            type="text"
            required
            maxLength={100}
            placeholder="Where I can reach you back"
            className="field"
          />
        </label>
      </div>

      {/* Channel selector */}
      <fieldset>
        <legend className="mb-2 block font-mono text-2xs tracking-[0.25em] text-sage-400">
          CHANNEL
        </legend>
        <div className="grid grid-cols-2 gap-px border border-line bg-line">
          {channels.map((c) => (
            <label
              key={c.value}
              className={`cursor-pointer px-4 py-3 text-center font-mono text-xs tracking-[0.2em] transition-colors duration-200 ${
                channel === c.value
                  ? 'bg-circuit text-porcelain'
                  : 'bg-graphite-800 text-sage-500 hover:text-sage-300'
              }`}
            >
              <input
                type="radio"
                name="channel"
                value={c.value}
                checked={channel === c.value}
                onChange={() => setChannel(c.value)}
                className="sr-only"
              />
              {channel === c.value && (
                <span className="mr-2 text-volt" aria-hidden>
                  ●
                </span>
              )}
              {c.label}
            </label>
          ))}
        </div>
      </fieldset>

      <label className="block">
        <span className="mb-2 block font-mono text-2xs tracking-[0.25em] text-sage-400">
          MESSAGE *
        </span>
        <textarea
          name="message"
          required
          maxLength={2000}
          rows={5}
          placeholder="What are we building?"
          className="field resize-y"
        />
      </label>

      {/* Cloudflare Turnstile — renders only when a site key is set.
          The widget injects a `cf-turnstile-response` token into the
          form, which the server action verifies before sending. */}
      {TURNSTILE_SITE_KEY && (
        <>
          <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js"
            strategy="afterInteractive"
          />
          <div
            className="cf-turnstile"
            data-sitekey={TURNSTILE_SITE_KEY}
            data-theme="auto"
          />
        </>
      )}

      <div className="flex flex-wrap items-center gap-5">
        <button
          type="submit"
          disabled={pending}
          className="bg-volt px-6 py-3 font-mono text-xs font-bold tracking-[0.15em] text-graphite-950 transition-all duration-200 hover:shadow-glow-volt hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60"
        >
          {pending
            ? 'TRANSMITTING…'
            : channel === 'whatsapp'
              ? 'SEND VIA WHATSAPP →'
              : 'SEND VIA EMAIL →'}
        </button>

        {state.status !== 'idle' && (
          <p
            role="status"
            className={`font-mono text-xs tracking-wider ${
              state.status === 'ok' ? 'text-volt' : 'text-copper'
            }`}
          >
            {state.message}
          </p>
        )}
      </div>
    </form>
  );
}
