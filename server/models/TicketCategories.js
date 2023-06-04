module.exports = (sequelize, DataTypes) => {
  const TicketCategories = sequelize.define('TicketCategories', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  TicketCategories.associate = (models) => {
    TicketCategories.hasMany(models.Tickets, {
      foreignKey: 'ticketCategoryId',
    });
  };

  return TicketCategories;
};
