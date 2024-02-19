class Tasacion {
	static URL = "http://localhost:3000/api/v1/tasaciones";
	constructor(data) {
		this._id = data._id;
		this.fecha_visita = data.fecha_visita;
		this.fecha_tasacion = data.fecha_tasacion;
		this.valor = data.valor;
		this.moneda = data.moneda;
		this.tasador_nombre = data.tasador_nombre;
		this.tasador_matricula = data.tasador_matricula;
		this.tasador_telefono = data.tasador_telefono;
		this.motivo = data.motivo;
		this.antiguedad = data.antiguedad;
		this.observaciones = data.observaciones;
		this.solicitante = data.solicitante;
		this.propiedad = data.propiedad;
	}

	static async obtenerTasacionesPorPropiedad(propiedadId) {
		const response = await fetch(`${this.URL}/${propiedadId}`)
			.then((response) => response.json())
			.catch((error) => console.error("Error:", error));
		return response;
	}

	static async crearTasacion(data, setEnvio) {
		setEnvio({ loading: true, error: false, sent: false });
		fetch(`${this.URL}/${data.propiedad}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(new Tasacion(data)),
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

	static async editarTasacion(data, setEnvio) {
		setEnvio({ loading: true, error: false, sent: false });
		console.log(data);
		fetch(`${this.URL}/${data._id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(new Tasacion(data)),
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

	static async borrarTasacion(id) {
		const response = await fetch(`${this.URL}/${id}`, {
			method: "DELETE",
		})
			.then((response) => response.json())
			.then((data) => data.data);
		return response;
	}
}

export default Tasacion;
