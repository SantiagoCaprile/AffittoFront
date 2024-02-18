class Contrato {
	static URL = "http://localhost:3000/api/v1/contratos​";
	constructor(contrato) {
		this._id = contrato._id;
		this.destino = contrato.destino;
		this.estado = contrato.estado;
		this.fecha_inicio = contrato.fecha_inicio;
		this.fecha_fin = contrato.fecha_fin;
		this.fecha_entrega_inmueble = contrato.fecha_entrega_inmueble;
		this.fecha_notificacion_fehaciente = contrato.fecha_notificacion_fehaciente;
		this.comision_celebracion = contrato.comision_celebracion;
		this.monto = contrato.monto;
		this.moneda = contrato.moneda;
		this.observaciones = contrato.observaciones;
		this.pagos = contrato.pagos;
		this.propiedad = contrato.propiedad;
		this.locatario = contrato.locatario;
		this.garantes = contrato.garantes;
	}

	async crearContrato(setState) {
		setState({ loading: true });
		fetch("http://localhost:3000/api/v1/contratos", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(new Contrato(this)),
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				setState({ sent: true, loading: false, error: false });
				return response.json();
			})
			.then((data) => console.log(data))
			.catch((error) => {
				console.error("Error:", error);
				setState({ loading: false, error: true });
			});
	}

	static async buscarContrato(_id) {
		console.log(_id);
		const response = await fetch(
			`http://localhost:3000/api/v1/contratos/${_id}`
		)
			.then((response) => response.json())
			.then((data) => data.data);
		return response;
	}

	static async editarContrato(_id, contrato) {
		const response = await fetch(
			`http://localhost:3000/api/v1/contratos/${_id}`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(contrato),
			}
		)
			.then((response) => response.json())
			.then((data) => data.data);
		return response;
	}
}

export default Contrato;
