const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const activities = sequelize.define(
    'activities',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      description: {
        type: DataTypes.TEXT,
      },

      scheduled_at: {
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

  activities.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.activities.belongsTo(db.users, {
      as: 'assigned_user',
      foreignKey: {
        name: 'assigned_userId',
      },
      constraints: false,
    });

    db.activities.belongsTo(db.leads, {
      as: 'related_lead',
      foreignKey: {
        name: 'related_leadId',
      },
      constraints: false,
    });

    db.activities.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.activities.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return activities;
};
