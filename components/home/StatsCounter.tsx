export default function StatsCounter() {
  const stats = [
    { label: 'Registered Workers', value: '15,000+' },
    { label: 'Verified Clients', value: '8,500+' },
    { label: 'Jobs Completed', value: '45,000+' },
    { label: 'Cities Covered', value: '8' },
  ];

  return (
    <section className="py-24 bg-accent text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col gap-2">
              <span className="text-5xl font-extrabold tracking-tight">{stat.value}</span>
              <span className="text-lg font-medium opacity-90">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
