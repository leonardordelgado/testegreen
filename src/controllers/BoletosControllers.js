import BoletosServices from '../services/BoletosServices.js';

const Services = new BoletosServices();

class BoletosControllers {
  static async BoletosPost(req, res) {
    const { path } = req.file;
    try {
      const boletos = await Services.BoletosPost({ path });
      res.status(201).send(boletos);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  static async BoletosPdf(req, res) {
    const { path } = req.file;
    try {
      const boletos = await Services.BoletosPdf({ path });
      res.status(201).send(boletos);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  static async GetBoletos(req, res) {
    const result = await Services.getBoletos();
    res.status(200).send(result);
  }
}

export default BoletosControllers;
