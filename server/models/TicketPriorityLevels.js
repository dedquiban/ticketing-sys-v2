module.exports = (sequelize, DataTypes) => {
  const TicketPriorityLevels = sequelize.define('TicketPriorityLevels', {
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

  TicketPriorityLevels.associate = (models) => {
    TicketPriorityLevels.hasMany(models.Tickets, {
      foreignKey: 'ticketPriorityLevelId',
    });
  };

  return TicketPriorityLevels;
};
