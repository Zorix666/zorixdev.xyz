import { motion } from "framer-motion";
import { hubVariants, hubPulseVariants } from "../hooks/useAnimationSequence";

interface HubNodeProps {
  isHovered: boolean;
  onHoverChange: (hovered: boolean) => void;
}

/**
 * Central transit hub node.
 * The anchor point from which all connection lines radiate.
 */
export default function HubNode({ isHovered, onHoverChange }: HubNodeProps) {
  return (
    <motion.div
      className="relative z-20 flex flex-col items-center"
      variants={hubVariants}
      initial="hidden"
      animate="visible"
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
    >
      {/* Outer ring — pulses */}
      <motion.div
        className="absolute rounded-full border"
        style={{
          width: 140,
          height: 140,
          borderColor: isHovered
            ? "rgba(0,87,255,0.25)"
            : "rgba(20,20,19,0.06)",
        }}
        variants={hubPulseVariants}
        animate="animate"
      />

      {/* Middle ring */}
      <motion.div
        className="absolute rounded-full border"
        style={{
          width: 100,
          height: 100,
          borderColor: isHovered
            ? "rgba(0,87,255,0.18)"
            : "rgba(20,20,19,0.08)",
        }}
        animate={
          isHovered
            ? { scale: [1, 1.06, 1], borderColor: ["rgba(0,87,255,0.18)", "rgba(0,87,255,0.3)", "rgba(0,87,255,0.18)"] }
            : { scale: 1 }
        }
        transition={{ duration: 3, repeat: Infinity, ease: [0.45, 0, 0.55, 1] }}
      />

      {/* Inner core */}
      <motion.div
        className="relative flex items-center justify-center rounded-full"
        style={{
          width: 64,
          height: 64,
          background: isHovered
            ? "rgba(0,87,255,0.08)"
            : "rgba(20,20,19,0.04)",
          border: `1px solid ${isHovered ? "rgba(0,87,255,0.25)" : "rgba(20,20,19,0.1)"}`,
        }}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Hub icon — a diamond/rhombus */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke={isHovered ? "#0057ff" : "#141413"}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="12" y="2" width="14" height="14" transform="rotate(45 12 2)" />
          <circle cx="12" cy="12" r="2" fill={isHovered ? "#0057ff" : "#141413"} />
        </svg>
      </motion.div>

      {/* Label */}
      <motion.span
        className="mt-5 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.2em]"
        style={{ color: isHovered ? "#0057ff" : "#b0aea5" }}
        animate={{ opacity: isHovered ? 1 : 0.6 }}
        transition={{ duration: 0.4, ease: [0.25, 0, 0, 1] }}
      >
        Hub
      </motion.span>
    </motion.div>
  );
}
