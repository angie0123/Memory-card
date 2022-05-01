import { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = 'https://pokeapi.co/api/v2/pokemon/?limit=151';
      const response = await fetch(url);
      const data = await response.json();
      const pokeData = await data;
      setData(pokeData);
      console.log(pokeData);
    };
    fetchData();
  }, []);

  // get data and store in state
  return (
    <>
      <div>Data: </div>
    </>
  );
};

export default App;
