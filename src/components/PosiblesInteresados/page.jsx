import React from "react";
import { useRouter } from "next/navigation";

const PosiblesInteresados = ({ clientes }) => {
	const router = useRouter();
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
					{Array.isArray(clientes) ? (
						clientes.map((cliente) => (
							<tr
								key={cliente.cuit}
								onDoubleClick={() => router.push(`/clientes/${cliente.cuit}`)}
								className={styles.tr}
							>
								<td>{cliente.nombre_razon_social}</td>
								<td>{cliente.celular}</td>
								<td>{cliente.email}</td>
								<td>{cliente.operacion}</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan="3" className="text-center">
								No hay clientes para mostrar
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
