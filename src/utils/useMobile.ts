import { useState, useCallback, useEffect } from "react";

export const useMediaQuery = (width: number): boolean => {
  const [targetReached, setTargetReached] = useState(false);

  const updateTarget = useCallback((e) => {
    if (e.matches) {
      setTargetReached(true);
    } else {
      setTargetReached(false);
    }
  }, []);

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${width}px)`);

    media.addListener(updateTarget);

    // Check on mount (callback is not called until a change occurs)
    if (media.matches) {
      setTargetReached(true);
    }

    return () => media.removeListener(updateTarget);
  }, [updateTarget, width]);

  return targetReached;
};

export const useMobile = () => {
  return useMediaQuery(959);
};

// Tailwind CSS default Responsive
export const Responsive = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export type DeviceSize = "mobile" | "tablet" | "small" | "large" | "xl" | "2xl";

export interface UseResponsiveReturn {
  columnMaxSpan: number;
}

/**
 * Hook that returns device size Responsive based on Tailwind CSS Responsive
 *
 * @returns Object containing boolean flags for each breakpoint and current device size
 *
 * @example
 * const { isMobile, isTablet, currentSize } = useResponsive();
 * if (isMobile) {
 *   // Render mobile layout
 * }
 */
export const useResponsive = (): UseResponsiveReturn => {
  const [width, setWidth] = useState(0);

  const updateWidth = useCallback(() => {
    setWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    // Set initial width
    updateWidth();

    // Add event listener
    window.addEventListener("resize", updateWidth);

    return () => window.removeEventListener("resize", updateWidth);
  }, [updateWidth]);

  const isMobile = width < Responsive.sm;
  const isTablet = width >= Responsive.sm && width < Responsive.md;
  const isSmall = width >= Responsive.md && width < Responsive.lg;
  const isLarge = width >= Responsive.lg && width < Responsive.xl;
  const isXl = width >= Responsive.xl && width < Responsive["2xl"];
  const is2Xl = width >= Responsive["2xl"];

  const getCurrentSize = (): DeviceSize => {
    if (isMobile) return "mobile";
    if (isTablet) return "tablet";
    if (isSmall) return "small";
    if (isLarge) return "large";
    if (isXl) return "xl";
    return "2xl";
  };
  
  const getColumnMaxSpan = () => {
    return {
      mobile: 1,
      tablet: 2,
      small: 3,
      large: 4,
      xl: 5,
      "2xl": 6
    }[getCurrentSize()]
  }

  return {
    columnMaxSpan: getColumnMaxSpan()
  };
};
