import * as Sequelize from 'sequelize';

export interface PasswordAttributes {
  id?: string;
  hash?: string;
  salt?: string;
  iterations?: number;
  userId?: string;
}

export interface PasswordInstance extends Sequelize.Instance<PasswordAttributes> {
  id: string;
  hash: string;
  salt: string;
  iterations: string;
  createdAt: Date;
}

export default function defineUser(sequelize: Sequelize.Sequelize, DataTypes) {
  const Password = sequelize.define('password', {
    id: {
      allowNull: false,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true
    },
    hash: {
      allowNull: false,
      type: Sequelize.STRING(255)
    },
    salt: {
      allowNull: false,
      type: Sequelize.STRING(255)
    },
    iterations: {
      allowNull: false,
      type: Sequelize.INTEGER(6)
    },
  }, {
      timestamps: true,
      updatedAt: false,
      classMethods: {
        associate: function(models) {
          Password.belongsTo(models.user, { onDelete: 'CASCADE' });
        }
      }
    });
  return Password;
}
