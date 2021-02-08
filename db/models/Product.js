const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    name: { type: DataTypes.STRING, allowNull: false },
    slug: { type: DataTypes.STRING, unique: true },
    description: { type: DataTypes.STRING },
    price: { type: DataTypes.FLOAT, defaultValue: 1, min: 1 },
    image: { type: DataTypes.STRING, isUrl: true },
  });
  SequelizeSlugify.slugifyModel(Product, {
    source: ["name"],
  });

  return Product;
};
