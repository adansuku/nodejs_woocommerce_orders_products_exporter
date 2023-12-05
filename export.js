const WooCommerceAdapter = require('./adapters/woocommerceAdapter');
const CsvAdapter = require('./adapters/csvAdapter');
const FtpAdapter = require('./adapters/ftpAdapter');
const { parsed_orders, parsed_products } = require('./services/dataProcessor');
require('dotenv').config()

// Configuración del servidor FTP con SSL
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
}

// Instancias de adaptadores
const wooCommerceAdapter = new WooCommerceAdapter(wooCommerceConfig);
const csvAdapter = new CsvAdapter();
const ftpAdapter = new FtpAdapter(ftpConfig);

async function mainWorkflow() {
	try {
		const startDate = new Date(2023, 9, 1);
		const orders = await wooCommerceAdapter.getOrders(startDate);

		if (orders) {
			console.log(orders)
			// 2. Procesar esos pedidos para generar datos
			const productsData = parsed_products(orders); // Asegúrate de que esta función esté bien definida
			const ordersData = parsed_orders(orders);

			// 3. Exportar esos datos a archivos CSV
			const productsCsvPath = await csvAdapter.exportDataToCsv(productsData, 'products');
			const ordersCsvPath = await csvAdapter.exportDataToCsv(ordersData, 'orders');// Asegúrate de que esta función esté bien definida

			// 4. Subir los archivos CSV al servidor FTP
			// await ftpAdapter.uploadFile(productsCsvPath);
			// await ftpAdapter.uploadFile(ordersCsvPath);
			console.log('Todos los procesos han sido completados exitosamente.');
		}

	} catch (error) {
		console.error('Error en el flujo de trabajo principal:', error);
	}
}

mainWorkflow()

