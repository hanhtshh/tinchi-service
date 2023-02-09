'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        'class_sessions',
        {
          id: {
            autoIncrement: true,
            type: Sequelize.DataTypes.BIGINT,
            allowNull: false,
            unique: true
          },
          class_id: {
            type: Sequelize.DataTypes.BIGINT,
            allowNull: false,
          },
          session_id: {
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
        { tableName: 'class_sessions', schema: process.env.MYSQL_SCHEMA },
        {
          fields: ['class_id', 'session_id'],
          type: 'primary key',
          name: 'class_sessions_pkey',
        }
      );
      transaction.commit();
    } catch (error) {
      console.error(`CREATE CLASS_SESSIONS TABLE ERROR: ${JSON.stringify(error)}`);
      transaction.rollback();
      return false;
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.dropTable({
        tableName: 'class_sessions',
        schema: process.env.MYSQL_SCHEMA,
      });
    }
    catch (error) {
      console.error(`DROP CLASS_SESSIONS TABLE ERROR: ${JSON.stringify(error)}`);
      return false;
    }
  },
};
