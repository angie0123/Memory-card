import React, { useEffect, useState } from 'react';
import './App.css';
import CardList from './components/CardList';
import Nav from './components/Nav';

const App = () => {
  const [allData, setAllData] = useState({ data: null, index: 0 });
  const [batch, setBatch] = useState({ data: null, next: false, size: 2 });
  const [picked, setPicked] = useState([]);
  const [score, setScore] = useState({ current: 0, best: 0, round: 1 });
  const [loading, setLoading] = useState(true);

  const clickHandler = (event) => {
    const pokemon = event.currentTarget.getAttribute('name');
    if (picked.includes(pokemon)) {
      setBatch({ ...batch, next: true, size: 2 });
      setScore({
        current: 0,
        best: score.best >= score.current ? score.best : score.current,
        round: 0,
      });
      setPicked([]);
    } else {
      setScore({
        current: score.current + 1,
        best: score.best > score.current ? score.best : score.current + 1,
        round: picked.length + 1 === batch.size ? score.round + 1 : score.round,
      });
      if (picked.length + 1 === batch.size) {
        setBatch({ ...batch, next: true, size: batch.size + 1 });
        setPicked([]);
      } else {
        setPicked([...picked, pokemon]);
      }
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      const url = 'https://pokeapi.co/api/v2/pokemon/?limit=151';
      const response = await fetch(url);
      const data = await response.json();
      const pokeDataAll = await data;
      setAllData({ data: pokeDataAll.results, index: 0 });
      setBatch({ ...batch, next: true });
    };
    const fetchNextData = async () => {
      setLoading(true);
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
      setTimeout(() => {
        setLoading(false);
      }, 200);
    };
    if (allData.data === null) fetchAllData();
    if (batch.next === true) fetchNextData();
  }, [allData, batch]);

  return (
    <>
      <Nav
        round={score.round}
        bestScore={score.best}
        currentScore={score.current}
      />
      {loading && <div className="loading">Loading ...</div>}
      <CardList pokeArray={batch.data} clickHandler={clickHandler} />
    </>
  );
};

export default App;
