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

  // Mantener ref al día para evitar “stale closure” en el interval
  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  const go = (i: number) => {
    const next = (i + slides.length) % slides.length;
    onIndexChange(next);
  };

  const prev = () => go(index - 1);
  const next = () => go(index + 1);

  useEffect(() => {
    if (paused || slides.length <= 1) return;

    timerRef.current = window.setInterval(() => {
      const current = indexRef.current;
      onIndexChange((current + 1) % slides.length);
    }, autoplayMs);

    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
      timerRef.current = null;
    };
  }, [paused, slides.length, autoplayMs, onIndexChange]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  };

  return (
  <div
    className={styles.wrap}
    style={{ ["--dur" as any]: `${autoplayMs}ms` }}
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
        {slides.map((s, i) => (
          <button
            key={s.id}
            type="button"
            className={`${styles.step} ${i === index ? styles.stepActive : ""}`}
            onClick={() => onIndexChange(i)}
            aria-label={`Ir al slide ${i + 1}`}
            aria-pressed={i === index}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <button
        type="button"
        className={styles.navBtn}
        onClick={next}
        aria-label="Siguiente slide"
      >
        ›
      </button>
    </div>

    <div className={styles.progress} aria-hidden="true">
      <div key={index} className={styles.progressTrack}>
        <span className={styles.progressFill} />
      </div>
    </div>

    <p className={styles.hint} aria-hidden="true">
      {paused ? "Pausado" : "Autoplay"}
    </p>
  </div>
);

}
  