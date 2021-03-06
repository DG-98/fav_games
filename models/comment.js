"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.comment.belongsTo(models.game)
    }
  }
  comment.init(
    {
      name: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      gameId: DataTypes.INTEGER,
      content: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "comment",
    }
  )
  return comment
}
