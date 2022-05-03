import React, { useEffect, useState } from 'react';
import './App.css';
import CardList from './components/CardList';

const App = () => {
  const [allData, setAllData] = useState({ data: null, index: 0 });
  const [batch, setBatch] = useState({ data: null, next: false, size: 5 });
  const [picked, setPicked] = useState([]);
  const [score, setScore] = useState({ current: 0, best: 0 });

  const clickHandler = (event) => {
    const pokemon = event.currentTarget.getAttribute('name');
    if (picked.includes(pokemon)) {
      setBatch({ ...batch, next: true });
      setScore({
        current: 0,
        best: score.best >= score.current ? score.best : score.current,
      });
      setPicked([]);
    } else {
      setScore({
        current: score.current + 1,
        best: score.best > score.current ? score.best : score.current + 1,
      });
      if (picked.length + 1 === batch.size) {
        setBatch({ ...batch, next: true });
        setPicked([]);
      } else {
        setPicked([...picked, pokemon]);
      }
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      console.log('fetching all');
      const url = 'https://pokeapi.co/api/v2/pokemon/?limit=151';
      const response = await fetch(url);
      const data = await response.json();
      const pokeDataAll = await data;
      setAllData({ data: pokeDataAll.results, index: 0 });
      setBatch({ ...batch, next: true });
    };
    const fetchNextData = async () => {
      console.log('fetching next');
      let batchData = [];
      let randomNums = [];
      for (let i = 0; i < batch.size; i++) {
        let randomInt;
        do {
          randomInt = Math.floor(Math.random() * allData.data.length);
        } while (randomNums.includes(randomInt));
        randomNums = [...randomNums, randomInt];
        const currentData = allData.data[randomInt];
        const response = await fetch(currentData.url);
        const data = await response.json();
        const pokeData = await data;
        batchData = [...batchData, pokeData];
      }
      const parsedBatchData = batchData.map((data) => {
        return { name: data.name, img: data.sprites.front_default };
      });
      setBatch({ ...batch, next: false, data: parsedBatchData });
    };
    if (allData.data === null) fetchAllData();
    if (batch.next === true) fetchNextData();
  }, [allData, batch]);

  // onMount:
  // get all available data and store in state
  // fetch [ batch ](size) pokemon
  // add eventListener to each card
  // compare card info with current batch =>
  // isAlreadyPicked? LOSE & reset round : remove card & continue
  // batch empty ? setBatch
  // always updateScores

  // onUpdate: [ batch ]( size + 1 )
  // fetch x pokemon

  return (
    // populate DOM elements with x cards
    <>
      <div>Current Score: {score.current}</div>
      <div>Best Score: {score.best}</div>
      <CardList pokeArray={batch.data} clickHandler={clickHandler} />
    </>
  );
};

export default App;
