const express = require('express');
const router = express.Router();
const { TicketComments } = require('../models');

router.post('/', async (req, res) => {
  try {
    const ticketComment = req.body;
    await TicketComments.create(ticketComment);
    res.status(200).json(ticketComment);
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const allTicketComments = await TicketComments.findAll();
    res.status(200).json(allTicketComments);
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
});

router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const allTicketComments = await TicketComments.findAll({
      where: { userId: userId },
    });
    res.status(200).json(allTicketComments);
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
});

router.get('/:ticketId', async (req, res) => {
  try {
    const ticketId = req.params.ticketId;
    const allTicketComments = await TicketComments.findAll({
      where: { ticketId: ticketId },
    });
    res.status(200).json(allTicketComments);
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
});

module.exports = router;
