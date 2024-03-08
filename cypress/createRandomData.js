const nombres = [
	"Juan",
	"Pedro",
	"Maria",
	"Ana",
	"Luis",
	"Carlos",
	"Sofia",
	"Laura",
	"Pablo",
	"Javier",
];
const apellidos = [
	"Gomez",
	"Perez",
	"Rodriguez",
	"Fernandez",
	"Lopez",
	"Garcia",
	"Martinez",
	"Sanchez",
	"Torres",
	"Ramirez",
];
const emails = ["gmail.com", "hotmail.com", "yahoo.com", "outlook.com"];
const calles = [
	"Av. Corrientes",
	"Av. Rivadavia",
	"Av. Santa Fe",
	"Av. Cabildo",
	"Av. Córdoba",
	"Av. Callao",
	"Av. 9 de Julio",
	"Av. Pueyrredón",
	"Av. Scalabrini Ortiz",
	"Av. Juan B. Justo",
];
const localidades = ["Rosario", "Capital Federal", "Santa Fe"];

export function crearClienteFalso() {
	const nombre = nombres[Math.floor(Math.random() * nombres.length)];
	const apellido = apellidos[Math.floor(Math.random() * apellidos.length)];
	const email =
		nombre.toLowerCase() +
		apellido.toLowerCase() +
		"@" +
		emails[Math.floor(Math.random() * emails.length)];
	const cuit = Math.floor(Math.random() * 10000000000);
	const celular = Math.floor(Math.random() * 10000000000);
	const domicilio = {
		calle: calles[Math.floor(Math.random() * calles.length)],
		altura: Math.floor(Math.random() * 1000),
		piso: Math.floor(Math.random() * 10),
		dpto: Math.floor(Math.random() * 10),
		localidad: localidades[Math.floor(Math.random() * localidades.length)],
	};
	//condicion iva es valor entero entre 1 y 3
	const condicion_iva = Math.floor(Math.random() * 3) + 1;
	return {
		nombre_razon_social: nombre + " " + apellido,
		email,
		condicion_iva,
		cuit,
		celular,
		domicilio,
	};
}
