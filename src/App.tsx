import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function rand(n: number) {
  return Math.floor(Math.random() * n);
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


function App() {
  const n = 10;
  const t = 500;

  const [rando, setRand] = useState(0)

  const [Japanese, setJap] = useState<string[] | null>(null); // State to store the random word
  const [English, setEng] = useState<string[] | null>(null); // State to store the random word
  const [randomWord, setRandomWord] = useState<string | null>(null); // State to store the random word
  const [option1, setOp1] = useState<string | null>(null); // State to store the random word
  const [option2, setOp2] = useState<string | null>(null); // State to store the random word
  const [option3, setOp3] = useState<string | null>(null); // State to store the random word

  const [buttonColor1, setButtonColor1] = useState('');
  const [buttonColor2, setButtonColor2] = useState('');
  const [buttonColor3, setButtonColor3] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try{
          console.log('Fetching data...');
          //await Promise.all([fetchArrays()]); // Wait for fetchRandomWord to complete
          const [engData, japData] = await fetchArrays();
          setEng(engData);
          setJap(japData);

      } catch (error) {
        console.error('Japanese array: ', error);
        return null;
      }
    };
  
    fetchData();
  }, []); // Empty dependency array to run the effect only once 

  useEffect(() => {
    if (Japanese === null || English === null) {
      console.error('Japanese array is null.');
    }
    else{
      setButtonColor1('');
      setButtonColor2('');
      setButtonColor3('');

      console.log('File Content Japanese:', Japanese);
      console.log('File Content English:', English);
      
      console.log('Random word fetched.');
      console.log('Random word assigned.');
      assignRandomWord();
    }
  }, [Japanese, English, rando]);

  async function assignRandomWord() {
    try {
      setRandomWord(Japanese[rando]);
      switch(1 + rand(3)) {
        case 1:
          setOp1(English[rando]);
          setOp2(English[rand(n)]);
          setOp3(English[rand(n)]);
          break;
        case 2:
          setOp1(English[rand(n)]);
          setOp2(English[rando]);
          setOp3(English[rand(n)]);
          break;
        case 3:
          setOp1(English[rand(n)]);
          setOp2(English[rand(n)]);
          setOp3(English[rando]);
          break;
      }
    } catch (error) {
      console.error('Error fetching the file:', error);
      return null; // Return null if an error occurs
    }

  }
  async function fetchArrays(): Promise<[string[], string[]]> {
    try {
      const Eng = await fetch('Eng.txt'); // Fetch the file
      const Jap = await fetch('Jap.txt'); // Fetch the file

      const Edata = await Eng.text(); // Extract text data from the response
      const Jdata = await Jap.text(); // Extract text data from the response

      
      //setEng(Edata.split('\r\n'));
      //setJap(Jdata.split('\n'));

      const E = Edata.split('\r\n')
      const J = Jdata.split('\n')
      return [E, J];

    } catch (error) {
      console.error('Error fetching the file:', error);
      return [[], []]; // Return empty arrays if an error occurs
    }
  }

  const ButtonColor1 = async () => {
    // Check if option1 is equal to English[rando]
    if (option1 == English[rando]) {
      setButtonColor1('#00a128'); // Set button color to green
      await sleep(t);
      setRand(rand(n));

    } else {
      setButtonColor1('#750000'); // Set button color to red
    }
  };

  const ButtonColor2 = async () => {
    // Check if option1 is equal to English[rando]
    if (option2 == English[rando]) {
      setButtonColor2('#00a128'); // Set button color to green
      await sleep(t);
      setRand(rand(n));

    } else {
      setButtonColor2('#750000'); // Set button color to red
    }
  };

  const ButtonColor3 = async () => {
    // Check if option1 is equal to English[rando]

    if (option3 == English[rando]) {
      setButtonColor3('#00a128'); // Set button color to green
      await sleep(t);
      setRand(rand(n));
      
    } else {
      setButtonColor3('#750000'); // Set button color to red
    }
  };

  console.log('RandomWord:', randomWord);
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>{randomWord}</h1>
      <div className="card">
        {/* <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button> */}
        {/* <VariantButtonGroup /> */}

        <button style={{ backgroundColor: buttonColor1 }} onClick={() => {ButtonColor1()}}>
          <h3>
          {option1}
          </h3>
        </button>
        <button style={{ backgroundColor: buttonColor2 }} onClick={() => {ButtonColor2()}}>
          <h3>
          {option2}
          </h3>
        </button>
        <button style={{ backgroundColor: buttonColor3 }} onClick={() => {ButtonColor3()}}>
          <h3>
          {option3}
          </h3>
        </button>
      </div>
    </>
  );
}

export default App
