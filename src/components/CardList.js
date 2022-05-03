import Card from './Card';

const CardList = ({ pokeArray }) => {
  const pokemonAll = pokeArray.map((pokemon, index) => {
    return (
      <li id={index}>
        <Card pokemon={pokemon} />
      </li>
    );
  });
  return <>{<ul>{pokemonAll}</ul>}</>;
};

export default CardList;
