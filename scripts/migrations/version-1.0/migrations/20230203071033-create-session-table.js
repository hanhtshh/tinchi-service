'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.createTable(
        'sessions',
        {
          id: {
            autoIncrement: true,
            type: Sequelize.DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
          },
          date: {
            type: Sequelize.DataTypes.DATE,
            allowNull: true,
          },
          start_time: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: true,
          },
          total_time: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: true,
          },
          created_at: {
            type: Sequelize.DataTypes.DATE,
            allowNull: true,
          },
          updated_at: {
            type: Sequelize.DataTypes.DATE,
            allowNull: true,
          }
        },
        { schema: process.env.MYSQL_SCHEMA }
      );
    } catch (error) {
      console.error(`CREATE SESSIONS TABLE ERROR: ${JSON.stringify(error)}`);
      return false;
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.dropTable({
        tableName: 'sessions',
        schema: process.env.MYSQL_SCHEMA,
      });
    }
    catch (error) {
      console.error(`DROP SESSIONS TABLE ERROR: ${JSON.stringify(error)}`);
      return false;
    }
  },
};
