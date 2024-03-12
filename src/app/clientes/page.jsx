"use client";
import React from "react";
import { ChevronRight, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { formatearCuit } from "@/app/utils/utils";
import Link from "next/link";
import Cliente from "@/classes/Cliente";

export default function ClientesPage() {
	const [clientes, setClientes] = useState([]);
	const [filteredClientes, setFilteredClientes] = useState([]);
	const [nombre, setNombre] = useState("");

	useEffect(() => {
		async function fetchData() {
			const listaclientes = await Cliente.fetchClientes();
			setClientes(listaclientes);
			setFilteredClientes(listaclientes);
		}
		fetchData();
	}, []);

	const filterClients = () => {
		const filteredClientes = clientes.filter((cliente) =>
			cliente.nombre_razon_social.toLowerCase().includes(nombre.toLowerCase())
		);
		setFilteredClientes(filteredClientes);
	};

	return (
		<div className="flex flex-1 justify-center items-center bg-[#E8EFFF]">
			<div className="shadow-md rounded px-8 pb-8 mb-4 max-w-[1200px] bg-white w-4/5">
				<h1 className="text-2xl font-bold py-4">Clientes</h1>
				<div className="flex items-center justify-between py-4">
					<div className="flex justify-center">
						<input
							className="border-b-4 border-blue-500 bg-slate-200 rounded py-2 px-4"
							type="text"
							name="nombre_razon_social"
							placeholder="Nombre/Razón Social"
							onChange={(e) => setNombre(e.target.value)}
							onKeyDown={(e) => (e.key == "Enter" ? filterClients() : null)}
						/>
						<div className="flex px-2 min-w-max">
							<button
								className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mx-2 rounded"
								onClick={filterClients}
							>
								<Search />
							</button>
							<button
								className="bg-blue-200 hover:bg-blue-300 text-blue-800 font-bold py-2 px-4 rounded"
								onClick={() => {
									setNombre("");
									setFilteredClientes(clientes);
									document.getElementsByName("nombre_razon_social")[0].value =
										"";
								}}
							>
								Limpiar
							</button>
						</div>
					</div>
					<Link
						href="/crearCliente"
						className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded"
					>
						<button>Nuevo +</button>
					</Link>
				</div>
				<table className="w-full text-m text-left text-gray-500 dark:text-gray-400">
					<thead className="text-m text-gray-700 p-1 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
						<tr className={styles.tr}>
							<th className={styles.th}>Nombre/Razón Social</th>
							<th className={styles.th}>CUIT/CUIL</th>
							<th className={styles.th}>Celular</th>
							<th className={styles.th}>E-Mail</th>
							<th className={styles.th}>Ver Perfil</th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
						{filteredClientes.length ? (
							filteredClientes.map((cliente, index) => (
								<tr key={index} className={styles.tr}>
									<td className={styles.td}>{cliente.nombre_razon_social}</td>
									<td className={styles.td + " whitespace-nowrap"}>
										{formatearCuit(cliente.cuit)}
									</td>
									<td className={styles.td}>{cliente.celular}</td>
									<td className={styles.td}> {cliente.email}</td>
									<td className={styles.td}>
										<Link
											href={"/clientes/" + cliente.cuit}
											className={styles.button}
										>
											<ChevronRight color="white" />
										</Link>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan="5" className="text-center text-red-500">
									No hay resultados
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}

const styles = {
	th: "py-3 px-5 uppercase",
	td: "w-4 p-4",
	tr: "hover:bg-gray-100",
	button: "flex justify-center w-1/2 bg-blue-500 rounded-xl",
	input:
		"w-2/5 border-black border-b-2 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
};
