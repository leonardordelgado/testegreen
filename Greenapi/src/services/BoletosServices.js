import { PDFDocument } from 'pdf-lib';
import fs from 'fs';
import { Op } from 'sequelize';
import ModelLotes from '../models/Lotes.js';
import ModelBoletos from '../models/Boletos.js';
import TratandoCsv from '../utils/TratandoCsv.js';
import TratandoPdf from '../utils/TratandoPdf.js';

class BoletosServices {
  async BoletosPost(dto) {
    try {
      const lotes = await ModelLotes.findAll();
      const data = await TratandoCsv(dto);

      for (const element of data) {
        const id_lote = lotes.find((lote) => lote.nome.includes(element.unidade));
        if (id_lote) {
          const valorFloat = parseFloat(element.valor.replace(',', '.'));
          const valorFormatado = valorFloat.toFixed(2);
          // eslint-disable-next-line no-await-in-loop
          const NewBoleto = await ModelBoletos.create({
            nome_sacado: element.nome,
            id_lote: id_lote.dataValues.id,
            valor: valorFormatado,
            linha_digitavel: element.linha_digitavel,
          });
          // eslint-disable-next-line no-await-in-loop
          const result = await NewBoleto.save();
          if (!result) throw new Error('Erro ao salvar no banco de dados');
          console.log(result.dataValues);
        }
      }
      return { message: 'Todos os dados foram adicionados ao banco de dados corretamente!' };
    } catch (error) {
      throw new Error(error);
    }
  }

  async TratarPdf(dto) {
    try {
      const boletos = await ModelBoletos.findAll();
      const Pdf = await PDFDocument.load(dto.buffer);
      const pag = Pdf.getPages();
      for (let i = 0; pag.length > i; i += 1) {
        const newPDF = await PDFDocument.create();
        const [page] = await newPDF.copyPages(Pdf, [i]);
        newPDF.addPage(page);
        const DOCPDF = await newPDF.save();
        const orden = await TratandoPdf(DOCPDF);
        const { id } = boletos.find((sacado) => sacado.nome_sacado.includes(orden.nome));
        const CaminhoName = `temps/pdf/${id}.pdf`;
        await fs.promises.writeFile(CaminhoName, DOCPDF);
      }
      return { message: 'Operação realizada com sucesso, os pdfs foram salvos em temps/pfd' };
    } catch (error) {
      throw new Error(error);
    }
  }

  async getBoletosAll() {
    const result = await ModelBoletos.findAll({ attributes: { exclude: ['criado_em'] } });
    return result;
  }

  async getBoletosQuery(dto) {
    const whereClause = {
      nome_sacado: {
        [Op.like]: `%${dto.nome}%`,
      },
    };
    if (dto.valor_inicial && dto.valor_final && dto.id_lote) {
      whereClause.valor = {};
      if (dto.valor_inicial) {
        whereClause.valor[Op.gte] = dto.valor_inicial;
      }
      if (dto.valor_final) {
        whereClause.valor[Op.lte] = dto.valor_final;
      }
      if (dto.id_lote) {
        whereClause.id_lote = dto.id_lote;
      }
    }
    if (dto.valor_inicial || dto.valor_final) {
      whereClause.valor = {};
      if (dto.valor_inicial) {
        whereClause.valor[Op.gte] = dto.valor_inicial;
      }
      if (dto.valor_final) {
        whereClause.valor[Op.lte] = dto.valor_final;
      }
    }
    if (dto.id_lote) {
      whereClause.id_lote = dto.id_lote;
    }

    const result = await ModelBoletos.findAll({
      where: whereClause,
    });
    return result;
  }

  async PdfCreat() {
    const boletos = await this.getBoletosAll();
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    boletos.map((boleto) => {
      page.drawText(JSON.stringify(boleto.dataValues));
    });
    const pdf = await pdfDoc.save();
    const pdflib = await PDFDocument.load(pdf);
    const finaly = await pdflib.saveAsBase64();
    return finaly;
  }
}
export default BoletosServices;
