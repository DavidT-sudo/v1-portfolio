'use client';

import { useEffect, useState } from 'react';
import { TbMoon, TbSun } from 'react-icons/tb';

type Theme = 'light' | 'dark';

const STORAGE_KEY = 'oo-theme';

/**
 * Light/dark toggle. The initial theme is applied before paint by
 * the inline script in layout.tsx (no flash); this component reads
 * that state on mount, then flips the `data-theme` attribute and
 * persists the choice.
 */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const current =
      (document.documentElement.getAttribute('data-theme') as Theme) ?? 'dark';
    setTheme(current);
    setMounted(true);
  }, []);

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage blocked — session-only toggle still works */
    }
  };

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className="flex h-9 w-9 items-center justify-center border border-line text-sage-400 transition-colors duration-200 hover:border-ohm/60 hover:text-volt"
    >
      {/* Render a stable icon until mounted to avoid hydration mismatch */}
      {mounted && !isDark ? (
        <TbMoon className="h-4 w-4" aria-hidden="true" />
      ) : (
        <TbSun className="h-4 w-4" aria-hidden="true" />
      )}
    </button>
  );
}
