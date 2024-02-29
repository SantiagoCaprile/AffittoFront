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
		this.ubicacion = {
			lat: data.ubicacion.lat,
			lng: data.ubicacion.lng,
		};
		this.operaciones = data.operaciones;
		this.propietario = data.clientes[0];
	}

	static async CrearPropiedad(data) {
		try {
			const response = await fetch(this.URL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(new Propiedad(data)),
			});
			const result = await response.json();
			return result;
		} catch (error) {
			console.error("Error:", error);
			return null;
		}
	}

	static async editarPropiedad(propiedadId, data) {
		console.log(data);
		fetch(`${this.URL}/${propiedadId}`, {
			method: "PUT",
			body: JSON.stringify(new Propiedad(data)),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.catch((error) => console.error("Error:", error));
	}

	static async fetchPropiedades() {
		const listaPropiedades = await fetch(this.URL)
			.then((response) => response.json())
			.then((data) => data.data)
			.then((datosPropiedades) =>
				datosPropiedades.map((prop) => {
					return prop;
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

	static async agregarOperacion(_id, operacion) {
		console.log("URL", `${this.URL}/${_id}/operacion`);
		const response = await fetch(`${this.URL}/${_id}/operacion`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(operacion),
		})
			.then((response) => response.json())
			.then((data) => data.data);
		return response;
	}

	static async editarOperacion(_id, idOp, operacion) {
		const response = await fetch(`${this.URL}/${_id}/operacion/${idOp}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(operacion),
		})
			.then((response) => response.json())
			.then((data) => data.data);
		return response;
	}

	static async borrarOperacion(_id, idOp) {
		const response = await fetch(`${this.URL}/${_id}/operacion/${idOp}`, {
			method: "DELETE",
		})
			.then((response) => response.json())
			.then((data) => data.data);
		return response;
	}

	static async buscarContratos(_id) {
		const response = await fetch(`${this.URL}/${_id}/contratos`)
			.then((response) => response.json())
			.then((data) => data.data);
		return response;
	}

	static async seniarPropiedad(senia, setEnvio) {
		setEnvio({ loading: true });
		const response = await fetch("http://localhost:3000/api/v1/pagos/senias", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(senia),
		})
			.then((response) => {
				console.log(response);
				if (response.ok) {
					setEnvio({ sent: true, loading: false, error: false });
					return response.json();
				} else throw new Error("Network response was not ok", response);
			})
			.catch((error) => {
				console.error("Error:", error);
				setEnvio({ loading: false, error: true });
			});
		return response;
	}

	static async arrepentirseSenia(seniaId, setEnvio) {
		setEnvio({ loading: true });
		const response = await fetch(
			`http://localhost:3000/api/v1/pagos/senias/${seniaId}`,
			{
				method: "PUT",
			}
		)
			.then((response) => {
				console.log(response);
				if (response.ok) {
					setEnvio({ sent: true, loading: false, error: false });
					return response.json();
				} else throw new Error("Network response was not ok", response);
			})
			.catch((error) => {
				console.error("Error:", error);
				setEnvio({ loading: false, error: true });
			});
		return response;
	}
}

export default Propiedad;
