const express = require('express');
const router = express.Router();
const {
  Departments,
  Tickets,
  Users,
  TicketCategories,
  TicketStatuses,
  TicketPriorityLevels,
  TicketComments,
} = require('../models');
const { Op } = require('sequelize');
const moment = require('moment');

// gets all tickets and converts to viewer's timezone
router.get('/', async (req, res) => {
  const { status, createdToday, closedToday } = req.query;
  // const { status, createdToday } = filters;

  try {
    let tickets;
    const todayStart = moment().startOf('day').utc().format(); // Start of today in UTC
    const todayEnd = moment().endOf('day').utc().format(); // End of today in UTC

    if (status && createdToday && closedToday) {
      tickets = await Tickets.findAll({
        where: {
          createdAt: {
            [Op.between]: [todayStart, todayEnd],
          },
          completedAt: {
            [Op.between]: [todayStart, todayEnd],
          },
        },
        order: [['createdAt', 'DESC']],
        include: [
          { model: Departments },
          { model: Users },
          { model: TicketCategories },
          { model: TicketStatuses, where: { name: status } },
          { model: TicketPriorityLevels },
          { model: TicketComments },
        ],
      });
    } else if (status && createdToday) {
      tickets = await Tickets.findAll({
        where: {
          createdAt: {
            [Op.between]: [todayStart, todayEnd],
          },
        },
        order: [['createdAt', 'DESC']],
        include: [
          { model: Departments },
          { model: Users },
          { model: TicketStatuses, where: { name: status } },
          { model: TicketCategories },
          { model: TicketPriorityLevels },
          { model: TicketComments },
        ],
      });
    } else if (status && closedToday) {
      tickets = await Tickets.findAll({
        where: {
          completedAt: {
            [Op.between]: [todayStart, todayEnd],
          },
        },
        order: [['createdAt', 'DESC']],
        include: [
          { model: Departments },
          { model: Users },
          { model: TicketStatuses, where: { name: status } },
          { model: TicketCategories },
          { model: TicketPriorityLevels },
          { model: TicketComments },
        ],
      });
    } else if (createdToday && closedToday) {
      tickets = await Tickets.findAll({
        where: {
          createdAt: {
            [Op.between]: [todayStart, todayEnd],
          },
          completedAt: {
            [Op.between]: [todayStart, todayEnd],
          },
        },
        order: [['createdAt', 'DESC']],
        include: [
          { model: Departments },
          { model: Users },
          { model: TicketCategories },
          { model: TicketStatuses },
          { model: TicketPriorityLevels },
          { model: TicketComments },
        ],
      });
    } else if (status) {
      tickets = await Tickets.findAll({
        order: [['createdAt', 'DESC']],
        include: [
          { model: Departments },
          { model: Users },
          { model: TicketStatuses, where: { name: status } },
          { model: TicketCategories },
          { model: TicketPriorityLevels },
          { model: TicketComments },
        ],
      });
    } else if (closedToday) {
      tickets = await Tickets.findAll({
        where: {
          completedAt: {
            [Op.between]: [todayStart, todayEnd],
          },
        },
        order: [['createdAt', 'DESC']],
        include: [
          { model: Departments },
          { model: Users },
          { model: TicketStatuses },
          { model: TicketCategories },
          { model: TicketPriorityLevels },
          { model: TicketComments },
        ],
      });
    } else if (createdToday) {
      tickets = await Tickets.findAll({
        where: {
          createdAt: {
            [Op.between]: [todayStart, todayEnd],
          },
        },
        order: [['createdAt', 'DESC']],
        include: [
          { model: Departments },
          { model: Users },
          { model: TicketStatuses },
          { model: TicketCategories },
          { model: TicketPriorityLevels },
          { model: TicketComments },
        ],
      });
    } else {
      tickets = await Tickets.findAll({
        order: [['createdAt', 'DESC']],
        include: [
          { model: Departments },
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

// // gets all tickets and converts to viewer's timezone
// router.get('/', async (req, res) => {
//   const { status, createdToday, closedToday } = req.query;

//   try {
//     let tickets;
//     const todayStart = moment().startOf('day').utc().format(); // Start of today in UTC
//     const todayEnd = moment().endOf('day').utc().format(); // End of today in UTC

//     const whereCondition = {};

//     if (status && createdToday && closedToday) {
//       whereCondition['$or'] = [{ '$TicketStatus.name$': status }];
//       whereCondition['$or'] = [
//         { createdAt: { [Op.between]: [todayStart, todayEnd] } },
//       ];
//       whereCondition['$or'] = [
//         { completedAt: { [Op.between]: [todayStart, todayEnd] } },
//       ];
//     }

//     if (createdToday) {
//       whereCondition['$or'] = [
//         { createdAt: { [Op.between]: [todayStart, todayEnd] } },
//       ];
//     }

//     if (closedToday) {
//       whereCondition['$or'] = [
//         { completedAt: { [Op.between]: [todayStart, todayEnd] } },
//       ];
//     }

//     tickets = await Tickets.findAll({
//       where: whereCondition,
//       order: [['createdAt', 'DESC']],
//       include: [
//         { model: Departments },
//         { model: Users },
//         { model: TicketCategories },
//         { model: TicketStatuses },
//         { model: TicketPriorityLevels },
//         { model: TicketComments },
//       ],
//     });

//     tickets.forEach((ticket) => {
//       ticket.createdAt = new Date(ticket.createdAt).toISOString();
//     });

//     res.status(200).json(tickets);
//   } catch (error) {
//     res.status(500).send({ message: error });
//   }
// });

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
  const desiredTicketStatusId = 3; // Assuming the ticket status ID for 'closed' is 2

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
