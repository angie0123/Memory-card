const Card = ({ pokemon }) => {
  return (
    <div className="card">
      {pokemon.name}
      <img src={pokemon.img} alt={`${pokemon.name}`} />
    </div>
  );
};

export default Card;
