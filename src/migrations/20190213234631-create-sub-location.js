module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('SubLocations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      name: {
        unique: true,
        allowNull: false,
        type: Sequelize.STRING,
      },

      maleResidents: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },

      femaleResidents: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },

      totalResidents: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },

      mainLocationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'MainLocations',
          key: 'id',
          as: 'mainLocationId',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },
  down: (queryInterface) => queryInterface.dropTable('SubLocations'),
};
