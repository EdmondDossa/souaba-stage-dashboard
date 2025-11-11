import { useState, useEffect } from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < MOBILE_BREAKPOINT);

    useEffect(() => {
        const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

        const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);

        // Compatibilité
        if (mql.addEventListener) {
            mql.addEventListener("change", onChange);
        } else {
            mql.addListener(onChange);
        }

        // Nettoyage
        return () => {
            if (mql.removeEventListener) {
                mql.removeEventListener("change", onChange);
            } else {
                mql.removeListener(onChange);
            }
        };
    }, []);

    return isMobile;
}
