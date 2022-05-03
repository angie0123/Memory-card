const CardList = ({ pokeArray }) => {
  const pokemonAll = pokeArray.map((pokemon, index) => {
    return (
      <li id={index}>
        {pokemon.name}
        {pokemon.img}
      </li>
    );
  });
  return <>{<ul>{pokemonAll}</ul>}</>;
};

export default CardList;
