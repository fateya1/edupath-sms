const express = require('express');
const router = express.Router();

router.get('/users', (req, res) => {
  res.json({ message: 'Fetch all users' });
});

module.exports = router;
