module.exports = (sequelize, DataTypes) => {
  const TicketStatuses = sequelize.define('TicketStatuses', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  TicketStatuses.associate = (models) => {
    TicketStatuses.hasMany(models.Tickets, {
      foreignKey: 'ticketStatusId',
    });
  };

  return TicketStatuses;
};
