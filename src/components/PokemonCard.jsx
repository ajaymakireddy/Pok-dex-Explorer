
import { Link } from 'react-router-dom';

export default function PokemonCard({ pokemon }) {
  return (
    <Link
      to={`/pokemon/${pokemon.name}`}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 hover:shadow-xl hover:scale-105 transition-all duration-300 flex flex-col items-center"
    >
      <img
        src={pokemon.sprites?.front_default}
        alt={pokemon.name}
        className="w-20 h-20 mb-3"
      />
      <div className="text-lg font-bold capitalize text-gray-800 dark:text-white">
        {pokemon.name}
      </div>
    </Link>

  );
}
