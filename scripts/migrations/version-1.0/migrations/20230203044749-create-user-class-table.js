'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        'user_classes',
        {
          id: {
            autoIncrement: true,
            type: Sequelize.DataTypes.BIGINT,
            allowNull: false,
            unique: true
          },
          user_id: {
            type: Sequelize.DataTypes.BIGINT,
            allowNull: false,
          },
          class_id: {
            type: Sequelize.DataTypes.BIGINT,
            allowNull: false,
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
      await queryInterface.addConstraint(
        { tableName: 'user_classes', schema: process.env.MYSQL_SCHEMA },
        {
          fields: ['user_id', 'class_id'],
          type: 'primary key',
          name: 'user_classes_pkey',
        }
      );
      transaction.commit();
    } catch (error) {
      console.error(`CREATE USER_CLASSES TABLE ERROR: ${JSON.stringify(error)}`);
      transaction.rollback();
      return false;
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.dropTable({
        tableName: 'user_classes',
        schema: process.env.MYSQL_SCHEMA,
      });
    }
    catch (error) {
      console.error(`DROP USER_CLASSES TABLE ERROR: ${JSON.stringify(error)}`);
      return false;
    }
  },
};
