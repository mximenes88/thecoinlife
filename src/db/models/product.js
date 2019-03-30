'use strict';
module.exports = (sequelize, DataTypes) => {
  var Product = sequelize.define('Product', {
    name:{
      type:DataTypes.STRING,
      allowNull:false
    },
    description:{
      type: DataTypes.STRING,
      allowNull:false
    } ,
    price: {
      type:DataTypes.FLOAT,
      allowNull:false
    },
    userId:{
      type: DataTypes.INTEGER
    }
  }, {});
  Product.associate = function(models) {
    // associations can be defined here
    Product.belongsTo(models.User,{
      foreignKey: 'userId',
			onDelete: 'CASCADE',
    })
  };
  return Product;
};