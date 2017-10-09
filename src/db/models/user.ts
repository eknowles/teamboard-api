import * as Sequelize from 'sequelize';

export interface UserAttributes {
  id?: string;
  email?: string;
}

export interface UserInstance extends Sequelize.Instance<UserAttributes> {
  id: string;
  email: string;
  passwords?: any[];
  createdAt: Date;
  updatedAt: Date;
}

export default function defineUser(sequelize: Sequelize.Sequelize, DataTypes) {
  const User = sequelize.define('user', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true
    },
    email: {
      allowNull: false,
      type: Sequelize.STRING(50),
      unique: true,
      validate: {
        isEmail: true,
      }
    },
  }, {
      timestamps: true,
      classMethods: {
        associate: function(models) {
          User.hasMany(models.password);
        }
      }
    });
  return User;
}
