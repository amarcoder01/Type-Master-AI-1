import { useCallback, useEffect, useLayoutEffect, RefObject, useRef } from 'react';

/**
 * Production-ready cursor positioning hook for typing tests
 * 
 * Key features:
 * - Synchronous position updates using useLayoutEffect
 * - No caching (modern browsers handle getBoundingClientRect efficiently)
 * - Uses data-char-index attribute for reliable element lookup
 * - Handles RTL languages (Arabic, Hebrew)
 * - Responsive to resize, orientation changes, and font loading
 * - Smooth animation with GPU-accelerated transforms
 */

interface UseCursorPositionOptions {
  /** Ref to the container element holding the text */
  containerRef: RefObject<HTMLDivElement>;
  /** Ref to the caret/cursor element */
  caretRef: RefObject<HTMLDivElement>;
  /** Current cursor position (number of typed characters) */
  cursorIndex: number;
  /** Current language code for RTL detection */
  language: string;
  /** Whether the typing test is active */
  isActive: boolean;
  /** Whether the test is finished */
  isFinished: boolean;
  /** Whether to use smooth transitions */
  smoothCaret?: boolean;
  /** Whether user prefers reduced motion */
  prefersReducedMotion?: boolean;
}

// RTL languages that need special cursor positioning
const RTL_LANGUAGES = ['ar', 'he'];

/**
 * Hook that manages cursor position for typing tests
 * Updates cursor position synchronously after DOM changes
 */
