'use client';
import { useEffect, useState } from 'react';

export default function FilterSidebar({ onFilterChange, initialFilters }: { onFilterChange: (filters: any) => void, initialFilters: any }) {
  const [categories, setCategories] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    search: initialFilters.search || '',
    skill_id: initialFilters.skill_id || '',
    city_id: initialFilters.city_id || '',
    min_rating: initialFilters.min_rating || ''
  });

  useEffect(() => {
    fetch('http://localhost/projectweb/rozgaar-board/backend/api/admin/categories/get_all.php')
      .then(r => r.json()).then(d => { if(d.categories) setCategories(d.categories); }).catch(console.error);
    fetch('http://localhost/projectweb/rozgaar-board/backend/api/cities/get_all.php')
      .then(r => r.json()).then(d => { if(d.cities) setCities(d.cities); }).catch(console.error);
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 sticky top-24">
      <h3 className="font-bold text-lg text-slate-800 mb-6 border-b pb-4">Filters</h3>
      
      <div className="flex flex-col gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Search Name</label>
          <input 
            type="text" 
            name="search"
            value={filters.search}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
            placeholder="e.g. Ali"
          />
        </div>

        <div>
           <label className="block text-sm font-semibold text-slate-700 mb-2">Service Category</label>
           <select 
             name="skill_id" 
             value={filters.skill_id} 
             onChange={handleChange}
             className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm bg-white"
           >
             <option value="">All Services</option>
             {categories.map(c => <option key={c.id} value={c.id}>{c.name_en} • <span className="font-urdu">{c.name_ur}</span></option>)}
           </select>
        </div>

        <div>
           <label className="block text-sm font-semibold text-slate-700 mb-2">City</label>
           <select 
             name="city_id" 
             value={filters.city_id} 
             onChange={handleChange}
             className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm bg-white"
           >
             <option value="">All Cities</option>
             {cities.map(c => <option key={c.id} value={c.id}>{c.name_en}</option>)}
           </select>
        </div>

        <div>
           <label className="block text-sm font-semibold text-slate-700 mb-2">Minimum Rating</label>
           <select 
             name="min_rating" 
             value={filters.min_rating} 
             onChange={handleChange}
             className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm bg-white"
           >
             <option value="">Any Rating</option>
             <option value="4.5">4.5 & up</option>
             <option value="4.0">4.0 & up</option>
             <option value="3.0">3.0 & up</option>
           </select>
        </div>
      </div>
    </div>
  );
}
