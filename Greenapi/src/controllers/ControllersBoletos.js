import BoletosServices from '../services/BoletosServices.js';

const Services = new BoletosServices();

class BoletosControllers {
  static async BoletosPost(req, res) {
    const { file } = req;
    try {
      const boletos = await Services.BoletosPost(file);
      res.status(201).send(boletos);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  static async getBoletos(req, res) {
    const {
      nome, valor_inicial, valor_final, id_lote,
    } = req.query;
    try {
      if (nome || valor_inicial || valor_final || id_lote) {
        const boletos = await Services.getBoletosQuery({
          nome, valor_inicial, valor_final, id_lote,
        });
        res.status(200).json(boletos);
        return;
      }
      const { relatorio } = req.query;
      if (relatorio === '1') {
        const result = await Services.PdfCreat();
        res.status(200).json({ result });
        return;
      }
      const boletos = await Services.getBoletosAll();
      res.status(200).json({ boleto: boletos });
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
}

export default BoletosControllers;
