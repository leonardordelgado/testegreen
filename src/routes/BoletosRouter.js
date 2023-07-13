import { Router } from 'express';
import multer from 'multer';
import BoletosControllers from '../controllers/BoletosControllers.js';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    // Extração da extensão do arquivo original:
    const extensaoArquivo = file.originalname.split('.')[1];

    // Cria um código randômico que será o nome do arquivo
    const novoNomeArquivo = require('crypto')
      .randomBytes(64)
      .toString('hex');

    // Indica o novo nome do arquivo:
    cb(null, `${novoNomeArquivo}.${extensaoArquivo}`);
  },
});

const pdf = multer({ dest: 'temps/pdfs/' + '/.pdf' });
const csv = multer({ dest: 'temps/csvs/' });
const BoletosRouter = Router();

BoletosRouter
  .get('/boletos', BoletosControllers.GetBoletos)
  .get('/')
  .post('/boletos', csv.single('csv'), BoletosControllers.BoletosPost)
  .post('/boletos/pdf', pdf.single('pdf'), BoletosControllers.BoletosPdf);

export default BoletosRouter;
