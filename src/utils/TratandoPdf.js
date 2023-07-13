import fs from 'fs';
import { PDFDocument } from 'pdf-lib';

async function TratandoPdf(dto) {
  try {
    const boletos = [
      { id: 1, nome_sacado: 'JOSE DA SILVA' },
      { id: 2, nome_sacado: 'MARCOS ROBERTO' },
      { id: 3, nome_sacado: 'MARCIA CARVALHO' },
    ];
    const pdfDoc = await PDFDocument.load(dto.path);

    for (let i = 0; i < boletos.length; i++) {
      const boleto = boletos[i];
      const { id } = boleto;

      const newPdfDoc = await PDFDocument.create();
      const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [i]);
      newPdfDoc.addPage(copiedPage);

      const outputPath = `temps/boletos/${id}.pdf`;
      const newPdfBytes = await newPdfDoc.save();
      fs.writeFileSync(outputPath, newPdfBytes);

      console.log(`Boleto ${id}  salvo em ${outputPath}`);
    }
  } catch (error) {
    console.log('Erro ao processar o PDF:', error);
  }
}

export default TratandoPdf;
