import { useEffect, useState } from 'react'
import axios from 'axios';
import './App.css'

function App() {
  const [jokes, setJokes] = useState([]);

  useEffect(() => {
    axios.get('api/jokes')
    .then((res) => {
        setJokes(res.data)
    })
    .catch((err) => {
      console.log(err);
    })
  }) 

  return (
  <>
    <center>
      <h1>Api Request</h1>
      <h3>Jokes: {jokes.length}</h3>

      {
        jokes.map((joke) => (
          <div key={joke.id}>
            <h1>{joke.title}</h1>
            <p>{joke.content}</p>
          </div>
        ))
      }
    </center>
  </>
  )
}

export default App
