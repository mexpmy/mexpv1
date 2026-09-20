import Link from "next/link";

export const metadata = {
  title: "Inside a SATA hard disk drive",
  description: "A visual explainer on the mechanics, magnetics, and thermodynamics of a modern 3.5-inch SATA hard disk drive.",
};

export default function SataHddPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-6xl px-6 pb-20 pt-12">
        <Link href="/ai-ml/data" className="inline-flex items-center text-xs font-mono tracking-[2px] text-purple-400 transition hover:text-purple-300">← BACK TO DATA</Link>
        <div className="mt-10 max-w-3xl">
          <div className="text-sm font-mono tracking-[4px] text-purple-400">AI / ML · DATA · HARDWARE</div>
          <h1 className="mt-4 text-5xl font-black leading-[0.95] tracking-[-2px] sm:text-7xl">Inside a SATA<br />hard disk drive</h1>
          <p className="mt-6 text-xl leading-relaxed text-zinc-300">A three-minute vertical explainer on the mechanics, magnetics, and thermodynamics of a modern 3.5-inch drive.</p>
        </div>

        <div className="mt-12 overflow-hidden border border-white/10 bg-black shadow-2xl shadow-purple-950/20">
          <iframe
            title="Inside a SATA hard disk drive explainer"
            src="/labs/ai-ml/data/sata-hdd-explainer.html"
            className="block h-[min(900px,calc(100vh-120px))] min-h-[640px] w-full border-0"
            allow="fullscreen"
          />
        </div>

        <div className="mt-8 grid gap-6 border-t border-white/10 pt-8 text-sm text-zinc-400 sm:grid-cols-3">
          <div><div className="font-mono text-purple-400">FORMAT</div><div className="mt-2">1080 × 1920 · 9:16</div></div>
          <div><div className="font-mono text-purple-400">RUNTIME</div><div className="mt-2">3 minutes · 8 sequences</div></div>
          <div><div className="font-mono text-purple-400">TOPICS</div><div className="mt-2">Air bearing · magnetics · HAMR</div></div>
        </div>
      </div>
    </div>
  );
}
