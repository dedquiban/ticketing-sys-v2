const { Tickets } = require('../../models');
const { Op } = require('sequelize');

exports.getAllTicketsWhereUserId = async (req, res) => {
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
};
