import { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [allData, setAllData] = useState({ data: null, index: 0 });
  const [batch, setBatch] = useState({ data: null, next: false, size: 5 });

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
      let batchData = [];
      for (let i = 0; i < batch.size; i++) {
        const currentData = allData.data[i];
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
      <div></div>
    </>
  );
};

export default App;
