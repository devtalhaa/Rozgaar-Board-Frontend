import Link from 'next/link';

export default function SkillCategories() {
  const categories = [
    { id: 1, nameEn: 'Plumber', nameUr: 'پلمبر', icon: '💧' },
    { id: 2, nameEn: 'Electrician', nameUr: 'الیکٹریشن', icon: '⚡' },
    { id: 3, nameEn: 'Carpenter', nameUr: 'بڑھئی', icon: '🪚' },
    { id: 4, nameEn: 'Painter', nameUr: 'پینٹر', icon: '🎨' },
    { id: 5, nameEn: 'Mason', nameUr: 'مستری', icon: '🧱' },
    { id: 6, nameEn: 'Welder', nameUr: 'ویلڈر', icon: '🔥' },
    { id: 7, nameEn: 'AC Mechanic', nameUr: 'اے سی مکینک', icon: '❄️' },
    { id: 8, nameEn: 'Mazdoor', nameUr: 'مزدور', icon: '👷' },
  ];

  return (
    <section className="py-20 bg-slate-50 relative -mt-16 rounded-t-[3rem] shadow-sm z-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-primary mb-12">Popular Services</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {categories.map((cat) => (
            <Link key={cat.id} href={`/workers?skill=${cat.id}`} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-accent transition-all flex flex-col items-center justify-center gap-3 group">
              <span className="text-4xl group-hover:scale-110 transition-transform">{cat.icon}</span>
              <div className="text-center">
                <p className="font-semibold text-slate-800">{cat.nameEn}</p>
                <p className="text-sm text-slate-500 font-urdu">{cat.nameUr}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
