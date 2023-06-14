const express = require('express');
const router = express.Router();
const { Permissions } = require('../models');

router.post('/', async (req, res) => {
  try {
    const permission = req.body;
    await Permissions.create(permission);
    res.status(200).json(role);
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const allPermissions = await Permissions.findAll();
    res.status(200).json(allPermissions);
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
});

module.exports = router;
