import React, { useState, useEffect } from "react";

async function listarClientes() {
	const listaClientes = await fetch("http://localhost:3000/api/v1/clientes")
		.then((response) => response.json())
		.then((data) => data.data)
		.then((datosClientes) =>
			datosClientes.map((cliente) => {
				return {
					id: cliente._id,
					cuit: cliente.cuit,
					nombre_razon_social: cliente.nombre_razon_social,
					celular: cliente.celular,
					email: cliente.email,
					selected: false, // Add selected property to track selection
				};
			})
		);
	return listaClientes;
}

const SelectorClientes = ({ setSeleccionados, titulo, maximo = 0 }) => {
	const [clientes, setClientes] = useState([]);
	const [filteredClientes, setFilteredClientes] = useState([]);
	const [filter, setFilter] = useState("");
	const [mostrarError, setMostrarError] = useState(false);

	useEffect(() => {
		async function fetchData() {
			const clientes = await listarClientes();
			setClientes(clientes);
			setFilteredClientes(clientes);
		}
		fetchData();
	}, []);

	const canSelect = () => {
		if (maximo > 0 && getSelectedClientes().length > maximo - 1) {
			setMostrarError(true);
			return false;
		}
		return true;
	};

	const handleFilterChange = (event) => {
		const value = event.target.value;
		setFilter(value);
		const filteredClientes = clientes.filter((cliente) =>
			cliente.nombre_razon_social.toLowerCase().includes(value.toLowerCase())
		);
		setFilteredClientes(filteredClientes);
	};

	const handleClienteClick = (cliente) => {
		const updatedClientes = clientes.map((c) => {
			if (c.cuit === cliente.cuit) {
				if (canSelect() || c.selected) {
					c.selected = !c.selected;
					setMostrarError(false);
				}
			}
			return c;
		});

		setFilter("");
		setFilteredClientes(updatedClientes);
		setClientes(updatedClientes);
		setSeleccionados(updatedClientes.filter((cliente) => cliente.selected));
	};
	const getSelectedClientes = () => {
		return clientes.filter((cliente) => cliente.selected);
	};

	return (
		<div className="flex flex-col bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
			<h2 className="text-2xl text-black font-bold mb-4">{titulo}</h2>
			{mostrarError && (
				<p className="text-red-500">
					Maximo de {titulo.toLowerCase()} seleccionable: {maximo}
				</p>
			)}
			<input
				type="text"
				placeholder="Filtro por nombre o CUIT"
				value={filter}
				onChange={handleFilterChange}
				className={styles.inputs}
			/>
			<table className={styles.table}>
				<thead className={styles.thead}>
					<tr>
						<th>Nombre/Razón Social</th>
						<th>CUIT</th>
						<th>Celular</th>
						<th>Email</th>
					</tr>
				</thead>
				<tbody>
					{getSelectedClientes().map((cliente) => (
						<tr
							key={cliente.cuit}
							onClick={() => handleClienteClick(cliente)}
							className={styles.selected}
						>
							<td>{cliente.nombre_razon_social}</td>
							<td>{cliente.cuit}</td>
							<td>{cliente.celular}</td>
							<td>{cliente.email}</td>
						</tr>
					))}
					{filteredClientes.length !== 0 ? (
						filteredClientes.slice(0, 7).map((cliente) =>
							cliente.selected ? null : (
								<tr
									key={cliente.id}
									onClick={() => handleClienteClick(cliente)}
									className={`${styles.tr} ${
										cliente.selected ? styles.selected : ""
									}`}
								>
									<td>{cliente.nombre_razon_social}</td>
									<td>{cliente.cuit}</td>
									<td>{cliente.celular}</td>
									<td>{cliente.email}</td>
								</tr>
							)
						)
					) : (
						<tr>
							<td className="text-center text-red-500">No hay resultados</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
};

const styles = {
	inputs: "border-b-4 border-blue-500 bg-slate-200 rounded py-2 px-4",
	selected: "bg-blue-500 text-white hover:bg-blue-300",
	table: "text-m text-left text-gray-500 dark:text-gray-400",
	thead:
		"text-m text-gray-700 p-1 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400",
	th: "py-3 px-5 uppercase",
	tr: "hover:bg-gray-100",
	selected: "bg-blue-500 text-white",
};

export default SelectorClientes;
