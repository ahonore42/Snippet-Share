'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Snippet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Snippet.belongsTo(models.User, { as: 'owner', foreignKey: 'userId' })
      Snippet.hasMany(models.Comment, { as: 'comments', foreignKey: 'snippetId'})
    }
  };
  Snippet.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    mode: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    code: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    userId: {
      type: DataTypes.UUID,
      onDelete: 'CASCADE',
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Snippet',
    tableName: 'snippets'
  });
  return Snippet;
};