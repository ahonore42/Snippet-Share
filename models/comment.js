'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsTo(models.User, { as: 'commenter', foreignKey: 'userId' })
      Comment.belongsTo(models.Snippet, { as: 'snippet', foreignKey: 'snippetId' })
    }
  };
  Comment.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {
      type: DataTypes.UUID,
      onDelete: 'CASCADE',
      references: {
        model: 'users',
        key: 'id'
      }
    },
    snippetId: {
      type: DataTypes.UUID,
      onDelete: 'CASCADE',
      references: {
        model: 'snippets',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};