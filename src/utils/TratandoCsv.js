import fs from 'fs';
import csv_parser from 'fast-csv';

const csv = [];
function TratandoCsv(dto) {
  return new Promise((resolve, reject) => {
    console.log(dto);
    fs.createReadStream(dto.path)
      .pipe(csv_parser.parse({ headers: true, delimiter: ';' }))
      .on('error', (error) => reject.error(error))
      .on('data', (data) => csv.push(data))
      .on('end', () => resolve(csv));
  });
}

export default TratandoCsv;
