import Card from './Card';

const CardList = ({ pokeArray, clickHandler }) => {
  const pokemonAll =
    pokeArray !== null
      ? pokeArray.map((pokemon, index) => {
          return (
            <li key={index}>
              <Card pokemon={pokemon} clickHandler={clickHandler} />
            </li>
          );
        })
      : null;
  return <>{<ul>{pokemonAll}</ul>}</>;
};

export default CardList;
