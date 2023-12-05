// adapters/ftpAdapter.js

const FtpPort = require('../interfaces/ftpPort');
const ftp = require('ftp');
const fs = require('fs');

class FtpAdapter extends FtpPort {
	constructor(ftpConfig) {
		super();
		this.ftpConfig = ftpConfig;
		this.client = new ftp();
	}

	async uploadFile(filePath) {
		return new Promise((resolve, reject) => {
			this.client.connect(this.ftpConfig);
			let csvFilePath = `${filePath}_${dateName()}.csv`;

			console.log(csvFilePath)
			this.client.on('ready', () => {
				this.client.put(csvFilePath, `/PEDIDOS/${filePath}.csv`, (err) => {
					if (err) {
						reject(`Error al enviar el archivo al servidor FTP: ${err}`);
						this.client.end();
					} else {
						// Eliminar el archivo después de subirlo
						fs.unlink(filePath, (err) => {
							if (err) {
								console.error(`Error al eliminar el archivo local: ${err}`);
							}
							this.client.end();
						});
						resolve('Archivo enviado al servidor FTP con éxito');
					}
				});
			});

			this.client.on('error', (err) => {
				reject(`Error de conexión FTP: ${err}`);
				this.client.end();
			});
		});
	}
}



function dateName() {
	let date_ob = new Date();

	// current date
	// adjust 0 before single digit date
	let date = ("0" + date_ob.getDate()).slice(-2);

	// current month
	let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

	// current year
	let year = date_ob.getFullYear();

	// current hours
	let hours = date_ob.getHours();
	let result = year + month + date + hours

	return result
}

module.exports = FtpAdapter;
