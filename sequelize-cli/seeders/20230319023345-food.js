'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Food', [{
      food_id: 'id food',
      food_name: 'name food',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      food_id: 'id food 2',
      food_name: 'name food 2',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      food_id: 'id food 3',
      food_name: 'name food 3',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Food', null, {});
  }
};
