module.exports = (sequelize, DataTypes) => {
  const TicketComments = sequelize.define('TicketComments', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ticketId: {
      type: DataTypes.STRING,
      references: {
        model: 'Tickets',
        key: 'id',
      },
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
  });

  TicketComments.associate = (models) => {
    TicketComments.belongsTo(models.Tickets, {
      foreignKey: 'ticketId',
    });
  };

  TicketComments.associate = (models) => {
    TicketComments.belongsTo(models.Users, { foreignKey: 'userId' });
  };

  return TicketComments;
};
