const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('estate_image', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    estate_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'estates',
        key: 'id'
      }
    },
    img: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    }
  }, {
    sequelize,
    tableName: 'estate_image',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "estate_image_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
