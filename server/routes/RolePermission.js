const express = require('express');
const router = express.Router();
const { Permissions, Roles } = require('../models');

router.post('/', async (req, res) => {
  try {
    const { roleId, permissionId } = req.body;
    const role = await Roles.findByPk(roleId);
    const permission = await Permissions.findByPk(permissionId);

    if (!role || !permission) {
      return res.status(404).json({ error: 'Role or permission not found' });
    }

    await role.addPermission(permission);

    return res.status(200).json({ message: 'Role permission created' });
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
});

module.exports = router;
