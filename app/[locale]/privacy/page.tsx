export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white px-6 py-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-black tracking-tighter mb-4">Privacy Policy</h1>
        <p className="text-zinc-400 mb-12">Last updated: May 2026</p>

        <div className="prose prose-invert text-zinc-300">
          <p>This is a placeholder. Full privacy policy coming soon.</p>
          <p>MExp takes data protection seriously. We only collect what is necessary to operate this site and improve the experience.</p>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-sm text-zinc-500">
          For questions, contact: <a href="mailto:syahmi@mymexp.com" className="text-cyan-400">syahmi@mymexp.com</a>
        </div>
      </div>
    </div>
  );
}
