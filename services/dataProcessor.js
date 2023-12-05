// dataProcessor.js

function parsed_orders(orders) {
	const parsed_orders = []
	orders.forEach((element) => {
		if (element['status'] === "completed") {
			order = {
				id: element.id,
				order: element.number,
				status: element['status'],
				created_at: element['date_created_gmt'],
				billing_name: element['billing'].first_name + " " + element['billing'].last_name,
				billing_nif: element.meta_data[0].value,
				billing_address: element['billing'].address_1 + " " + element['billing'].address_2,
				billing_city: element['billing'].city,
				billing_zip: element['billing'].postcode,
				billing_province: element['billing'].state,
				billing_country: element['billing'].country,
				billing_phone: element['billing'].phone,
				shipping_name: element['shipping'].first_name + " " + element['shipping'].last_name,
				shipping_address: element['shipping'].address_1 + " " + element['shipping'].address_2,
				shipping_city: element['shipping'].city,
				shipping_zip: element['shipping'].postcode,
				shippping_province: element['shipping'].state,
				shipping_country: element['shipping'].country,
				shipping_phone: element['shipping'].phone,
				shipping_total: element.shipping_total,
				email: element['billing'].email,
				tax_subtotal: element['tax_lines'].tax_total,
				order_total: element.total,
				payment_method: element.payment_method,
				payment_method_title: element.payment_method_title,
				// shipping_method: element['shipping_lines'][0].method_title ? element['shipping_lines'][0].method_title : "",
				order_notas: element.customer_note
			}

			if (order) {
				parsed_orders.push(order)
			}
		}
	})
	return parsed_orders
}

function parsed_products(orders) {
	const parsed_products = []
	var line_items = mapData(orders)

	line_items.forEach((element) => {

		product = {
			id: element.id,
			sku: element.sku,
			order: element.order_id,
			name: element.name,
			product_id: element.product_id,
			variation_id: element.variation_id,
			quantity: element.quantity,
			sale_price: element.sale_price,
			price: element.price,
			total: element.total,
			total_tax: element.total_tax
		}
		parsed_products.push(product)
	})
	return parsed_products
}

function mapData(data) {
	var mappedData = []
	const output = data.map(x => {
		x['line_items'].forEach((e) => {
			e.order_id = x.id
		})
		mappedData.push(x['line_items'])
	});
	return mappedData.flat()
}

module.exports = { parsed_orders, parsed_products, mapData };
