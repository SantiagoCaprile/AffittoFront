class Propiedad {
	static URL = "http://localhost:3000/propiedades";
	constructor(data) {
		this.tipo = data.tipo;
		this.dimension = data.m2;
		this.estado = data.estado;
		this.precio = data.precio;
		this.moneda = data.moneda;
		this.descripcion = data.descripcion;
		this.domicilio = {
			localidad: data.localidad,
			calle: data.calle,
			altura: data.altura,
			piso: data.piso,
			dpto: data.dpto,
		};
		this.propietario = data.clientes[0];
	}

	static async CrearPropiedad(data) {
		fetch(this.URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(new Propiedad(data)),
		})
			.then((response) => response.json())
			.then((data) => console.log(data))
			.catch((error) => console.error("Error:", error));
	}

	static async fetchPropiedades() {
		const listaPropiedades = await fetch(this.URL)
			.then((response) => response.json())
			.then((data) => data.data)
			.then((datosPropiedades) =>
				datosPropiedades.map((prop) => {
					return {
						tipo: prop.tipo,
						dimension: prop.dimension,
						domicilio: prop.domicilio, //calle, altura, piso, localidad
						precio: prop.precio,
						moneda: prop.moneda,
						estado: prop.estado,
						_id: prop._id,
					};
				})
			);
		return listaPropiedades;
	}

	static async buscarPropiedad(_id) {
		const response = await fetch(`${this.URL}/${_id}`)
			.then((response) => response.json())
			.then((data) => data.data);
		return response;
	}
}

export default Propiedad;
