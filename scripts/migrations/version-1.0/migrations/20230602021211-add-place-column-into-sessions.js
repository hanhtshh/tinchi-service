'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await Promise.all([
        ///Update orders column
        queryInterface.addColumn(
          { tableName: 'sessions', schema: process.env.MYSQL_SCHEMA },
          'place',
          {
            type: Sequelize.DataTypes.STRING,
            defaultValue: "405-A2",
          },
          { transaction },
        ),
      ]);
      await transaction.commit();
    } catch (error) {
      console.error(`Add place column in sessions error: ${JSON.stringify(error)}`);
      await transaction.rollback();
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    const { sequelize } = queryInterface;
    const transaction = await sequelize.transaction();
    try {
      await Promise.all([
        queryInterface.removeColumn(
          { tableName: 'sessions', schema: process.env.MYSQL_SCHEMA },
          'place',
          { transaction },
        )
      ]);
      await transaction.commit();
    } catch (error) {
      console.error(`Remove place column in sessions error: ${JSON.stringify(error)}`);
      await transaction.rollback();
      throw error;
    }
  },
};
