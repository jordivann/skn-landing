"use client";

import Link from "next/link";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import styles from "./Nav.module.css";
import { useTheme } from "../hooks/useTheme";
import { getNavServicesTree } from "../app/(pages)/servicios/services.helpers";

type NavItem = {
  href: string;
  label: string;
};

const items: NavItem[] = [{ href: "/", label: "Inicio" }];

const serviceTree = getNavServicesTree();

export default function Nav() {
  const { theme, toggleTheme } = useTheme();

  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState<string | null>(null);

  const [activeDesktopCategory, setActiveDesktopCategory] = useState<string>(
    serviceTree[0]?.id ?? ""
  );

  const panelId = useId();
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const servicesRef = useRef<HTMLDivElement | null>(null);

  const activeCategory = useMemo(
    () => serviceTree.find((category) => category.id === activeDesktopCategory) ?? serviceTree[0],
    [activeDesktopCategory]
  );

  const close = () => {
    setOpen(false);
    setMobileServicesOpen(false);
    setMobileCategoryOpen(null);
  };

  const toggle = () => setOpen((v) => !v);

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

  useEffect(() => {
    if (!open) return;
    const first = panelRef.current?.querySelector<HTMLAnchorElement>("a[href]");
    first?.focus();
  }, [open]);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (!servicesRef.current) return;
      if (!servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };

    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  useEffect(() => {
    if (servicesOpen && serviceTree[0]?.id) {
      setActiveDesktopCategory((prev) => prev || serviceTree[0].id);
    }
  }, [servicesOpen]);

  return (
    <>
      <nav className={styles.nav} aria-label="Navegación principal">
        <div className={styles.links}>
          {items.map((x) => (
            <Link key={x.href} className={styles.link} href={x.href}>
              {x.label}
            </Link>
          ))}

          <div
            className={styles.servicesDropdown}
            ref={servicesRef}
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              type="button"
              className={`${styles.link} ${styles.dropdownTrigger}`}
              aria-expanded={servicesOpen}
              aria-haspopup="true"
              onClick={() => setServicesOpen((v) => !v)}
            >
              Servicios
              <span className={styles.caret} aria-hidden="true">
                ▾
              </span>
            </button>

            <div
              className={`${styles.dropdownMenu} ${
                servicesOpen ? styles.dropdownMenuOpen : ""
              }`}
            >
              <div className={styles.dropdownInner}>
                <aside className={styles.dropdownSidebar}>
                  <div className={styles.dropdownSidebarTop}>
                    <Link
                      href="/servicios"
                      className={styles.dropdownCategoryAll}
                      onClick={() => setServicesOpen(false)}
                    >
                      Ver todos los servicios
                    </Link>
                  </div>

                  <ul className={styles.dropdownCategoryList}>
                    {serviceTree.map((category) => {
                      const isActive = activeCategory?.id === category.id;

                      return (
                        <li key={category.id}>
                          <button
                            type="button"
                            className={`${styles.dropdownCategoryButton} ${
                              isActive ? styles.dropdownCategoryButtonActive : ""
                            }`}
                            onMouseEnter={() => setActiveDesktopCategory(category.id)}
                            onFocus={() => setActiveDesktopCategory(category.id)}
                            onClick={() => setActiveDesktopCategory(category.id)}
                          >
                            <span>{category.title}</span>
                            <span className={styles.dropdownCategoryArrow}>→</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </aside>

                <section className={styles.dropdownContent}>
                  <div className={styles.dropdownContentHead}>
                    <h3 className={styles.dropdownContentTitle}>
                      {activeCategory?.title}
                    </h3>

                    <Link
                      href="/servicios"
                      className={styles.dropdownContentLink}
                      onClick={() => setServicesOpen(false)}
                    >
                      Ir a categoría
                    </Link>
                  </div>

                  <ul className={styles.dropdownServicesList}>
                    {activeCategory?.services.map((service) => (
                      <li key={service.id}>
                        <Link
                          href={service.href}
                          className={styles.dropdownServiceCard}
                          onClick={() => setServicesOpen(false)}
                        >
                          <span className={styles.dropdownServiceTitle}>
                            {service.title}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </div>
          </div>
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
              <Link
                key={x.href}
                className={styles.panelLink}
                href={x.href}
                onClick={() => close()}
              >
                {x.label}
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
                <span>{mobileServicesOpen ? "−" : "+"}</span>
              </button>

              {mobileServicesOpen && (
                <div className={styles.mobileServicesMenu}>
                  <Link
                    href="/servicios"
                    className={styles.mobileAllServices}
                    onClick={() => close()}
                  >
                    Ver todos los servicios
                  </Link>

                  {serviceTree.map((category) => {
                    const isOpen = mobileCategoryOpen === category.id;

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
                          aria-expanded={isOpen}
                        >
                          <span>{category.title}</span>
                          <span>{isOpen ? "−" : "+"}</span>
                        </button>

                        {isOpen && (
                          <ul className={styles.mobileCategoryList}>
                            {category.services.map((service) => (
                              <li key={service.id}>
                                <Link
                                  href={service.href}
                                  className={styles.mobileServiceLink}
                                  onClick={() => close()}
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

            <Link className={styles.panelCta} href="/contacto" onClick={() => close()}>
              Contactar
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}