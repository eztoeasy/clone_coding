'use strict';

module.exports = {

  // migration 필드 추가
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.addColumn('Shops', 'geo', {
      type : Sequelize.DataTypes.GEOMETRY('POINT')
    });
  },

  // migration 필드 삭제
  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     return queryInterface.removeColumn('Shops', 'geo');
  }
};
