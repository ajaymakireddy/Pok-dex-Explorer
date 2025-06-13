
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useTheme } from '../context/ThemeContext';


export default function SearchFilter({ onSearch, onFilter }) {
  const [types, setTypes] = useState([]);
  const { dark } = useTheme();
  console.log(dark);


  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/type').then(res => setTypes(res.data.results));
  }, []);

  return (
    <div className="mb-4 flex flex-col sm:flex-row gap-2">
      <input
        type="text"
        placeholder="Search Pokémon"
        onChange={(e) => onSearch(e.target.value)}
        className={`p-2 border rounded w-full sm:w-1/2 ${dark ? 'dark bg-gray-900 text-white' : 'bg-white text-black'}`}
      />
      <select onChange={(e) => onFilter(e.target.value)} className={`p-2 border rounded w-full sm:w-1/4 ${dark ? 'dark bg-gray-900 text-white' : 'bg-white text-black'}`}  >
        <option value="">All Types</option>
        {types.map((t) => (
          <option key={t.name} value={t.name}>{t.name}</option>
        ))}
      </select>
    </div>
  );
}
