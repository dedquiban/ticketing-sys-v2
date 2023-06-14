const express = require('express');
const router = express.Router();
const { Roles } = require('../models');

router.post('/', async (req, res) => {
  try {
    const role = req.body;
    await Roles.create(role);
    res.status(200).json(role);
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const allRoles = await Roles.findAll();
    res.status(200).json(allRoles);
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
});

module.exports = router;
