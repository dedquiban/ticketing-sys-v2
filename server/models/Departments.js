module.exports = (sequelize, DataTypes) => {
  const Departments = sequelize.define('Departments', {
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

  return Departments;
};
