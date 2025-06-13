
import React from 'react';
import useFetch from '../hooks/useFetch';

const EvolutionChain = ({ url }) => {
  const { data: chain, loading, error } = useFetch(url);

  const renderEvolution = (evolution) => {
    if (!evolution) return null;
    
    return (
      <div className="flex flex-col items-center gap-2" key={evolution.species.name}>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            evolution.species.url.split('/')[6]
          }.png`}
          alt={evolution.species.name}
          className="w-20 h-20"
        />
        <span className="capitalize font-medium">
          {evolution.species.name}
        </span>
        <div className="flex gap-4">
          {evolution.evolves_to.map(evo => (
            <div key={evo.species.name} className="flex items-center">
              <span className="mx-2">→</span>
              {renderEvolution(evo)}
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (loading) return <div>Loading evolution chain...</div>;
  if (error) return <div>Error loading evolution data</div>;

  return (
    <div className="mt-8 p-4 bg-base-200 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Evolution Chain</h2>
      {chain?.chain && renderEvolution(chain.chain)}
    </div>
  );
};

export default EvolutionChain;
