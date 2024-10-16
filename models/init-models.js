var DataTypes = require("sequelize").DataTypes;
var _SequelizeMeta = require("./SequelizeMeta");
var _amenities = require("./amenities");
var _amenities_master = require("./amenities_master");
var _brokers = require("./brokers");
var _estate_image = require("./estate_image");
var _estates = require("./estates");
var _pricingtable = require("./pricingtable");
var _quotations = require("./quotations");
var _user_estates = require("./user_estates");
var _users = require("./users");
var _utilities = require("./utilities");
var _utilities_master = require("./utilities_master");

function initModels(sequelize) {
  var SequelizeMeta = _SequelizeMeta(sequelize, DataTypes);
  var amenities = _amenities(sequelize, DataTypes);
  var amenities_master = _amenities_master(sequelize, DataTypes);
  var brokers = _brokers(sequelize, DataTypes);
  var estate_image = _estate_image(sequelize, DataTypes);
  var estates = _estates(sequelize, DataTypes);
  var pricingtable = _pricingtable(sequelize, DataTypes);
  var quotations = _quotations(sequelize, DataTypes);
  var user_estates = _user_estates(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);
  var utilities = _utilities(sequelize, DataTypes);
  var utilities_master = _utilities_master(sequelize, DataTypes);

  amenities.belongsTo(amenities_master, { as: "amenity", foreignKey: "amenities_id"});
  amenities_master.hasMany(amenities, { as: "amenities", foreignKey: "amenities_id"});
  utilities.belongsTo(amenities_master, { as: "utility", foreignKey: "utilities_id"});
  amenities_master.hasMany(utilities, { as: "utilities", foreignKey: "utilities_id"});
  estates.belongsTo(brokers, { as: "broker", foreignKey: "broker_id"});
  brokers.hasMany(estates, { as: "estates", foreignKey: "broker_id"});
  users.belongsTo(brokers, { as: "broker", foreignKey: "broker_id"});
  brokers.hasMany(users, { as: "users", foreignKey: "broker_id"});
  amenities_master.belongsTo(estates, { as: "estate", foreignKey: "estate_id"});
  estates.hasMany(amenities_master, { as: "amenities_masters", foreignKey: "estate_id"});
  estate_image.belongsTo(estates, { as: "estate", foreignKey: "estate_id"});
  estates.hasMany(estate_image, { as: "estate_images", foreignKey: "estate_id"});
  quotations.belongsTo(estates, { as: "estate", foreignKey: "estate_id"});
  estates.hasMany(quotations, { as: "quotations", foreignKey: "estate_id"});
  user_estates.belongsTo(estates, { as: "estate", foreignKey: "estate_id"});
  estates.hasMany(user_estates, { as: "user_estates", foreignKey: "estate_id"});
  utilities_master.belongsTo(estates, { as: "estate", foreignKey: "estate_id"});
  estates.hasMany(utilities_master, { as: "utilities_masters", foreignKey: "estate_id"});
  amenities.belongsTo(quotations, { as: "quotation", foreignKey: "quotation_id"});
  quotations.hasMany(amenities, { as: "amenities", foreignKey: "quotation_id"});
  pricingtable.belongsTo(quotations, { as: "quotation", foreignKey: "quotation_id"});
  quotations.hasMany(pricingtable, { as: "pricingtables", foreignKey: "quotation_id"});
  utilities.belongsTo(quotations, { as: "quotation", foreignKey: "quotation_id"});
  quotations.hasMany(utilities, { as: "utilities", foreignKey: "quotation_id"});
  quotations.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(quotations, { as: "quotations", foreignKey: "user_id"});
  user_estates.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(user_estates, { as: "user_estates", foreignKey: "user_id"});

  return {
    SequelizeMeta,
    amenities,
    amenities_master,
    brokers,
    estate_image,
    estates,
    pricingtable,
    quotations,
    user_estates,
    users,
    utilities,
    utilities_master,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
