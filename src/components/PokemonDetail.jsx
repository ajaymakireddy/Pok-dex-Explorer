import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function PokemonDetail() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [isFav, setIsFav] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!name) return;
    axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`).then((res) => {
      setPokemon(res.data);
      const favs = JSON.parse(localStorage.getItem('favourites')) || [];
      setIsFav(favs.some(f => f.name === name));
    });
  }, [name]);

  const toggleFavourite = () => {
    const favs = JSON.parse(localStorage.getItem('favourites')) || [];
    if (isFav) {
      const updated = favs.filter(f => f.name !== name);
      localStorage.setItem('favourites', JSON.stringify(updated));
      setIsFav(false);
    } else {
      favs.push({ name: pokemon.name, id: pokemon.id });
      localStorage.setItem('favourites', JSON.stringify(favs));
      setIsFav(true);
    }
  };

  if (!pokemon) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-xl text-center">
          <p className="text-lg text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl w-full max-w-md shadow-lg relative">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white text-xl"
        >
          ×
        </button>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold capitalize text-gray-800 dark:text-white">
            {pokemon.name}
          </h1>
          <button onClick={toggleFavourite} className="text-2xl">
            {isFav ? '❤️' : '🤍'}
          </button>
        </div>
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="mx-auto w-32 h-32 mb-4"
        />
        <p className="text-gray-700 dark:text-gray-300 mb-2">
          <strong>Height:</strong> {pokemon.height}
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-2">
          <strong>Weight:</strong> {pokemon.weight}
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-2">
          <strong>Types:</strong> {pokemon.types.map(t => t.type.name).join(', ')}
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          <strong>Abilities:</strong> {pokemon.abilities.map(a => a.ability.name).join(', ')}
        </p>
      </div>
    </div>
  );
}
