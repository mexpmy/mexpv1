import Link from "next/link";

const entries = [
  {
    href: "/ai-ml/data/sata-hdd",
    label: "HARDWARE / STORAGE",
    title: "Inside a SATA hard disk drive",
    description: "A visual deep dive into platters, air bearings, voice-coil positioning, magnetic grains, and the read head that turns a physical surface into data.",
    meta: "3:00 · 9:16 explainer",
  },
];

export default function DataIndex() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(192,132,252,0.18),transparent_38%),linear-gradient(135deg,#09090b_0%,#18111f_100%)]" />
        <div className="relative mx-auto max-w-5xl px-6 pb-20 pt-20">
          <Link href="/ai-ml" className="inline-flex items-center text-xs font-mono tracking-[2px] text-purple-400 transition hover:text-purple-300">← BACK TO AI / ML</Link>
          <div className="mt-10 max-w-3xl">
            <div className="text-sm font-mono tracking-[4px] text-purple-400">AI / ML · DATA</div>
            <h1 className="mt-4 text-6xl font-black leading-[0.9] tracking-[-3px] sm:text-8xl">The substrate<br />of intelligence.</h1>
            <p className="mt-8 max-w-2xl text-xl leading-relaxed text-zinc-300">Deep dives into the physical systems that store, move, sense, and transform data before a model ever sees it.</p>
          </div>
        </div>
      </section>

      <div className="border-b border-white/10 bg-black/30">
        <div className="mx-auto grid max-w-5xl grid-cols-3 gap-8 px-6 py-8 text-center">
          <div><div className="text-5xl font-black tracking-tighter text-purple-400">01</div><div className="mt-1 text-xs tracking-[2px] text-zinc-500">DEEP DIVE</div></div>
          <div><div className="text-5xl font-black tracking-tighter text-purple-400">9:16</div><div className="mt-1 text-xs tracking-[2px] text-zinc-500">VISUAL FORMAT</div></div>
          <div><div className="text-5xl font-black tracking-tighter text-purple-400">∞</div><div className="mt-1 text-xs tracking-[2px] text-zinc-500">MORE TO TRACE</div></div>
        </div>
      </div>

      <main className="mx-auto max-w-5xl px-6 py-16">
        <div className="mb-8 text-xs font-mono tracking-[3px] text-purple-400">FIELD NOTES / DATA</div>
        <div className="grid gap-6">
          {entries.map((entry) => (
            <Link key={entry.href} href={entry.href} className="group block border border-white/10 bg-zinc-900/60 p-7 transition hover:-translate-y-1 hover:border-purple-400/50 hover:bg-zinc-900">
              <div className="flex flex-wrap items-start justify-between gap-6">
                <div className="max-w-2xl">
                  <div className="text-xs font-mono tracking-[2px] text-purple-400">{entry.label}</div>
                  <h2 className="mt-4 text-3xl font-black tracking-tight text-white">{entry.title}</h2>
                  <p className="mt-4 text-lg leading-relaxed text-zinc-400">{entry.description}</p>
                </div>
                <div className="font-mono text-xs tracking-[1px] text-zinc-500 transition group-hover:text-purple-300">{entry.meta} →</div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
