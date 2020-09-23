'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('BookRenters', {
      fields: ['BookId'],
      type: 'foreign key',
      name: 'custom_fkey_BookId',
      references: { //Required field
        table: 'Books',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
    .then(() => {
      return queryInterface.addConstraint('BookRenters', {
        fields: ['RenterId'],
        type: 'foreign key',
        name: 'custom_fkey_RenterId',
        references: { //Required field
          table: 'Renters',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      });
    })
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.removeConstraint('BookRenters', 'custom_fkey_BookId')
    .then(() => {
      return queryInterface.removeConstraint('BookRenters', 'custom_fkey_RenterId')
    })
  }
};
