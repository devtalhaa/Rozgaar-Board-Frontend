export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-800 text-center">
      <div className="container mx-auto px-4">
        <p>© {new Date().getFullYear()} Rozgaar Board. All rights reserved.</p>
        <p className="text-sm mt-2">Connecting Pakistan's daily wage workers with opportunities.</p>
      </div>
    </footer>
  );
}
