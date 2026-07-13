'use client';

import { useEffect, useRef, useState } from 'react';

type Line =
  | { kind: 'cmd'; text: string }
  | { kind: 'out'; text: string; tone?: 'volt' | 'ohm' | 'sage' };

const SCRIPT: Line[] = [
  { kind: 'cmd', text: 'whoami' },
  { kind: 'out', text: 'thuto.tlhobogang — engineer', tone: 'sage' },
  { kind: 'cmd', text: 'ls ./divisions' },
  { kind: 'out', text: 'audio/  media/  techworks/', tone: 'ohm' },
  { kind: 'cmd', text: './run_diagnostics --all' },
  { kind: 'out', text: 'backend .............. [OK]', tone: 'sage' },
  { kind: 'out', text: 'frontend ............. [OK]', tone: 'sage' },
  { kind: 'out', text: 'plc_interface ........ [OK]', tone: 'sage' },
  { kind: 'out', text: 'ALL SYSTEMS OPERATIONAL', tone: 'volt' },
];

const TYPE_SPEED = 45;
const OUT_DELAY = 220;
const CMD_PAUSE = 500;

const toneClass = {
  volt: 'text-volt',
  ohm: 'text-ohm',
  sage: 'text-sage-300',
} as const;

/**
 * Hero terminal: types each command character by character,
 * then prints its output lines. Runs once, respects
 * prefers-reduced-motion by rendering the full transcript.
 */
export default function Terminal() {
  // (lineIndex, charCount) drives what portion of SCRIPT is shown
  const [progress, setProgress] = useState<{ line: number; chars: number }>({
    line: 0,
    chars: 0,
  });
  const done = progress.line >= SCRIPT.length;
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setProgress({ line: SCRIPT.length, chars: 0 });
      return;
    }
    if (done) return;

    const current = SCRIPT[progress.line];
    if (current.kind === 'cmd') {
      if (progress.chars < current.text.length) {
        timer.current = setTimeout(
          () => setProgress((p) => ({ ...p, chars: p.chars + 1 })),
          TYPE_SPEED,
        );
      } else {
        timer.current = setTimeout(
          () => setProgress((p) => ({ line: p.line + 1, chars: 0 })),
          CMD_PAUSE,
        );
      }
    } else {
      timer.current = setTimeout(
        () => setProgress((p) => ({ line: p.line + 1, chars: 0 })),
        OUT_DELAY,
      );
    }
    return () => clearTimeout(timer.current);
  }, [progress, done]);

  const visible = SCRIPT.slice(0, progress.line + 1)
    .map((line, i) => {
      if (i < progress.line) return line;
      if (line.kind === 'cmd')
        return { ...line, text: line.text.slice(0, progress.chars) };
      return null; // output lines appear whole, never partially
    })
    .filter(Boolean) as Line[];

  return (
    <div
      className="panel reg-marks font-mono"
      role="img"
      aria-label="Terminal animation: system diagnostics report all systems operational"
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-brick" aria-hidden />
        <span className="h-2.5 w-2.5 rounded-full bg-copper" aria-hidden />
        <span className="h-2.5 w-2.5 rounded-full bg-ohm" aria-hidden />
        <span className="ml-3 text-2xs tracking-widest text-sage-500">
          thuto@ohmerohm-labs:~
        </span>
      </div>

      {/* Transcript */}
      <div className="min-h-[290px] space-y-1.5 p-5 text-xs leading-relaxed sm:text-sm">
        {visible.map((line, i) => (
          <p key={i} className="whitespace-pre-wrap break-words">
            {line.kind === 'cmd' ? (
              <>
                <span className="mr-2 text-volt">$</span>
                <span className="text-porcelain">{line.text}</span>
                {!done && i === visible.length - 1 && (
                  <span
                    className="ml-0.5 inline-block h-[1.1em] w-[0.55em] translate-y-[0.2em] animate-blink bg-volt"
                    aria-hidden
                  />
                )}
              </>
            ) : (
              <span className={toneClass[line.tone ?? 'sage']}>
                {line.text}
              </span>
            )}
          </p>
        ))}
        {done && (
          <p>
            <span className="mr-2 text-volt">$</span>
            <span
              className="inline-block h-[1.1em] w-[0.55em] translate-y-[0.2em] animate-blink bg-volt"
              aria-hidden
            />
          </p>
        )}
      </div>
    </div>
  );
}
