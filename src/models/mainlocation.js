export default (sequelize, DataTypes) => {
  const MainLocation = sequelize.define('MainLocation', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
  });

  MainLocation.associate = (models) => {
    MainLocation.hasMany(models.SubLocation, {
      as: 'subLocations',
      foreignKey: 'mainLocationId',
    });
  };
  return MainLocation;
};
