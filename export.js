const WooCommerceAdapter = require('./adapters/woocommerceAdapter');
const CsvAdapter = require('./adapters/csvAdapter');
const FtpAdapter = require('./adapters/ftpAdapter');
const { parsed_orders, parsed_products } = require('./services/dataProcessor');
require('dotenv').config();

// FTP Server Configuration with SSL
const ftpConfig = {
	host: process.env.FTP_HOST,
	port: process.env.FTP_PORT,
	user: process.env.FTP_USER,
	password: process.env.FTP_PASSWORD,
};

const wooCommerceConfig = {
	url: process.env.WOOCOMMERCE_URL, // Your store URL
	consumerKey: process.env.WOO_CONSUMER_KEY,  // Your consumer key
	consumerSecret: process.env.WOO_CONSUMER_SECRET, // Your consumer secret
	version: process.env.WOO_API_VERSION,  // WooCommerce WP REST API version
};

// Adapter Instances
const wooCommerceAdapter = new WooCommerceAdapter(wooCommerceConfig);
const csvAdapter = new CsvAdapter();
const ftpAdapter = new FtpAdapter(ftpConfig);

async function mainWorkflow() {
	try {
		const startDate = new Date(2023, 9, 1);
		const orders = await wooCommerceAdapter.getOrders(startDate);

		if (orders.length > 0) {
			const productsData = parsed_products(orders);
			const ordersData = parsed_orders(orders);

			console.log("Saving files ...");
			const productsCsvPath = await csvAdapter.exportDataToCsv(productsData, 'products');
			const ordersCsvPath = await csvAdapter.exportDataToCsv(ordersData, 'orders');

			console.log("Uploading files to FTP ...");
			// await ftpAdapter.uploadFile(productsCsvPath);
			// await ftpAdapter.uploadFile(ordersCsvPath);

			console.log('All processes have been successfully completed.');
		} else {
			console.log('No orders found to process.');
		}

	} catch (error) {
		console.error('Error in the main workflow:', error);
		// Here you can add logic to handle or revert previous operations if necessary
	}
}

mainWorkflow();
