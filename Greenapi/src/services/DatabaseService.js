import Sequelize from 'sequelize';

class DatabaseService {
  constructor() {
    if (!DatabaseService.instance) {
      this.sequelize = new Sequelize('GreenDB', 'root', 'admin', {
        host: 'green_Db',
        dialect: 'mysql',
      });

      DatabaseService.instance = this;
    }

    return DatabaseService.instance;
  }

  getSequelize() {
    return this.sequelize;
  }
}

export default DatabaseService;
