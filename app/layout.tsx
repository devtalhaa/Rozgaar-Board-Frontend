import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/context/AuthContext';

const outfit = Outfit({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Rozgaar Board | Pakistani Daily Wage Job Finder',
  description: 'Find verified daily wage workers in Pakistan. Plumbers, Electricians, Carpenters and more.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${outfit.className} bg-slate-50 text-slate-800 selection:bg-accent/30`}>
        <AuthProvider>
          <Navbar />
          <Toaster position="top-right" />
          <main className="min-h-screen pt-28 pb-12">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
