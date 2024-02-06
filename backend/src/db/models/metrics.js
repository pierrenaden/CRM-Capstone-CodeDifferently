const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const metrics = sequelize.define(
    'metrics',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.TEXT,
      },

      value: {
        type: DataTypes.DECIMAL,
      },

      recorded_at: {
        type: DataTypes.DATE,
      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  metrics.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.metrics.belongsTo(db.users, {
      as: 'related_user',
      foreignKey: {
        name: 'related_userId',
      },
      constraints: false,
    });

    db.metrics.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.metrics.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return metrics;
};
