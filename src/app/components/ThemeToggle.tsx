'use client';

import { useSyncExternalStore } from 'react';
import { TbMoon, TbSun } from 'react-icons/tb';

type Theme = 'light' | 'dark';

const STORAGE_KEY = 'oo-theme';

/* The active theme lives on <html data-theme> (applied before paint by
   the inline script in layout.tsx). That is external state, so it is
   read through a store subscription rather than mirrored into React
   state from an effect. The MutationObserver keeps the icon in sync
   even if the attribute is changed from elsewhere. */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  });
  return () => observer.disconnect();
}

const getSnapshot = (): Theme =>
  (document.documentElement.getAttribute('data-theme') as Theme) ?? 'dark';

// Matches the SSR default in layout.tsx, so hydration is stable.
const getServerSnapshot = (): Theme => 'dark';

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isDark = theme === 'dark';

  const toggle = () => {
    const next: Theme = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage blocked — session-only toggle still works */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className="flex h-9 w-9 items-center justify-center border border-line text-sage-400 transition-colors duration-200 hover:border-ohm/60 hover:text-volt"
    >
      {isDark ? (
        <TbSun className="h-4 w-4" aria-hidden="true" />
      ) : (
        <TbMoon className="h-4 w-4" aria-hidden="true" />
      )}
    </button>
  );
}
