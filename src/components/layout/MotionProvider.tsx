"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/** Respeta la preferencia del sistema de reducir animaciones. */
export const MotionProvider = ({ children }: { children: ReactNode }) => (
  <MotionConfig reducedMotion="user">{children}</MotionConfig>
);
