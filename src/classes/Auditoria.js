class Auditoria {
	static URL = "http://localhost:3000/api/v1/auditoria";
	constructor() {}

	static async fetchLogsClientes() {
		const LogsClientes = await fetch(`${this.URL}/clientes`)
			.then((response) => response.json())
			.then((data) => data.data);
		return LogsClientes;
	}

	static async fetchLogsPorCliente(clienteId) {
		const LogsCliente = await fetch(`${this.URL}/clientes/${clienteId}`)
			.then((response) => response.json())
			.then((data) => data.data);
		return LogsCliente;
	}

	static async fetchClienteOneLog(logId) {
		const LogsCliente = await fetch(`${this.URL}/clientes/log/${logId}`)
			.then((response) => response.json())
			.then((data) => data.data);
		return LogsCliente;
	}
}

export default Auditoria;
