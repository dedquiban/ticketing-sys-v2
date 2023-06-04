const express = require('express');
const router = express.Router();
const { TicketPriorityLevels } = require('../models');

router.post('/', async (req, res) => {
  try {
    const ticketPriorityLevel = req.body;
    await TicketPriorityLevels.create(ticketPriorityLevel);
    res.status(200).json(ticketPriorityLevel);
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
});

module.exports = router;
