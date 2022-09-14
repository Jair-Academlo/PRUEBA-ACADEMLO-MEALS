const { db, DataTypes } = require('../utils/database');

const User = db.define('user', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    unique: true,
    allowNull: false,
    type: DataTypes.STRING,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  status: {
    allowNull: false,
    type: DataTypes.ENUM('active', 'disable'),
    defaultValue: 'active',
  },
  role: {
    allowNull: false,
    type: DataTypes.ENUM('normal', 'admin'),
    defaultValue: 'normal',
  },
});

module.exports = { User };
