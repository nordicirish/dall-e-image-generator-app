import { useState, useEffect } from 'react';

/* useMobileScreen Hook
 * This hook determines if the current screen size is considered mobile.
 * It uses a breakpoint of 768px (typical mobile breakpoint) to differentiate between mobile and desktop.
 * returns {boolean} true if the screen is mobile, false otherwise
 */

export function useMobileScreen() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    function handleResize() {
      setIsMobile(window.innerWidth <= 768);
    }

    // Add event listener for window resize, call handleResize immediately, and clean up on unmount
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
}