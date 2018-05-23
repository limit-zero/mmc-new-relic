require('newrelic');
const express = require('express');

const app = express();

const { NEW_RELIC_KEY } = process.env;
console.log('NEW_RELIC_KEY', NEW_RELIC_KEY);

function badDatabaseConnection() {
  // Let's pretend you tried to access a database and it failed.
  throw new Error('Unable to connect to database');
}

function getBookById(id) {
  // Let's pretend the book ID cannot be found
  throw new Error(`No book found for ID '${id}'`);
}

app.get('/', (req, res) => {
  res.send('<h1>Yo!</h1>');
});

app.get('/hello', (req, res) => {
  const { name } = req.query;
  res.send(`<h3>Hello ${name || ''}</h3>`);
});

app.get('/book/:id', (req, res) => {
  const { id } = req.params;
  if (id === '8675309') {
    res.send('<h1>I got yo numba!!</h1>');
  } else {
    getBookById(id);
  }
});

const port = 2112;
app.listen(port, () => {
  process.stdout.write(`Our awesome app is listening on port ${port}`);
});
