// adapters/woocommerceAdapter.js

const WooCommercePort = require('../interfaces/woocommercePort'); // Importar correctamente
const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

class WooCommerceAdapter extends WooCommercePort {
	constructor(apiKey) {
		super();
		this.api = new WooCommerceRestApi(apiKey);
	}

	async getOrders(startDate) {
		try {
			const response = await this.api.get("orders", { after: startDate.toISOString(), per_page: 100 });
			return response.data;
		} catch (error) {
			console.error(error);
			return null;
		}
	}
}

module.exports = WooCommerceAdapter;
