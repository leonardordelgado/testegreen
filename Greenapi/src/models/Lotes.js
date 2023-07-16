import { DataTypes, Model } from 'sequelize';
import ConnectDbService from '../services/DatabaseService.js';

const sequelize = new ConnectDbService().getSequelize();

class Lotes extends Model {}

Lotes.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING(100),
    },
    ativo: {
      type: DataTypes.BOOLEAN,
    },
    criado_em: {
      type: DataTypes.DATE,
      defaultValue: Date.now(),
    },
  },
  {
    sequelize,
    modelName: 'lotes',
    timestamps: false,
  },
);

export default Lotes;
