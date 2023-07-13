import ModelLotes from '../models/Lotes.js';
import ModelBoletos from '../models/Boletos.js';
import TratandoCsv from '../utils/TratandoCsv.js';
import TratandoPdf from '../utils/TratandoPdf.js';

class BoletosServices {
  async BoletosPost(dto) {
    try {
      const lotes = await ModelLotes.findAll();
      TratandoCsv(dto)
        .then((data) => {
          data.forEach((element) => {
            const id_lote = lotes.find((lote) => lote.nome.includes(element.unidade));
            if (id_lote) {
              const valorFloat = parseFloat(element.valor.replace(',', '.'));
              const valorFormatado = valorFloat.toFixed(2);
              const NewBoleto = ModelBoletos.create({
                nome_sacado: element.nome,
                id_lote: id_lote.dataValues.id,
                valor: valorFormatado,
                linha_digitavel: element.linha_digitavel,
              });
              const result = NewBoleto.save();
              console.log(result.dataValues);
            }
          });
        });
      return { message: 'Todods os dados foram adicionados ao banco de dados corretamente!' };
    } catch (error) {
      throw new Error(error);
    }
  }

  async BoletosPdf(dto) {
    try {
      const boletos = await ModelBoletos.findAll();
      const result = await TratandoPdf(dto);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getBoletos() {
    const boletos = await ModelBoletos.findAll();
    return boletos;
  }
}

export default BoletosServices;
