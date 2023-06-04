const express = require('express');
const router = express.Router();
const { TicketCategories } = require('../models');

router.post('/', async (req, res) => {
  try {
    const ticketCategory = req.body;
    await TicketCategories.create(ticketCategory);
    res.status(200).json(ticketCategory);
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const allTicketCategories = await TicketCategories.findAll();
    res.status(200).json(allTicketCategories);
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
});

module.exports = router;
