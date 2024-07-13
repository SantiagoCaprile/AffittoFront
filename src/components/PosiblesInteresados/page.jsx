import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import BusquedaInteligente from "@/classes/BusquedaIntelegente";

const PosiblesInteresados = ({ propiedadId }) => {
	const router = useRouter();
	const [busquedas, setBusquedas] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const busquedas = await BusquedaInteligente.busquedasDePropiedad(
				propiedadId
			);
			setBusquedas(busquedas);
		}
		fetchData();
	}, [propiedadId]);

	return (
		<div className="flex flex-col bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
			<h2 className="text-2xl text-black font-bold mb-4">
				Posibles Interesados
			</h2>
			<table className={styles.table}>
				<thead className={styles.thead}>
					<tr>
						<th className={styles.th}>Nombre/Razón Social</th>
						<th className={styles.th}>Celular</th>
						<th className={styles.th}>Email</th>
						<th className={styles.th}>Operacion</th>
					</tr>
				</thead>
				<tbody>
					{busquedas.length > 0 ? (
						busquedas.map((busqueda) => (
							<tr
								key={busqueda._id}
								onDoubleClick={() =>
									router.push(`/clientes/${busqueda.cliente.cuit}`)
								}
								className={styles.tr}
							>
								<td>{busqueda.cliente.nombre_razon_social}</td>
								<td>{busqueda.cliente.celular}</td>
								<td>{busqueda.cliente.email}</td>
								<td>{busqueda.operacion}</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan={4} className="text-center text-red-400">
								No hay clientes interesados
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
};

const styles = {
	table: "text-m text-left text-gray-500 dark:text-gray-400",
	thead:
		"text-m text-gray-700 p-1 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400",
	th: "py-3 px-5 uppercase",
	tr: "hover:bg-gray-100 text-center",
};

export default PosiblesInteresados;
