const Plant = require("./Plant");
const Vendor = require("./Vendor");

Vendor.hasMany(Plant, {
  as: "plants",
  foreignKey: "vendorId",
  allowNull: false,
});
Plant.belongsTo(Vendor, { as: "vendor" });

module.exports = { Plant, Vendor };
