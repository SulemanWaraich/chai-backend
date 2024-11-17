const express = require('express')
require('dotenv').config()
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/netflix', (req, res) => {
  res.send('My name is Muhammad Suleman.');
})

app.get('/login', (req, res) => {
  res.send('You are logged in... ');
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${port}`)
})