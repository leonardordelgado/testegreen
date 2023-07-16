import fs from 'fs';
import csv_parser from 'fast-csv';

const csv = [];
function TratandoCsv(dto) {
  const options = {
    headers: true,
    delimiter: ';',
  };
  return new Promise((resolve, reject) => {
    csv_parser
      .parseString(dto.buffer, options)
      .on('data', (row) => {
        csv.push(row)
      })
      .on('end', () => {
        resolve(csv)
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}

export default TratandoCsv;
