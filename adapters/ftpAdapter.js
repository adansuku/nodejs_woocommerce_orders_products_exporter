// adapters/ftpAdapter.js

const ftp = require('ftp');
const fs = require('fs');

const ftpPort = require('../interfaces/ftpPort');

const fileFolder = "ORDERS";

class FtpAdapter extends ftpPort {
	constructor(ftpConfig) {
		super();
		this.ftpConfig = ftpConfig;
		this.client = new ftp();
	}

	async uploadFile(filePath) {
		return new Promise((resolve, reject) => {
			this.client.connect(this.ftpConfig);
			let csvFilePath = `${filePath}_${_dateName()}.csv`;

			console.log(csvFilePath);
			this.client.on('ready', () => {
				this.client.put(csvFilePath, `${fileFolder}/${filePath}.csv`, (err) => {
					if (err) {
						reject(`Error sending the file to the FTP server: ${err}`);
						this.client.end();
					} else {
						// Delete the file after uploading
						fs.unlink(filePath, (err) => {
							if (err) {
								console.error(`Error deleting the local file: ${err}`);
							}
							this.client.end();
						});
						resolve('File sent to FTP server successfully');
					}
				});
			});

			this.client.on('error', (err) => {
				reject(`FTP connection error: ${err}`);
				this.client.end();
			});
		});
	}
}

function _dateName() {
	let date_ob = new Date();

	// Current date
	// Adjust 0 before single-digit date
	let date = ("0" + date_ob.getDate()).slice(-2);

	// Current month
	let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

	// Current year
	let year = date_ob.getFullYear();

	// Current hours
	let hours = date_ob.getHours();
	let result = year + month + date + hours;

	return result;
}

module.exports = FtpAdapter;
