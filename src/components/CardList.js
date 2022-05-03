import Card from './Card';

const CardList = ({ pokeArray }) => {
  const pokemonAll =
    pokeArray !== null
      ? pokeArray.map((pokemon, index) => {
          return (
            <li key={index}>
              <Card pokemon={pokemon} />
            </li>
          );
        })
      : null;
  return <>{<ul>{pokemonAll}</ul>}</>;
};

export default CardList;
