'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable(
          'Quizzes',
          { id: { type: Sequelize.INTEGER, allowNull: false,
                  primaryKey: true, autoincrement: true,
                  unique: true},
            question: { type: Sequelize.STRING,
                        validate: {notEmpty: {msg: 'Falta pregunta'} } },
            answer: { type: Sequelize.STRING,
                        validate: {notEmpty: {msg: 'Falta respueta'} } },
            createdAt: { type: Sequelize.DATE, allowNull: false },
            updatedAt: { type: Sequelize.DATE, allowNull: false },

          },
          {
            sync: {forced: true}
          }
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('Quizzes');
  }
};
