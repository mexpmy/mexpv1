export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white px-6 py-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-black tracking-tighter mb-4">Security</h1>

        <div className="prose prose-invert text-zinc-300">
          <p>MExp takes security seriously.</p>
          <p className="mt-4">If you discover a vulnerability, please report it responsibly to <a href="mailto:security@mymexp.com" className="text-cyan-400">security@mymexp.com</a>.</p>
          <p className="mt-8 text-sm text-zinc-500">This page will contain detailed security practices and responsible disclosure policy.</p>
        </div>
      </div>
    </div>
  );
}
