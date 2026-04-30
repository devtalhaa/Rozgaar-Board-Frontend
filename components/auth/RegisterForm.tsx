'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    phone: '',
    password: '',
    role: 'worker',
    full_name: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost/projectweb/rozgaar-board/backend/api/auth/register.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'omit',
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      router.push('/login?registered=true');
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Create Account</h1>
        <p className="text-slate-500 mt-2">Join Rozgaar Board today</p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 text-sm font-medium border border-red-100">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">I want to join as</label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setFormData({...formData, role: 'worker'})}
              className={`py-3 rounded-lg font-semibold border-2 transition-all ${formData.role === 'worker' ? 'border-primary bg-primary/10 text-primary' : 'border-slate-200 text-slate-500'}`}
            >
              Worker
            </button>
            <button
              type="button"
              onClick={() => setFormData({...formData, role: 'employer'})}
              className={`py-3 rounded-lg font-semibold border-2 transition-all ${formData.role === 'employer' ? 'border-accent bg-accent/10 text-accent' : 'border-slate-200 text-slate-500'}`}
            >
              Client
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
          <input
            type="text"
            name="full_name"
            required
            value={formData.full_name}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-slate-800"
            placeholder="e.g. Ali Khan"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
          <input
            type="text"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-slate-800"
            placeholder="03XXXXXXXXX"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
          <input
            type="password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-slate-800"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg font-bold transition-all disabled:opacity-70 mt-4 shadow-md"
        >
          {loading ? 'Creating Account...' : 'Register'}
        </button>
      </form>

      <div className="mt-8 text-center text-sm text-slate-600 border-t border-slate-100 pt-6">
        Already have an account?{' '}
        <Link href="/login" className="text-accent font-semibold hover:underline">
          Sign In
        </Link>
      </div>
    </div>
  );
}
