import { useState, useEffect } from 'react';
import { usePokemonList } from '../hooks/usePokemon';
import PokemonCard from './PokemonCard';
import SearchBar from './SearchBar'
import ThemeToggle from './ThemeToggle'


const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const { data, isLoading, error } = usePokemonList(15, offset);

  
 

  useEffect(() => {
    if (data?.results) {
      if (offset === 0) {
        setPokemonList(data.results);
      } else {
        setPokemonList(prev => [...prev, ...data.results]);
      }
    }
  }, [data, offset]);

  const filteredPokemon = pokemonList.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const loadMore = () => {
    setOffset(prev => prev + 15);
  };

 
  if (isLoading && pokemonList.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="text-xl text-gray-600 dark:text-gray-400">Loading Pokémon...</div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-8">
            {[...Array(15)].map((_, index) => (
              <div key={index} className="bg-gray-200 dark:bg-gray-700 rounded-lg h-64 animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

 
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-500">
          <h2 className="text-xl font-bold mb-2">Error loading Pokémon</h2>
          <p>{error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
       
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Pokédex Explorer
          </h1>
          <ThemeToggle />
        </div>

        
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        
        <div className="mb-4 p-2 bg-yellow-100 dark:bg-yellow-900 rounded text-sm">
          <div>Total Pokémon loaded: {pokemonList.length}</div>
          <div>Filtered Pokémon: {filteredPokemon.length}</div>
          <div>Current offset: {offset}</div>
        </div>

        
        {filteredPokemon.length === 0 && pokemonList.length > 0 && (
          <div className="text-center py-8">
            <div className="text-gray-500 dark:text-gray-400">
              No Pokémon found matching "{searchTerm}"
            </div>
          </div>
        )}

        
        {filteredPokemon.map((pokemon, index) => (
          <div key={`${pokemon.name}-${index}`} className="w-full">
            <PokemonCard
              pokemon={pokemon}
              onClick={() => setSelectedPokemon(pokemon.name)} // ✅ Correctly pass the function
            />
          </div>
        ))}


        
        {!searchTerm && filteredPokemon.length > 0 && (
          <div className="text-center">
            <button
              onClick={loadMore}
              disabled={isLoading}
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Loading...
                </span>
              ) : (
                'Load More Pokémon'
              )}
            </button>
          </div>
        )}
        {selectedPokemon && (
          <PokemonDetail
            name={selectedPokemon}
            onClose={() => setSelectedPokemon(null)}
          />
        )}

      </div>
    </div>
  );
};

export default PokemonList;
