import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: { msg: 'invalid email format' } },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: { args: 18, msg: 'Age must be from 18 to 120' },
        max: { args: 120, msg: 'Age must be from 18 to 120' },
      },
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    mustChangePassword: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    role: { type: DataTypes.STRING, allowNull: false },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'users',
    timestamps: false,
  },
);

export default User;
