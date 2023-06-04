const express = require('express');
const router = express.Router();
const { Users, Departments } = require('../models');

router.get('/', async (req, res) => {
  try {
    const allUsers = await Users.findAll({
      include: [{ model: Departments }],
    });
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const user = req.body;
    await Users.create(user);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
});

module.exports = router;
