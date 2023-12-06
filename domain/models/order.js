// domain/models/Order.js
class Order {
	constructor(
		id, order, number, status, date_created_gmt, billing_name,
		billing_nif, billing_address, billing_city, billing_zip, billing_province, billing_country, billing_phone,
		shipping_name, shipping_address, shipping_city, shipping_zip, shippping_province, shipping_country, shipping_phone,
		shipping_total, email, tax_subtotal, order_total, payment_method, payment_method_title, order_notas
	) {
		this.id = id;
		this.order = number;
		this.status = status;
		this.created_at = date_created_gmt;
		this.billing_name = billing_name;
		this.billing_nif = billing_nif;
		this.billing_address = billing_address;
		this.billing_city = billing_city;
		this.billing_zip = billing_zip;
		this.billing_province = billing_province;
		this.billing_country = billing_country;
		this.billing_phone = billing_phone;
		this.shipping_name = shipping_name;
		this.shipping_address = shipping_address;
		this.shipping_city = shipping_city;
		this.shipping_zip = shipping_zip;
		this.shippping_province = shippping_province;
		this.shipping_country = shipping_country;
		this.shipping_phone = shipping_phone;
		this.shipping_total = shipping_total;
		this.email = email;
		this.tax_subtotal = tax_subtotal;
		this.order_total = order_total;
		this.payment_method = payment_method;
		this.payment_method_title = payment_method_title;
		this.order_notas = order_notas;
	}
}

module.exports = Order;
