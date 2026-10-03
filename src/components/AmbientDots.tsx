import { motion } from "framer-motion";

/**
 * Subtle dot-grid texture overlay.
 * Uses SVG pattern for crisp rendering at all scales.
 */
export default function AmbientDots() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      {/* SVG dot grid */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.025]">
        <defs>
          <pattern
            id="dot-grid"
            x="0"
            y="0"
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="1" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dot-grid)" />
      </svg>

      {/* Radial vignette */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 55% at 50% 45%, transparent 30%, rgba(250,249,245,0.7) 90%)",
        }}
        animate={{ opacity: [0.6, 0.8, 0.6] }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: [0.45, 0, 0.55, 1],
        }}
      />
    </div>
  );
}
