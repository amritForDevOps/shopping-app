// backend/src/app.js
const express = require('express');
const bodyParser = require('body-parser');
const metrics = require('./metrics');

const app = express();
app.use(bodyParser.json());

// simple in-memory store — replace with DB in production
let products = [
  { id: 1, name: 'T-Shirt', price: 199 },
  { id: 2, name: 'Sneakers', price: 4990 },
  { id: 3, name: 'Jeans', price: 1299 }
];

app.get('/api/products', (req, res) => {
  metrics.requests.inc();
  res.json(products);
});

app.post('/api/order', (req, res) => {
  metrics.requests.inc();
  const order = {
    id: Date.now(),
    items: req.body.items || []
  };
  // TODO: save order to DB
  res.status(201).json({ order, msg: 'Order created (demo)' });
});

// health
app.get('/health', (req, res) => {
  res.status(200).send('ok');
});

// metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', metrics.register.contentType);
  res.end(await metrics.register.metrics());
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Backend listening on ${port}`));
