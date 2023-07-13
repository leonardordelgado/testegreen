import Sequelize from 'sequelize';

class DatabaseService {
  constructor() {
    if (!DatabaseService.instance) {
      this.sequelize = new Sequelize('GreenDB', 'root', 'admin', {
        host: 'localhost',
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
