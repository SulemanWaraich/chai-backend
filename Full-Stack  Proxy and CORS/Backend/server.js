import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('Server is ready');
});

app.get('/api/jokes', (req, res) => {
    const jokes = [
      {
        id: 1,
        title: "A Joke",
        content: "This is a joke"
      },
      {
        id: 2,
        title: "2nd Joke",
        content: "This is a joke"
      },
      {
        id: 3,
        title: "3rd Joke",
        content: "This is a joke"
      },
      {
        id: 4,
        title: "4th Joke",
        content: "This is a joke"
      },
      {
        id: 5,
        title: "5th Joke",
        content: "This is a joke"
      },
    ]
    res.send(jokes);
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server at http://localhost:${port}`);
});