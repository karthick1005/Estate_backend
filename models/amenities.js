const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('amenities', {
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    amenities_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'amenities_master',
        key: 'id'
      }
    },
    free: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    quotation_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'quotations',
        key: 'id'
      }
    },
    discount_type: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    discount_amount: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    }
  }, {
    sequelize,
    tableName: 'amenities',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "amenities_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
