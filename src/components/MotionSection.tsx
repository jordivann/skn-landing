"use client";

import { motion, type HTMLMotionProps, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type MotionVariant =
  | "fadeUp"
  | "fadeDown"
  | "slideLeft"
  | "slideRight"
  | "scale"
  | "softReveal";

type MotionSectionProps = Omit<
  HTMLMotionProps<"section">,
  "variants" | "initial" | "animate" | "whileInView" | "transition"
> & {
  children: ReactNode;
  variant?: MotionVariant;
  delay?: number;
  once?: boolean;
};

const variants: Record<MotionVariant, Variants> = {
  fadeUp: {
    hidden: {
      opacity: 0,
      y: 64,
      filter: "blur(8px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
    },
  },

  fadeDown: {
    hidden: {
      opacity: 0,
      y: -34,
      filter: "blur(8px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
    },
  },

  slideLeft: {
    hidden: {
      opacity: 0,
      x: 72,
      filter: "blur(8px)",
    },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
    },
  },

  slideRight: {
    hidden: {
      opacity: 0,
      x: -72,
      filter: "blur(8px)",
    },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
    },
  },

  scale: {
    hidden: {
      opacity: 0,
      y: 42,
      scale: 0.96,
      filter: "blur(8px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
    },
  },

  softReveal: {
    hidden: {
      opacity: 0,
      y: 48,
      scale: 0.985,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
    },
  },
};

export default function MotionSection({
  children,
  variant = "fadeUp",
  delay = 0,
  once = true,
  ...sectionProps
}: MotionSectionProps) {
  return (
    <motion.section
      {...sectionProps}
      variants={variants[variant]}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once,
        amount: 0.2,
        margin: "0px 0px -90px 0px",
      }}
      transition={{
        duration: 0.85,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.section>
  );
}