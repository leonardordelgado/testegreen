import { DataTypes, Model } from 'sequelize';
import ConnectDbService from '../services/DatabaseService.js';
import Lotes from './Lotes.js';

const sequelize = new ConnectDbService().getSequelize();

class Boletos extends Model {}

Boletos.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome_sacado: {
      type: DataTypes.STRING(255),
    },
    id_lote: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Lotes,
        key: 'id',
      },
    },
    valor: {
      type: DataTypes.DECIMAL,
    },
    linha_digitavel: {
      type: DataTypes.STRING(255),
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    criado_em: {
      type: DataTypes.DATE,
      defaultValue: Date.now(),
    },
  },
  {
    sequelize,
    modelName: 'boletos',
    timestamps: false,
  },
);

export default Boletos;
