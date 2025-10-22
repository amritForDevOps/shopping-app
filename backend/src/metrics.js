// backend/src/metrics.js
const client = require('prom-client');

client.collectDefaultMetrics();

const requests = new client.Counter({
  name: 'shopping_app_requests_total',
  help: 'Total requests to shopping app'
});

module.exports = { register: client.register, requests };
