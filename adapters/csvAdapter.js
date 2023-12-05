// adapters/csvAdapter.js

const CsvPort = require('../interfaces/csvPort');
const { stringify } = require('csv-stringify');
const fs = require('fs');

class CsvAdapter extends CsvPort {
	async exportDataToCsv(data, csvName) {
		return new Promise((resolve, reject) => {
			stringify(data, { header: true, delimiter: ';' }, (err, output) => {
				if (err) {
					reject(err);
				} else {
					const filePath = csvName + "_" + this.dateName() + ".csv";
					fs.writeFile(filePath, output, (err) => {
						if (err) {
							reject(err);
						} else {
							resolve(filePath);
						}
					});
				}
			});
		});
	}

	dateName() {
		let date_ob = new Date();
		let date = ("0" + date_ob.getDate()).slice(-2);
		let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
		let year = date_ob.getFullYear();
		let hours = date_ob.getHours();
		return year + month + date + hours;
	}
}

module.exports = CsvAdapter;
