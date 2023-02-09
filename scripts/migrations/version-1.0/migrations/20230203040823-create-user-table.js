'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.createTable(
        'users',
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
          email: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true,
            unique: true
          },
          password: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
          },
          phone_number: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true,
            unique: true
          },
          role: {
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
      console.error(`CREATE USERS TABLE ERROR: ${JSON.stringify(error)}`);
      return false;
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.dropTable({
        tableName: 'users',
        schema: process.env.MYSQL_SCHEMA,
      });
    }
    catch (error) {
      console.error(`DROP USERS TABLE ERROR: ${JSON.stringify(error)}`);
      return false;
    }
  },
};
