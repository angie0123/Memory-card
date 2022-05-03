const Card = ({ pokemon, clickHandler }) => {
  return (
    <div className="card" onClick={clickHandler} name={pokemon.name}>
      <img src={pokemon.img} alt={`${pokemon.name}`} />
      <div className="name">{pokemon.name}</div>
    </div>
  );
};

export default Card;
