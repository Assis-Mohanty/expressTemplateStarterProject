'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
          id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
          email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
          },
          name: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          walletBalance: {
            type: DataTypes.FLOAT,
            defaultValue: 0,
          },
          withdrawableBalance: {
            type: DataTypes.FLOAT,
            defaultValue: 0,
          },
          createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
          },
          updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
          }
        });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};