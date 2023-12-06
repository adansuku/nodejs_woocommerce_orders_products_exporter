// dataProcessor.js
const Order = require('../domain/models/order')
const Product = require('../domain/models/product')

function parsed_orders(orders) {
	const parsed_orders = []
	orders.forEach((element) => {
		if (element['status'] === "completed") {
			let order = new Order(
				element.id,
				element.number,
				element['status'],
				element['date_created_gmt'],
				element['billing'].first_name + " " + element['billing'].last_name,
				element.meta_data[0].value,
				element.meta_data[0].value,
				element['billing'].address_1 + " " + element['billing'].address_2,
				element['billing'].address_1 + " " + element['billing'].address_2,
				element['billing'].city,
				element['billing'].city,
				element['billing'].postcode,
				element['billing'].postcode,
				element['billing'].state,
				element['billing'].state,
				element['billing'].country,
				element['billing'].country,
				element['billing'].phone,
				element['billing'].phone,
				element['shipping'].first_name + " " + element['shipping'].last_name,
				element['shipping'].first_name + " " + element['shipping'].last_name,
				element['shipping'].address_1 + " " + element['shipping'].address_2,
				element['shipping'].address_1 + " " + element['shipping'].address_2,
				element['shipping'].city,
				element['shipping'].city,
				element['shipping'].postcode,
				element['shipping'].postcode,
				element['shipping'].state,
				element['shipping'].state,
				element['shipping'].country,
				element['shipping'].country,
				element['shipping'].phone,
				element.shipping_total,
				element['billing'].email,
				element['tax_lines'].tax_total,
				element.total,
				element.payment_method,
				element.payment_method_title,
				element.customer_note
			)

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
		if (element['status'] === "completed") {
			let product = new Product(
				element.id,
				element.sku,
				element.order_id,
				element.name,
				element.product_id,
				element.variation_id,
				element.quantity,
				element.sale_price,
				element.price,
				element.total,
				element.total_tax
			)
			parsed_products.push(product)
		}
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