export function useCursorPosition({
  containerRef,
  caretRef,
  cursorIndex,
  language,
  isActive,
  isFinished,
  smoothCaret = true,
  prefersReducedMotion = false,
}: UseCursorPositionOptions): void {
  const isRTL = RTL_LANGUAGES.includes(language);
  const rafIdRef = useRef<number | null>(null);

  /**
   * Core position update function
   * Calculates and applies cursor position directly to DOM
   */
  const updatePosition = useCallback(() => {
    const container = containerRef.current;
    const caret = caretRef.current;
    
    if (!container || !caret || isFinished) return;

    const containerRect = container.getBoundingClientRect();
    const computedDir = getComputedStyle(container).direction === 'rtl';
    const attrDir = (container.getAttribute('dir') || '').toLowerCase() === 'rtl';
    const rtl = computedDir || attrDir || isRTL;
    
    // Normalize horizontal scroll to support both LTR and RTL browsers
    const getNormalizedHScroll = () => {
      const sw = container.scrollWidth;
      const cw = container.clientWidth;
      if (sw <= cw + 1) return 0; // No horizontal scroll
      const sl = container.scrollLeft;
      if (!rtl) return sl;
      const diff = sw - cw;
      // Firefox returns negative scrollLeft in RTL, Chrome/Safari return 0..diff reversed
      return sl < 0 ? -sl : Math.max(0, diff - sl);
    };
    const hScroll = getNormalizedHScroll();
    
    let left = 0;
    let top = 0;
    let height = 0; // Will derive from char or computed line-height

    // Strategy 1: Find current character element (cursor positioned at its left edge)
    let charEl = container.querySelector(
      `[data-char-index="${cursorIndex}"]`
    ) as HTMLElement | null;

    if (charEl) {
      // Position cursor at the left edge of the current character
      const rect = charEl.getBoundingClientRect();
      top = (rect.top - containerRect.top) + container.scrollTop;
      left = (rtl ? (rect.right - containerRect.left) : (rect.left - containerRect.left)) + hScroll;
      height = rect.height;
    } else if (cursorIndex === 0) {
      // At start - find first character
      const firstChar = container.querySelector('[data-char-index="0"]') as HTMLElement | null;
      if (firstChar) {
        const rect = firstChar.getBoundingClientRect();
        top = (rect.top - containerRect.top) + container.scrollTop;
        left = (rtl ? (rect.right - containerRect.left) : (rect.left - containerRect.left)) + hScroll;
        height = rect.height;
      } else {
        // No characters yet - use container padding
        const style = getComputedStyle(container);
        left = parseFloat(style.paddingLeft) || 16;
        top = parseFloat(style.paddingTop) || 16;
        const lh = parseFloat(style.lineHeight);
        const fs = parseFloat(style.fontSize) || 16;
        height = (isFinite(lh) && lh > 0) ? lh : Math.round(fs * 1.3);
      }
    } else {
      // Cursor is past all characters - position at the right edge of last character
      const prevChar = container.querySelector(
        `[data-char-index="${cursorIndex - 1}"]`
      ) as HTMLElement | null;
      
      if (prevChar) {
        const rect = prevChar.getBoundingClientRect();
        top = (rect.top - containerRect.top) + container.scrollTop;
        left = (rtl ? (rect.left - containerRect.left) : (rect.right - containerRect.left)) + hScroll;
        height = rect.height;
      } else {
        // Fallback: find any character to get height reference
        const anyChar = container.querySelector('[data-char-index]') as HTMLElement | null;
        if (anyChar) {
          const rect = anyChar.getBoundingClientRect();
          height = rect.height;
        }
        // Use container padding as position
        const style = getComputedStyle(container);
        left = parseFloat(style.paddingLeft) || 16;
        top = parseFloat(style.paddingTop) || 16;
        if (!height || height <= 0) {
          const lh = parseFloat(style.lineHeight);
          const fs = parseFloat(style.fontSize) || 16;
          height = (isFinite(lh) && lh > 0) ? lh : Math.round(fs * 1.3);
        }
      }
    }

    // Round for crisp rendering (avoid sub-pixel blur)
    const rLeft = Math.max(0, Math.round(left));
    const rTop = Math.max(0, Math.round(top));
    // Use measured height or computed fallback without imposing an oversized minimum
    const rHeight = Math.max(2, Math.round(height));

    // Apply position directly to DOM (GPU-accelerated)
    caret.style.transform = `translate3d(${rLeft}px, ${rTop}px, 0)`;
    caret.style.height = `${rHeight}px`;

    // Toggle transition based on typing activity
    if (prefersReducedMotion || !smoothCaret) {
      caret.classList.add('no-transition');
    } else {
      caret.classList.remove('no-transition');
    }
  }, [containerRef, caretRef, cursorIndex, isRTL, isFinished, smoothCaret, prefersReducedMotion]);

  // Coalesced scheduling to avoid redundant layout work in a single frame
  const scheduleUpdate = useCallback(() => {
    if (rafIdRef.current !== null) return;
    rafIdRef.current = requestAnimationFrame(() => {
      rafIdRef.current = null;
      updatePosition();
    });
  }, [updatePosition]);

  /**
   * Use useLayoutEffect for synchronous updates after DOM changes
   * This ensures cursor position is updated before browser paint
   */
  useLayoutEffect(() => {
    updatePosition();
  }, [updatePosition, cursorIndex]);

  /**
   * Handle resize events with ResizeObserver
   * Recalculates position when container dimensions change
   */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver(() => {
      scheduleUpdate();
    });

    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, [containerRef, scheduleUpdate]);

  /**
   * Handle window resize and orientation changes
   */
  useEffect(() => {
    const handleResize = () => {
      scheduleUpdate();
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [scheduleUpdate]);

  /**
   * Handle visibility change (tab switching, screen wake)
   */
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        scheduleUpdate();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [scheduleUpdate]);

  /**
   * Handle font loading - positions may change after fonts load
   */
  useEffect(() => {
    if ('fonts' in document) {
      document.fonts.ready.then(() => {
        scheduleUpdate();
      });
    }
  }, [scheduleUpdate]);

  /**
   * Handle scroll events - recalculate position during scroll
   */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      scheduleUpdate();
    };

    container.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [containerRef, scheduleUpdate]);

  /**
   * Observe DOM mutations (attributes/style/class changes or text updates)
   * to maintain accurate caret position during dynamic UI updates.
   */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new MutationObserver(() => {
      scheduleUpdate();
    });

    observer.observe(container, {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: true,
      attributeFilter: ['class', 'style', 'dir', 'lang']
    });

    return () => observer.disconnect();
  }, [containerRef, scheduleUpdate]);

  // Cleanup any pending rAF on unmount
  useEffect(() => () => {
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
  }, []);
}

export default useCursorPosition;

