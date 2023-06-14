module.exports = (sequelize, DataTypes) => {
  const Roles = sequelize.define('Roles', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    name: {
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
    // permissionId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: 'Permissions',
    //     key: 'id',
    //   },
    // },
  });

  Roles.associate = (models) => {
    // Roles.belongsTo(models.Permissions, { foreignKey: 'permissionId' });
    Roles.belongsToMany(models.Permissions, {
      through: 'RolePermission',
      // foreignKey: 'roleId'
    });
  };

  return Roles;
};
