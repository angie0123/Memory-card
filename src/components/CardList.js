import Card from './Card';

const CardList = ({ pokeArray, clickHandler }) => {
  const shuffle = (arr) => {
    let picked = [];
    let randomInt;
    let shuffled = [];
    for (let i = 0; i < arr.length; i++) {
      do {
        randomInt = Math.floor(Math.random() * arr.length);
      } while (picked.includes(randomInt));
      picked = [...picked, randomInt];
      shuffled = [...shuffled, arr[randomInt]];
    }
    return shuffled;
  };
  const pokemonAll =
    pokeArray !== null
      ? shuffle(pokeArray).map((pokemon, index) => {
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
