import * as Sequelize from 'sequelize';

export interface AppUserAttributes {
  id?: string;
  active?: boolean;
  avatar?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  notification?: boolean;
  phone?: string;
  pwd?: string;
}

export interface AppUserInstance extends Sequelize.Instance<AppUserAttributes> {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  email: string;
  pwd: string;
}

export default function defineUser(sequelize: Sequelize.Sequelize, DataTypes) {
  const AppUser = sequelize.define('AppUser', {
    email: DataTypes.STRING,
    pwd: DataTypes.STRING
  }, {
    timestamps: true,
    classMethods: {}
  });
  return AppUser;
}
