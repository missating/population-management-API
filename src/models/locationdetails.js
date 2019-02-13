
module.exports = (sequelize, DataTypes) => {
  const LocationDetails = sequelize.define('LocationDetails', {
    mainLocation: DataTypes.INTEGER,
    locationId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    femalePopulation: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    malePopulation: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    totalPopulation: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  });

  LocationDetails.associate = models => {
    LocationDetails.belongsTo(models.Location, {
      as: 'locationDetails',
      foreignKey: 'locationId'
    });

    LocationDetails.belongsTo(models.Location, {
      as: 'main',
      foreignKey: 'mainLocation'
    })
  };

  return LocationDetails;
};
