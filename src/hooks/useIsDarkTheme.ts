import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

/**
 * Custom hook to determine if the current theme is dark mode.
 * Prevents hydration mismatches by only returning the theme after mounting on the client.
 *
 * @returns {boolean} True if the current theme is "dark", false otherwise.
 *                    Returns false during SSR to prevent hydration errors.
 *
 * @example
 * const isDark = useIsDarkTheme();
 * return <div className={isDark ? "dark-style" : "light-style"}>...</div>;
 */
export const useIsDarkTheme = (): boolean => {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted on client-side before accessing theme
  useEffect(() => {
    setMounted(true);
  }, []);

  // Return false during SSR to prevent hydration mismatch
  if (!mounted) {
    return false;
  }

  // Use resolvedTheme as fallback when theme is "system"
  return (theme === "dark") || (resolvedTheme === "dark");
};
