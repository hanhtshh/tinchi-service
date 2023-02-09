'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.createTable(
        'classes',
        {
          id: {
            autoIncrement: true,
            type: Sequelize.DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
          },
          name: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true,
          },
          status: {
            type: Sequelize.DataTypes.ENUM(['OPEN', 'CLOSE']),
            allowNull: false,
            defaultValue: 'OPEN'
          },
          max_student: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
          },
          total_student: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
          },
          tinchi_number: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
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
      console.error(`CREATE CLASSES TABLE ERROR: ${JSON.stringify(error)}`);
      return false;
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.dropTable({
        tableName: 'classes',
        schema: process.env.MYSQL_SCHEMA,
      });
    }
    catch (error) {
      console.error(`DROP CLASSES TABLE ERROR: ${JSON.stringify(error)}`);
      return false;
    }
  },
};
