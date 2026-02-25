"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import AppLoader from "./AppLoader";

type Props = {
  children: React.ReactNode;

  durationMs?: number;
  cooldownMs?: number;

  showAfterMs?: number;
  minVisibleMs?: number;
  fadeOutMs?: number;

  lockScroll?: boolean;

  // Scroll manager
  scrollToTopOnRouteChange?: boolean;
  scrollBehavior?: "smooth" | "auto";
  scrollOnlyWhenNotTop?: boolean;

  // ✅ Hash cleanup
  clearHashOnRouteChange?: boolean;  // default true
  clearHashWhenDone?: boolean;       // default true (limpia al finalizar overlay)

  hint?: string;
  appName?: string;
};

const KEY_LAST_SHOWN = "skn_loader_last_shown_at";

function safeClearHash() {
  if (typeof window === "undefined") return;
  if (!window.location.hash) return;

  const urlWithoutHash = window.location.pathname + window.location.search;
  // No recarga, no suma history entry
  window.history.replaceState(null, "", urlWithoutHash);
}

export default function AppLoaderGate({
  children,

  durationMs = 900,
  cooldownMs = 7000,

  showAfterMs = 180,
  minVisibleMs = 520,
  fadeOutMs = 250,

  lockScroll = true,

  scrollToTopOnRouteChange = true,
  scrollBehavior,
  scrollOnlyWhenNotTop = true,

  clearHashOnRouteChange = true,
  clearHashWhenDone = true,

  hint,
  appName = "SKN",
}: Props) {
  const pathname = usePathname();

  const [show, setShow] = useState(false);
  const [leaving, setLeaving] = useState(false);

  const shownAtRef = useRef<number>(0);

  const tShowRef = useRef<number | null>(null);
  const tHideRef = useRef<number | null>(null);
  const tUnmountRef = useRef<number | null>(null);

  const pendingScrollTopRef = useRef(false);
  const pendingClearHashRef = useRef(false);

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  }, []);

  const effectiveBehavior: ScrollBehavior = scrollBehavior
    ? scrollBehavior
    : prefersReducedMotion
      ? "auto"
      : "smooth";

  const clearTimers = () => {
    if (tShowRef.current) window.clearTimeout(tShowRef.current);
    if (tHideRef.current) window.clearTimeout(tHideRef.current);
    if (tUnmountRef.current) window.clearTimeout(tUnmountRef.current);
    tShowRef.current = null;
    tHideRef.current = null;
    tUnmountRef.current = null;
  };

  // ✅ Ruta cambió: decide scrollTop y también limpiar hash
  useEffect(() => {
    if (typeof window === "undefined") return;

    // si venimos con /#contacto o quedó pegado
    if (clearHashOnRouteChange && window.location.hash) {
      // si está el overlay, lo limpiamos al final para no competir con el navegador
      if (show && clearHashWhenDone) pendingClearHashRef.current = true;
      else safeClearHash();
    }

    if (!scrollToTopOnRouteChange) return;

    const shouldScroll =
      !scrollOnlyWhenNotTop || window.scrollY > 0;

    if (!shouldScroll) return;

    if (show) pendingScrollTopRef.current = true;
    else window.scrollTo({ top: 0, left: 0, behavior: effectiveBehavior });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // ✅ Lógica loader “perfecta” + ejecutar acciones pendientes al final
  useEffect(() => {
    const now = Date.now();

    let last = 0;
    try {
      const raw = sessionStorage.getItem(KEY_LAST_SHOWN);
      last = raw ? Number(raw) : 0;
    } catch {
      last = 0;
    }

    const canShowAgain = now - last >= cooldownMs;
    const shouldShow = last === 0 || canShowAgain;

    if (!shouldShow) {
      setShow(false);
      setLeaving(false);
      shownAtRef.current = 0;

      // si no mostramos overlay, ejecutamos pendientes ya
      if (pendingClearHashRef.current) {
        pendingClearHashRef.current = false;
        safeClearHash();
      }
      if (pendingScrollTopRef.current) {
        pendingScrollTopRef.current = false;
        if (!scrollOnlyWhenNotTop || window.scrollY > 0) {
          window.scrollTo({ top: 0, left: 0, behavior: effectiveBehavior });
        }
      }
      return;
    }

    try {
      sessionStorage.setItem(KEY_LAST_SHOWN, String(now));
    } catch {}

    tShowRef.current = window.setTimeout(() => {
      setShow(true);
      setLeaving(false);
      shownAtRef.current = Date.now();
    }, showAfterMs);

    tHideRef.current = window.setTimeout(() => {
      const visibleFor = shownAtRef.current ? Date.now() - shownAtRef.current : 0;

      // no llegó a mostrarse (terminó antes del delay)
      if (!shownAtRef.current) {
        setShow(false);
        setLeaving(false);

        if (pendingClearHashRef.current) {
          pendingClearHashRef.current = false;
          safeClearHash();
        }
        if (pendingScrollTopRef.current) {
          pendingScrollTopRef.current = false;
          if (!scrollOnlyWhenNotTop || window.scrollY > 0) {
            window.scrollTo({ top: 0, left: 0, behavior: effectiveBehavior });
          }
        }
        return;
      }

      const waitMore = Math.max(0, minVisibleMs - visibleFor);

      window.setTimeout(() => {
        setLeaving(true);

        tUnmountRef.current = window.setTimeout(() => {
          setShow(false);
          setLeaving(false);
          shownAtRef.current = 0;

          // ✅ limpiar hash (ya sin overlay)
          if (pendingClearHashRef.current) {
            pendingClearHashRef.current = false;
            safeClearHash();
          }

          // ✅ scroll top (ya sin overlay)
          if (pendingScrollTopRef.current) {
            pendingScrollTopRef.current = false;
            if (!scrollOnlyWhenNotTop || window.scrollY > 0) {
              window.scrollTo({ top: 0, left: 0, behavior: effectiveBehavior });
            }
          }
        }, fadeOutMs);
      }, waitMore);
    }, durationMs);

    return () => clearTimers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cooldownMs, durationMs, fadeOutMs, minVisibleMs, showAfterMs, scrollOnlyWhenNotTop, effectiveBehavior]);

  // ✅ lock scroll mientras overlay visible
  useEffect(() => {
    if (!lockScroll) return;
    if (!show) return;

    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;

    const scrollbarW = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbarW > 0) document.body.style.paddingRight = `${scrollbarW}px`;

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPaddingRight;
    };
  }, [show, lockScroll]);

  return (
    <>
      {show && <AppLoader hint={hint} leaving={leaving} appName={appName} showProgress />}
      {children}
    </>
  );
}
