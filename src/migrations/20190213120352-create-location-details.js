module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('LocationDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      femalePopulation: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      malePopulation: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      totalPopulation: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      mainLocation: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Locations',
          key: 'id',
          as: 'mainLocation'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      locationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Locations',
          key: 'id',
          as: 'locationId'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('LocationDetails');
  }
};
