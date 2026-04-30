export default function HowItWorks() {
  const steps = [
    { num: '1', title: 'Search for a Worker', desc: 'Browse through our verified professionals in your city.' },
    { num: '2', title: 'Send Job Request', desc: 'Detail your job requirements and offer a daily rate.' },
    { num: '3', title: 'Worker Accepts', desc: 'Once accepted, get connected instantly via WhatsApp.' },
    { num: '4', title: 'Job Done & Reviewed', desc: 'Leave a rating after the work is successfully completed.' },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-primary mb-16">How Rozgaar Board Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 max-w-6xl mx-auto">
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6 shadow-lg shadow-primary/30">
                {step.num}
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">{step.title}</h3>
              <p className="text-slate-600 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
