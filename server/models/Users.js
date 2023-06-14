const Departments = require('./Departments');

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE(6),
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE(6),
      allowNull: false,
    },
    departmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Departments',
        key: 'id',
      },
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Roles',
        key: 'id',
      },
    },
  });

  Users.associate = (models) => {
    Users.hasMany(models.Tickets, { foreignKey: 'userId' });
    Users.hasMany(models.TicketComments, { foreignKey: 'userId' });
    Users.belongsTo(models.Departments, { foreignKey: 'departmentId' });
    Users.belongsTo(models.Roles, { foreignKey: 'roleId' });
  };

  return Users;
};
