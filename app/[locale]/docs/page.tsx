"use client";

import { useState } from "react";
import { Badge, Chip } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────
type PhaseStatus = "complete" | "progress" | "planned";

interface Phase {
  num: string;         // e.g. "01"
  title: string;       // e.g. "Math Foundations"
  done: number;
  total: number;
  status: PhaseStatus;
  prereqs: string[];
  unlocks: string[];
}

// ─── Data ─────────────────────────────────────────────────────────
const PHASES: Phase[] = [
  {
    num: "01", title: "Math Foundations", done: 22, total: 22, status: "complete",
    prereqs: ["High school algebra", "Basic logic"],
    unlocks: ["Linear Algebra", "Probability & Stats", "Calculus"],
  },
  {
    num: "02", title: "Linear Algebra", done: 18, total: 18, status: "complete",
    prereqs: ["Math Foundations"],
    unlocks: ["ML Fundamentals", "Computer Vision", "NLP"],
  },
  {
    num: "03", title: "Probability & Stats", done: 20, total: 20, status: "complete",
    prereqs: ["Math Foundations"],
    unlocks: ["ML Fundamentals", "Bayesian Inference"],
  },
  {
    num: "04", title: "Python for ML", done: 15, total: 15, status: "complete",
    prereqs: ["Basic programming"],
    unlocks: ["ML Fundamentals", "Data Engineering"],
  },
  {
    num: "05", title: "ML Fundamentals", done: 12, total: 24, status: "progress",
    prereqs: ["Linear Algebra", "Probability & Stats", "Python for ML"],
    unlocks: ["Deep Learning", "Model Evaluation"],
  },
  {
    num: "06", title: "Data Engineering", done: 0, total: 16, status: "planned",
    prereqs: ["Python for ML"],
    unlocks: ["MLOps", "Feature Stores"],
  },
  {
    num: "07", title: "Deep Learning", done: 0, total: 30, status: "planned",
    prereqs: ["ML Fundamentals"],
    unlocks: ["Computer Vision", "NLP", "Transformers"],
  },
  {
    num: "08", title: "Transformers & LLMs", done: 0, total: 22, status: "planned",
    prereqs: ["Deep Learning"],
    unlocks: ["Fine-tuning", "RAG Systems", "Agents"],
  },
  {
    num: "09", title: "MLOps & Deployment", done: 0, total: 18, status: "planned",
    prereqs: ["ML Fundamentals", "Data Engineering"],
    unlocks: ["Production Systems"],
  },
  {
    num: "10", title: "AI Agents", done: 0, total: 20, status: "planned",
    prereqs: ["Transformers & LLMs"],
    unlocks: ["Multi-agent Systems", "AI Applications"],
  },
];

// ─── Badge config ─────────────────────────────────────────────────
const STATUS_CONFIG: Record<
  PhaseStatus,
  { label: string; color: "success" | "warning" | "default" }
> = {
  complete: { label: "Complete", color: "success" },
  progress: { label: "In progress", color: "warning" },
  planned:  { label: "Planned",    color: "default" },
};

const PROGRESS_COLOR: Record<PhaseStatus, string> = {
  complete: "bg-success",
  progress: "bg-warning",
  planned:  "bg-default-300",
};

// ─── Phase card ───────────────────────────────────────────────────
function PhaseCard({
  phase,
  isSelected,
  onClick,
}: {
  phase: Phase;
  isSelected: boolean;
  onClick: () => void;
}) {
  const pct = phase.total ? Math.round((phase.done / phase.total) * 100) : 0;
  const status = STATUS_CONFIG[phase.status];

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15 }}
      aria-pressed={isSelected}
      className={`
        text-left w-full rounded-xl border p-4 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus
        ${isSelected
          ? "border-foreground/40 bg-content2 shadow-sm"
          : "border-divider bg-content1 hover:border-default-300"
        }
      `}
    >
      {/* Phase number */}
      <p className="font-mono text-[11px] tracking-wide text-default-400 mb-1.5">
        {phase.num}
      </p>

      {/* Title */}
      <p className="text-sm font-medium text-foreground leading-snug mb-3">
        {phase.title}
      </p>

      {/* Progress bar */}
      <div className="h-[3px] w-full rounded-full bg-default-200 mb-3 overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${PROGRESS_COLOR[phase.status]}`}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-[11px] text-default-400">
          {phase.done}/{phase.total}
        </span>
        <Chip
          size="sm"
          color={status.color}
          variant="flat"
          className="text-[10px] h-5 px-2"
        >
          {status.label}
        </Chip>
      </div>
    </motion.button>
  );
}

// ─── Detail panel ─────────────────────────────────────────────────
function DetailPanel({ phase, onClose }: { phase: Phase; onClose: () => void }) {
  return (
    <motion.div
      key={phase.num}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="mt-4 rounded-xl border border-divider bg-content1 p-5"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="font-mono text-xs text-default-400 mb-0.5">{phase.num}</p>
          <h2 className="text-base font-medium text-foreground">{phase.title}</h2>
        </div>
        <button
          onClick={onClose}
          aria-label="Close detail panel"
          className="text-default-400 hover:text-foreground transition-colors p-1 -mr-1 -mt-1 rounded-lg hover:bg-default-100"
        >
          <i className="ti ti-x text-lg" aria-hidden="true" />
        </button>
      </div>

      {/* Two-column sections */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Prerequisites */}
        <div className="rounded-lg bg-content2 p-4">
          <p className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-widest text-default-400 mb-3">
            <i className="ti ti-arrow-left text-sm" aria-hidden="true" />
            Prerequisites
          </p>
          {phase.prereqs.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {phase.prereqs.map((r) => (
                <span
                  key={r}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-divider bg-content1 px-2.5 py-1 text-xs text-default-500"
                >
                  <i className="ti ti-point-filled text-[13px]" aria-hidden="true" />
                  {r}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-default-400">None — entry point</p>
          )}
        </div>

        {/* Unlocks */}
        <div className="rounded-lg bg-content2 p-4">
          <p className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-widest text-default-400 mb-3">
            <i className="ti ti-arrow-right text-sm" aria-hidden="true" />
            Unlocks
          </p>
          {phase.unlocks.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {phase.unlocks.map((u) => (
                <span
                  key={u}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-divider bg-content1 px-2.5 py-1 text-xs text-default-500"
                >
                  <i className="ti ti-lock-open text-[13px]" aria-hidden="true" />
                  {u}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-default-400">Final phase</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────
export default function RoadmapPage() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const handleSelect = (idx: number) => {
    setSelectedIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="py-10 px-4 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-medium text-foreground mb-2">
          Learning roadmap
        </h1>
        <p className="text-sm text-default-500">
          Click any phase to see prerequisites and what it unlocks.
        </p>
      </div>

      {/* Phase grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {PHASES.map((phase, idx) => (
          <PhaseCard
            key={phase.num}
            phase={phase}
            isSelected={selectedIdx === idx}
            onClick={() => handleSelect(idx)}
          />
        ))}
      </div>

      {/* Detail panel (animated) */}
      <AnimatePresence mode="wait">
        {selectedIdx !== null && (
          <DetailPanel
            key={selectedIdx}
            phase={PHASES[selectedIdx]}
            onClose={() => setSelectedIdx(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}