module.exports = (sequelize, DataTypes) => {
  const Permissions = sequelize.define('Permissions', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // createdAt: {
    //   type: DataTypes.DATE,
    //   defaultValue: DataTypes.NOW,
    //   allowNull: false,
    // },
    // updatedAt: {
    //   type: DataTypes.DATE,
    //   defaultValue: DataTypes.NOW,
    //   allowNull: false,
    // },
  });

  Permissions.associate = (models) => {
    // Permissions.hasMany(models.Roles, { foreignKey: 'permissionId' });
    Permissions.belongsToMany(models.Roles, {
      through: 'RolePermission',
      //   foreignKey: 'permissionId',
    });
  };

  return Permissions;
};
