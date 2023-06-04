module.exports = (sequelize, DataTypes) => {
  const Tickets = sequelize.define('Tickets', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    assignedDeptId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
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
    completedAt: {
      type: DataTypes.DATE(6),
      allowNull: true,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },

    ticketCategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'TicketCategories',
        key: 'id',
      },
    },

    ticketStatusId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'TicketStatuses',
        key: 'id',
      },
    },

    ticketPriorityLevelId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'TicketPriorityLevels',
        key: 'id',
      },
    },
  });

  Tickets.associate = (models) => {
    Tickets.belongsTo(models.Departments, {
      foreignKey: 'assignedDeptId',
    });
    Tickets.belongsTo(models.Users, {
      foreignKey: 'userId',
    });
    Tickets.belongsTo(models.TicketStatuses, {
      foreignKey: 'ticketStatusId',
    });
    Tickets.belongsTo(models.TicketCategories, {
      foreignKey: 'ticketCategoryId',
    });
    Tickets.belongsTo(models.TicketPriorityLevels, {
      foreignKey: 'ticketPriorityLevelId',
    });
    Tickets.hasMany(models.TicketComments, {
      foreignKey: 'ticketId',
    });
  };

  return Tickets;
};
