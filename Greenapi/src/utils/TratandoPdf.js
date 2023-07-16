import { PdfReader } from 'pdfreader';

async function readPages(dto, reader = (new PdfReader())) {
  return new Promise((resolve, reject) => {
    const pages = [];
    reader.parseBuffer(dto.buffer, (err, item) => {
      if (err) {
        reject(err);
      } else if (!item) {
        resolve(pages);
      } else if (item.page) {
        pages.push({});
      } else if (item.text) {
        const row = pages[pages.length - 1][item.y] || [];
        row.push(item.text);
        pages[pages.length - 1][item.y] = row;
      }
    });
  });
}
async function parser(dto) {
  const result = await readPages(dto);

  for await (const pag of result) {
    const info = {
      nome: pag['4.816'][1],
      valor: pag['6.271'][1],
      digitavel: pag['7.741'][1],
    };
    return info;
  }
}

export default parser;
