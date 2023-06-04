const express = require('express');
const router = express.Router();
const { TicketStatuses } = require('../models');

router.post('/', async (req, res) => {
  try {
    const ticketStatus = req.body;
    await TicketStatuses.create(ticketStatus);
    res.status(200).json(ticketStatus);
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const allTicketStatuses = await TicketStatuses.findAll();
    res.status(200).json(allTicketStatuses);
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
});

module.exports = router;
