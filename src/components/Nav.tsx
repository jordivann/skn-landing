"use client";

import { useEffect, useId, useRef, useState } from "react";
import styles from "./Nav.module.css";
import { useTheme } from "../hooks/useTheme";

type NavItem = { href: string; label: string };

const items: NavItem[] = [
  { href: "#services", label: "Servicios" },
  { href: "#process", label: "Proceso" },
  { href: "#faq", label: "FAQ" },
];

export default function Nav() {
  const { theme, toggleTheme } = useTheme();

  const [open, setOpen] = useState(false);
  const panelId = useId();
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const close = () => setOpen(false);
  const toggle = () => setOpen((v) => !v);

  // Cerrar con Escape + bloquear scroll cuando está abierto
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        btnRef.current?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  // Enfoque inicial dentro del panel al abrir (simple y efectivo)
  useEffect(() => {
    if (!open) return;
    const first = panelRef.current?.querySelector<HTMLAnchorElement>(
      `a[href="${items[0].href}"]`
    );
    first?.focus();
  }, [open]);

  return (
    <>
      {/* Desktop */}
      <nav className={styles.nav} aria-label="Navegación principal">
        <div className={styles.links}>
          {items.map((x) => (
            <a key={x.href} className={styles.link} href={x.href}>
              {x.label}
            </a>
          ))}
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.themeBtn}
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
            title={theme === "dark" ? "Tema claro" : "Tema oscuro"}
          >
            {theme === "dark" ? "☀" : "🌙"}
          </button>

          <a className={styles.cta} href="#contact">
            Contactar
          </a>
        </div>

        {/* Mobile: botón */}
        <button
          ref={btnRef}
          type="button"
          className={styles.burger}
          onClick={toggle}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls={panelId}
        >
          <span className={styles.burgerIcon} aria-hidden="true" data-open={open ? "1" : "0"}>
            <span />
            <span />
          </span>
        </button>
      </nav>

      {/* Overlay + panel mobile */}
      <div className={`${styles.mobileRoot} ${open ? styles.open : ""}`}>
        <button
          type="button"
          className={styles.backdrop}
          onClick={() => {
            close();
            btnRef.current?.focus();
          }}
          aria-label="Cerrar menú"
          tabIndex={open ? 0 : -1}
        />

        <div
          id={panelId}
          ref={panelRef}
          className={styles.panel}
          role="dialog"
          aria-modal="true"
          aria-label="Menú"
          tabIndex={-1}
        >
          <div className={styles.panelTop}>
            <span className={styles.panelTitle}>Menú</span>

            <button
              type="button"
              className={styles.closeBtn}
              onClick={() => {
                close();
                btnRef.current?.focus();
              }}
              aria-label="Cerrar"
            >
              ✕
            </button>
          </div>

          <div className={styles.panelLinks}>
            {items.map((x) => (
              <a
                key={x.href}
                className={styles.panelLink}
                href={x.href}
                onClick={() => close()}
              >
                {x.label}
              </a>
            ))}
          </div>

          <div className={styles.panelActions}>
            <button
              type="button"
              className={styles.panelTheme}
              onClick={toggleTheme}
            >
              {theme === "dark" ? "Cambiar a tema claro ☀" : "Cambiar a tema oscuro 🌙"}
            </button>

            <a className={styles.panelCta} href="#contact" onClick={() => close()}>
              Contactar
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
