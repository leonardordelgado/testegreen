import BoletosServices from '../services/BoletosServices.js';

const ServicosBoletos = new BoletosServices();
class ControllerUpPDF {
  static async UpPdf(req, res) {
    const { file } = req;
    try {
      const result = await ServicosBoletos.TratarPdf(file);
      res.status(200).send(result.message);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
}

export default ControllerUpPDF;
