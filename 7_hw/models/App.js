import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Apps = sequelize.define(
  'Apps',
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
    size: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'apps',
    timestamps: false,
  },
);

export default Apps;
