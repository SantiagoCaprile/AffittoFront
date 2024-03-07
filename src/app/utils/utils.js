export function fixedDate(date) {
	if (!date) return "";
	return date.split("T")[0].split("-").reverse().join("/");
}

export function mostrarMontoSeparado(monto) {
	if (!monto) return "0";
	const montoString = monto.toString();
	const [parteEntera, parteDecimal] = montoString.split(".");
	const parteEnteraSeparada = parteEntera.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
	return parteDecimal
		? `${parteEnteraSeparada},${parteDecimal.slice(0, 2)}`
		: parteEnteraSeparada;
}

//formatea el cuit con guiones en el formato xx-xxxxxxxx-x
export function formatearCuit(cuit) {
	if (!cuit) return "";
	const cuitString = cuit.toString();
	const prefix = cuitString.slice(0, 2);
	const postfix = cuitString.slice(-1);
	const middle = cuitString.slice(2, -1);

	return `${prefix}-${middle}-${postfix}`;
}
