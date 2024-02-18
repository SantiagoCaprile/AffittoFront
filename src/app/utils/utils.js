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
		? `${parteEnteraSeparada},${parteDecimal}`
		: parteEnteraSeparada;
}
