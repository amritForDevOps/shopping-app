const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.json({ message: 'Shopping backend is up' }));

module.exports = router;
