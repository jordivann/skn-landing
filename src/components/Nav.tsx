"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./Nav.module.css";
import { useTheme } from "../hooks/useTheme";
import { getNavServicesTree } from "../app/(pages)/servicios/services.helpers";

type NavItem = {
  href: string;
  label: string;
};

const items: NavItem[] = [{ href: "/", label: "Inicio" }];

const serviceTree = getNavServicesTree();

/** Returns all focusable elements inside a container */
function getFocusable(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
  );
}

export default function Nav() {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [openDesktopCategory, setOpenDesktopCategory] = useState<string | null>(null);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState<string | null>(null);

  const panelId = useId();
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ── Mobile helpers ── */
  const closeMobileMenu = () => {
    setOpen(false);
    setMobileServicesOpen(false);
    setMobileCategoryOpen(null);
  };

  const toggleMobileMenu = () => setOpen((v) => !v);

  /* ── Desktop dropdown helpers ── */
  const clearCloseTimeout = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const openDesktopMenu = (categoryId: string) => {
    clearCloseTimeout();
    setOpenDesktopCategory(categoryId);
  };

  const closeDesktopMenu = () => {
    clearCloseTimeout();
    closeTimeoutRef.current = setTimeout(() => setOpenDesktopCategory(null), 150);
  };

  /* ── Escape key + body scroll lock ── */
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeMobileMenu();
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

  /* ── Focus first element when panel opens ── */
  useEffect(() => {
    if (!open) return;
    const first = panelRef.current?.querySelector<HTMLElement>("a[href], button");
    first?.focus();
  }, [open]);

  /* ── Focus trap inside mobile panel ── */
  useEffect(() => {
    if (!open || !panelRef.current) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const panel = panelRef.current!;
      const focusable = getFocusable(panel);
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  /* ── Close desktop dropdown on outside click ── */
  useEffect(() => {
    const onDocMouseDown = (e: MouseEvent) => {
      const target = e.target as Node;
      const wrappers = document.querySelectorAll("[data-nav-dropdown-root='true']");
      let inside = false;
      wrappers.forEach((node) => { if (node.contains(target)) inside = true; });
      if (!inside) setOpenDesktopCategory(null);
    };

    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, []);

  /* ── Close desktop dropdown on window blur ── */
  useEffect(() => {
    const onBlur = () => setOpenDesktopCategory(null);
    window.addEventListener("blur", onBlur);
    return () => window.removeEventListener("blur", onBlur);
  }, []);

  /* ── Cleanup timeout on unmount ── */
  useEffect(() => () => clearCloseTimeout(), []);

  /* ── Close mobile menu on route change ── */
  useEffect(() => {
    closeMobileMenu();
  }, [pathname]);

  return (
    <>
      <nav className={styles.nav} aria-label="Navegación principal">
        <div className={styles.links}>
          {items.map((item) => (
            <Link
              key={item.href}
              className={styles.link}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}

          {serviceTree.map((category) => {
            const isOpen = openDesktopCategory === category.id;

            return (
              <div
                key={category.id}
                className={styles.categoryDropdown}
                data-nav-dropdown-root="true"
                onMouseEnter={() => openDesktopMenu(category.id)}
                onMouseLeave={closeDesktopMenu}
              >
                <button
                  type="button"
                  className={`${styles.link} ${styles.dropdownTrigger}`}
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                  onClick={() =>
                    setOpenDesktopCategory((prev) =>
                      prev === category.id ? null : category.id
                    )
                  }
                >
                  {category.title}
                  <span className={styles.caret} aria-hidden="true">▾</span>
                </button>

                <div
                  className={`${styles.dropdownMenu} ${isOpen ? styles.dropdownMenuOpen : ""}`}
                  role="menu"
                  aria-label={category.title}
                >
                  <div className={styles.dropdownHeader}>
                    <span className={styles.dropdownTitle}>{category.title}</span>
                    <Link
                      href="/servicios"
                      className={styles.dropdownAll}
                      onClick={() => setOpenDesktopCategory(null)}
                    >
                      Ver todos →
                    </Link>
                  </div>

                  <ul className={styles.dropdownList}>
                    {category.services.map((service) => (
                      <li key={service.id} role="none">
                        <Link
                          href={service.href}
                          className={styles.dropdownItem}
                          role="menuitem"
                          aria-current={pathname === service.href ? "page" : undefined}
                          onClick={() => setOpenDesktopCategory(null)}
                        >
                          {service.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
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

          <Link className={styles.cta} href="/contacto">
            Contactar
          </Link>
        </div>

        <button
          ref={btnRef}
          type="button"
          className={styles.burger}
          onClick={toggleMobileMenu}
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

      <div className={`${styles.mobileRoot} ${open ? styles.open : ""}`}>
        {/* Backdrop — div semántico, no button */}
        <div
          className={styles.backdrop}
          role="presentation"
          onClick={() => {
            closeMobileMenu();
            btnRef.current?.focus();
          }}
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
                closeMobileMenu();
                btnRef.current?.focus();
              }}
              aria-label="Cerrar"
            >
              ✕
            </button>
          </div>

          <div className={styles.panelLinks}>
            {items.map((item) => (
              <Link
                key={item.href}
                className={styles.panelLink}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                onClick={closeMobileMenu}
              >
                {item.label}
              </Link>
            ))}

            <div className={styles.mobileServicesBlock}>
              <button
                type="button"
                className={styles.mobileServicesTrigger}
                onClick={() => setMobileServicesOpen((v) => !v)}
                aria-expanded={mobileServicesOpen}
              >
                <span>Servicios</span>
                <span
                  className={styles.mobileToggleIcon}
                  data-open={mobileServicesOpen ? "1" : "0"}
                  aria-hidden="true"
                >
                  +
                </span>
              </button>

              {mobileServicesOpen && (
                <div className={styles.mobileServicesMenu}>
                  <Link
                    href="/servicios"
                    className={styles.mobileAllServices}
                    onClick={closeMobileMenu}
                  >
                    Ver todos los servicios →
                  </Link>

                  {serviceTree.map((category) => {
                    const isCategoryOpen = mobileCategoryOpen === category.id;

                    return (
                      <div key={category.id} className={styles.mobileCategory}>
                        <button
                          type="button"
                          className={styles.mobileCategoryTrigger}
                          onClick={() =>
                            setMobileCategoryOpen((prev) =>
                              prev === category.id ? null : category.id
                            )
                          }
                          aria-expanded={isCategoryOpen}
                        >
                          <span>{category.title}</span>
                          <span
                            className={styles.mobileToggleIcon}
                            data-open={isCategoryOpen ? "1" : "0"}
                            aria-hidden="true"
                          >
                            +
                          </span>
                        </button>

                        {isCategoryOpen && (
                          <ul className={styles.mobileCategoryList}>
                            {category.services.map((service) => (
                              <li key={service.id}>
                                <Link
                                  href={service.href}
                                  className={styles.mobileServiceLink}
                                  aria-current={pathname === service.href ? "page" : undefined}
                                  onClick={closeMobileMenu}
                                >
                                  {service.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className={styles.panelActions}>
            <button
              type="button"
              className={styles.panelTheme}
              onClick={toggleTheme}
            >
              {theme === "dark" ? "Cambiar a tema claro ☀" : "Cambiar a tema oscuro 🌙"}
            </button>

            <Link
              className={styles.panelCta}
              href="/contacto"
              onClick={closeMobileMenu}
            >
              Contactar
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}