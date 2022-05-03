const Card = ({ pokemon, clickHandler }) => {
  return (
    <div className="card" onClick={clickHandler} name={pokemon.name}>
      {pokemon.name}
      <img src={pokemon.img} alt={`${pokemon.name}`} />
    </div>
  );
};

export default Card;
