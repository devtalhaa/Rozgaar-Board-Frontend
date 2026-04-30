'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/workers?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3 w-full max-w-3xl mx-auto bg-white/10 backdrop-blur-md p-3 rounded-2xl shadow-2xl border border-white/20 animate-in fade-in zoom-in-95 duration-700 delay-300">
      <input
        type="text"
        placeholder="What service do you need? (e.g. Plumber)"
        className="flex-grow px-6 py-4 rounded-xl bg-white/90 focus:outline-none focus:ring-2 focus:ring-accent transition-all text-slate-800"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" className="bg-accent hover:bg-accent/90 text-white px-8 py-3 rounded-xl font-bold transition-colors md:w-auto w-full shadow-md">
        Find Worker
      </button>
    </form>
  );
}
