class BusquedaInteligente {
	static URL = "http://localhost:3000/api/v1/busquedas";
	constructor(data) {
		this.cliente = data.cliente;
		this.operacion = data.operacion;
		this.localidad = data.localidad;
		this.tipo_propiedad = data.tipo;
		this.ambientes = data.ambientes;
		this.dimension_min = data.dimension_min;
		this.dimension_max = data.dimension_max;
		this.monto_min = data.monto_min;
		this.monto_max = data.monto_max;
		this.moneda = data.moneda;
		this.observaciones = data.observaciones;
		this.propiedades = data.propiedades;
	}

	static async obtenerBusquedasDelCliente(clienteId) {
		const url = `${this.URL}/${clienteId}`;
		try {
			const response = await fetch(url);
			const data = await response.json();
			return data;
		} catch (error) {
			console.error("Error:", error);
			return error;
		}
	}

	static async crearBusqueda(data, setEnvio) {
		setEnvio({ loading: true, error: false, sent: false });
		fetch(this.URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(new BusquedaInteligente(data)),
		})
			.then((res) => res.json())
			.then((data) => {
				setEnvio({ loading: false, error: false, sent: true });
				return data;
			})
			.catch((error) => {
				console.error("Error:", error);
				setEnvio({ loading: false, error: true, sent: false });
				return error;
			});
	}

	static async eliminarBusqueda(busquedaId, setEnvio) {
		setEnvio({ loading: true, error: false, sent: false });
		fetch(`${this.URL}/${busquedaId}`, {
			method: "DELETE",
		})
			.then((res) => res.json())
			.then((data) => {
				setEnvio({ loading: false, error: false, sent: true });
				return data;
			})
			.catch((error) => {
				console.error("Error:", error);
				setEnvio({ loading: false, error: true, sent: false });
				return error;
			});
	}

	static async busquedasDePropiedad(propiedadId) {
		const url = `http://localhost:3000/propiedades/${propiedadId}/busquedas`;
		try {
			const response = await fetch(url);
			const data = await response.json();
			return data;
		} catch (error) {
			console.error("Error:", error);
			return error;
		}
	}
}

export default BusquedaInteligente;
