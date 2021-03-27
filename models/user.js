'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Snippet, { as: 'snippets', foreignKey: 'userId'})
      User.hasMany(models.Comment, { as: 'comments', foreignKey: 'userId'})
    }
  };
  User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    passwordDigest: {
      type: DataTypes.STRING,
      allowNull: false
    },
    github: {
      type: DataTypes.STRING
    },
    avatarUrl: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users'
  });
  return User;
};