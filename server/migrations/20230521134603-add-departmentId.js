'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'departmentId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1,
      references: {
        model: 'Departments',
        key: 'id',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'departmentId');
  },
};
