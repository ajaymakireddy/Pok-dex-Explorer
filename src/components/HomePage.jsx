
import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchFilter from '../components/SearchFilter';
import PokemonCard from './PokemonCard';

export default function HomePage() {
  const [pokemonList, setPokemonList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPokemon = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`);
      const results = await Promise.all(
        res.data.results.map((p) => axios.get(p.url))
      );
      setPokemonList((prev) => {
        const newPokemons = results.map((r) => r.data);
        const existingNames = new Set(prev.map((p) => p.name));
        const uniqueNew = newPokemons.filter((p) => !existingNames.has(p.name));
        return [...prev, ...uniqueNew];
      });

      setError(null);
    } catch (err) {
      setError('Failed to fetch Pokémon');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, [offset]);

  const filteredList = pokemonList.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesType = !filter || p.types.some((t) => t.type.name === filter);
    return matchesSearch && matchesType;
  });

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <SearchFilter onSearch={setSearch} onFilter={setFilter} />
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {filteredList.map((pokemon) => (
          <PokemonCard key={pokemon.name} pokemon={pokemon} />

        ))}
      </div>
      {loading && <p className="text-center p-4">Loading...</p>}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => setOffset(offset + 20)}
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
        >
          Load More
        </button>
      </div>
    </div>
  );
}