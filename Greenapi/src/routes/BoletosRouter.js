import { Router } from 'express';
import multer from 'multer';
import ControllerUpPDF from '../controllers/ControllerUpPDF.js';
import ControllersBoletos from '../controllers/ControllersBoletos.js';

const BoletosRouter = Router();

BoletosRouter
  .get('/boletos', ControllersBoletos.getBoletos)
  .get('/')
  .post('/boletos', multer().single('file'), ControllersBoletos.BoletosPost)
  .post('/upload/pdf', multer().single('file'), ControllerUpPDF.UpPdf);

export default BoletosRouter;
