const Plant = require("./Plant");
const Vendor = require("./Vendor");
const User = require("./User");

Vendor.hasMany(Plant, {
  as: "plants",
  foreignKey: "vendorId",
  allowNull: false,
});
Plant.belongsTo(Vendor, { as: "vendor" });

module.exports = { Plant, Vendor, User };
