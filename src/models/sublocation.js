export default (sequelize, DataTypes) => {
  const SubLocation = sequelize.define('SubLocation', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    maleResidents: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },

    femaleResidents: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    
    totalResidents: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  });

  SubLocation.associate = (models) => {
    SubLocation.belongsTo(models.MainLocation, {
      foreignKey: 'mainLocationId',
      as: 'mainLocation',
      onDelete: 'CASCADE',
    });
  };
  return SubLocation;
};
