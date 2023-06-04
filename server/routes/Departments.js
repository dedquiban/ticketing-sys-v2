const express = require('express');
const router = express.Router();
const { Departments } = require('../models');

router.post('/', async (req, res) => {
  try {
    const department = req.body;
    await Departments.create(department);
    res.status(200).json(department);
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const allDepartments = await Departments.findAll();
    res.status(200).json(allDepartments);
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
});

module.exports = router;
