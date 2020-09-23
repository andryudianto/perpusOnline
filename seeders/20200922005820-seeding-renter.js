'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   return queryInterface.bulkInsert('Renters', [
     {
      firstName: 'John',
      lastName: 'Doe',
      birthDate: '2002-02-02',
      password: '12345',
      email: 'johndoe@mail.com',
      address: 'Jakarta Timur',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: 'Jane',
      lastName: 'Doe',
      birthDate: '2003-03-03',
      password: '12345',
      email: 'janedoe@mail.com',
      address: 'Jakarta Timur',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Renters', null, {});
  }
};
