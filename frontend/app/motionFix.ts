// utils/motionFix.ts
import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";

// Extend built-in motion components to retain `className` and HTML props
export const MotionDiv = motion.div as React.FC<HTMLMotionProps<"div">>;
export const MotionSpan = motion.span as React.FC<HTMLMotionProps<"span">>;
export const MotionForm = motion.form as React.FC<HTMLMotionProps<"form">>;
export const MotionButton = motion.button as React.FC<HTMLMotionProps<"button">>;
export const MotionInput = motion.input as React.FC<HTMLMotionProps<"input">>;
export const MotionP = motion.p as React.FC<HTMLMotionProps<"p">>;
export const MotionH2 = motion.h2 as React.FC<HTMLMotionProps<"h2">>;
export const MotionA = motion.a as React.FC<HTMLMotionProps<"a">>;
