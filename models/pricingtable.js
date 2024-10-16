const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pricingtable', {
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    pricingtype: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    allpriceobject: {
      type: DataTypes.JSON,
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
    tableName: 'pricingtable',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "pricingtable_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
