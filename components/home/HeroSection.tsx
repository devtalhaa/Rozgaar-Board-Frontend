import SearchBar from './SearchBar';

export default function HeroSection() {
  return (
    <section className="bg-slate-950 pt-48 pb-40 px-4 relative overflow-hidden flex items-center justify-center min-h-[85vh] -mt-28">
      {/* Cool Ambient Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-primary/60 blur-[130px] mix-blend-screen animate-pulse duration-1000"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-accent/40 blur-[150px] mix-blend-screen"></div>
        <div className="absolute top-[20%] right-[30%] w-[400px] h-[400px] rounded-full bg-blue-500/20 blur-[100px] mix-blend-screen"></div>
      </div>
      
      <div className="container mx-auto relative z-10 flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-8 duration-700">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight max-w-4xl text-shadow-sm">
          Find Reliable Daily Wage Workers in <span className="text-accent drop-shadow-md">Pakistan</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
          Hire verified Plumbers, Electricians, Carpenters, and other skilled workers for your home and office needs quickly and safely.
        </p>
        <div className="w-full">
          <SearchBar />
        </div>
      </div>
    </section>
  );
}
