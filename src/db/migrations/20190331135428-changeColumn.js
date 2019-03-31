'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Products', 
  'image', 'imageurl');
 },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Products', 'image', 'imageurl');
 }
};
