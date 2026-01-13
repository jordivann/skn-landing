"use client";

import { useLayoutEffect, useState } from "react";
import AppLoader from "./AppLoader";

type Props = {
  children: React.ReactNode;
  durationMs?: number;   // cuánto tiempo se queda visible cuando aparece
  cooldownMs?: number;   // tiempo mínimo para volver a mostrarlo en refresh
  hint?: string;
};

const KEY_LAST_SHOWN = "skn_loader_last_shown_at";

export default function AppLoaderGate({
  children,
  durationMs = 900,
  cooldownMs = 7000,
  hint = "Preparando experiencia SKN…",
}: Props) {
  // IMPORTANTE: arrancamos mostrando el overlay para que tape todo desde el inicio.
  const [show, setShow] = useState(true);

  useLayoutEffect(() => {
    const now = Date.now();

    let last = 0;
    try {
      const raw = sessionStorage.getItem(KEY_LAST_SHOWN);
      last = raw ? Number(raw) : 0;
    } catch {
      // si sessionStorage no está disponible, mostramos igual (modo seguro)
      last = 0;
    }

    const canShowAgain = now - last >= cooldownMs;
    const shouldShow = last === 0 || canShowAgain;

    if (!shouldShow) {
      // Dentro de cooldown: ocultar YA, sin esperar (evita flash)
      setShow(false);
      return;
    }

    // Marcamos “mostrado” apenas decidimos mostrarlo
    try {
      sessionStorage.setItem(KEY_LAST_SHOWN, String(now));
    } catch {
      // no pasa nada
    }

    // Se queda visible durationMs y se va
    const t = window.setTimeout(() => setShow(false), durationMs);
    return () => window.clearTimeout(t);
  }, [cooldownMs, durationMs]);

  return (
    <>
      {show && <AppLoader hint={hint} />}
      {children}
    </>
  );
}
