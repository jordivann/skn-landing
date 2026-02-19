"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ScrollToTopOnRouteChange() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.scrollY > 0) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  }, [pathname]);

  return null;
}
