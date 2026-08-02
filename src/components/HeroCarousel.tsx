"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./HeroCarousel.module.css";
import type { Slide } from "./Hero";

type Props = {
  slides: Slide[];
  index: number;
  onIndexChange: (i: number) => void;
  autoplayMs?: number;
};

export default function HeroCarousel({
  slides,
  index,
  onIndexChange,
  autoplayMs = 5200,
}: Props) {
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<number | null>(null);
  const indexRef = useRef(index);

  useEffect(() => { indexRef.current = index; }, [index]);

  const clearTimer = () => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const go = (i: number) => {
    if (!slides.length) return;
    onIndexChange((i + slides.length) % slides.length);
  };

  const prev = () => go(index - 1);
  const next = () => go(index + 1);

  useEffect(() => {
    clearTimer();
    if (paused || slides.length <= 1) return;

    timerRef.current = window.setInterval(() => {
      onIndexChange((indexRef.current + 1) % slides.length);
    }, autoplayMs);

    return clearTimer;
  }, [paused, slides.length, autoplayMs, onIndexChange]);

  useEffect(() => () => clearTimer(), []);

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft")  { e.preventDefault(); prev(); }
    if (e.key === "ArrowRight") { e.preventDefault(); next(); }
  };

  if (!slides.length) return null;

  const fmt = (n: number) => String(n).padStart(2, "0");

  return (
    <div
      className={styles.wrap}
      style={{ ["--dur" as string]: `${autoplayMs}ms` }}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      aria-label="Control de slides"
      data-paused={paused ? "1" : "0"}
    >
      <div className={styles.row}>
        <button
          type="button"
          className={styles.navBtn}
          onClick={prev}
          aria-label="Slide anterior"
        >
          ‹
        </button>

        <div className={styles.steps} role="tablist" aria-label="Selector de slide">
          {slides.map((slide, i) => {
            const isActive = i === index;
            return (
              <button
                key={slide.id}
                type="button"
                className={`${styles.step} ${isActive ? styles.stepActive : ""}`}
                onClick={() => onIndexChange(i)}
                aria-label={`Ir al slide ${i + 1}: ${slide.title}`}
                aria-pressed={isActive}
                role="tab"
                aria-selected={isActive}
              >
                {fmt(i + 1)}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          className={styles.navBtn}
          onClick={next}
          aria-label="Siguiente slide"
        >
          ›
        </button>

        {/* Badge de posición: "01 / 05" */}
        <span className={styles.badge} aria-hidden="true">
          {fmt(index + 1)}&thinsp;/&thinsp;{fmt(slides.length)}
        </span>
      </div>

      {/* Estado de reproducción */}
      <p className={styles.hint} aria-live="polite" aria-atomic="true">
        {paused ? "Pausado" : "Autoplay"}
      </p>
    </div>
  );
}