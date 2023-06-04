const express = require('express');
const router = express.Router();
const {
  Tickets,
  Users,
  TicketCategories,
  TicketStatuses,
  TicketPriorityLevels,
  TicketComments,
} = require('../models');

// router.get('/', async (req, res) => {
//   try {
//     const allTickets = await Tickets.findAll();
//     res.status(200).json(allTickets);
//   } catch (error) {
//     res.status(500).send({ message: 'Internal server error' });
//   }
// });

// gets all tickets and converts to viewer's timezone
router.get('/', async (req, res) => {
  const { status, category } = req.query;

  try {
    let tickets;

    if (status && category) {
      tickets = await Tickets.findAll({
        order: [['createdAt', 'DESC']],
        include: [
          { model: Users },
          { model: TicketCategories, where: { name: category } },
          { model: TicketStatuses, where: { name: status } },
          { model: TicketPriorityLevels },
          { model: TicketComments },
        ],
      });
    } else if (status) {
      tickets = await Tickets.findAll({
        order: [['createdAt', 'DESC']],
        include: [
          { model: Users },
          { model: TicketStatuses, where: { name: status } },
          { model: TicketCategories },
          { model: TicketPriorityLevels },
          { model: TicketComments },
        ],
      });
    } else if (category) {
      tickets = await Tickets.findAll({
        order: [['createdAt', 'DESC']],
        include: [
          { model: Users },
          { model: TicketCategories, where: { name: category } },
          { model: TicketStatuses },
          { model: TicketPriorityLevels },
          { model: TicketComments },
        ],
      });
    } else {
      tickets = await Tickets.findAll({
        order: [['createdAt', 'DESC']],
        include: [
          { model: Users },
          { model: TicketCategories },
          { model: TicketStatuses },
          { model: TicketPriorityLevels },
          { model: TicketComments },
        ],
      });
    }

    tickets.forEach((ticket) => {
      ticket.createdAt = new Date(ticket.createdAt).toISOString();
    });

    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

router.post('/', async (req, res) => {
  try {
    const ticket = req.body;
    await Tickets.create(ticket);
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
});

router.get('/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const allTickets = await Tickets.findAll({
      where: { userId: userId },
    });
    res.status(200).json(allTickets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ message: 'Internal server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const ticketId = req.params.id;
    const ticket = await Tickets.findByPk(ticketId);

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    res.status(200).json(ticket);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ message: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const ticket = req.body;
    await Tickets.create(ticket);
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
});

//updating the ticketStatusId to CLOSED
router.put('/update/:ticketId', async (req, res) => {
  const ticketId = req.params.ticketId;
  const desiredTicketStatusId = 2; // Assuming the ticket status ID for 'closed' is 2

  try {
    // Find the ticket you want to update
    const ticket = await Tickets.findByPk(ticketId);
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    // Update the ticket status
    ticket.ticketStatusId = desiredTicketStatusId;
    await ticket.save();

    // If needed, you can also retrieve the updated ticket status from the database
    await ticket.reload();

    // Access the updated ticket status
    const updatedTicketStatusId = ticket.ticketStatusId;

    return res.status(200).json({ success: true, updatedTicketStatusId });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
