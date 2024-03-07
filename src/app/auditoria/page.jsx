"use client";
import React from "react";
import Auditoria from "@/classes/Auditoria";
import { useState, useEffect } from "react";
import SelectorClientes from "@/components/SelectorClientes/page";
import { fixedDate, formatearCuit } from "@/app/utils/utils";
import ClienteInfo from "@/components/ClienteInfo/page";

export default function AuditoriaPage() {
	const [auditoria, setAuditoria] = useState([]);
	const [logsFiltrados, setLogsFiltrados] = useState([]);
	const [cliente, setCliente] = useState(null);
	const [logSeleccionado, setLogSeleccionado] = useState(null);
	const [clienteSeleccionadoInfo, setClienteInfo] = useState(null);

	useEffect(() => {
		Auditoria.fetchLogsClientes().then((data) => {
			setAuditoria(data);
			setLogsFiltrados(data);
		});
	}, []);
	useEffect(() => {
		if (cliente?.length > 0) {
			Auditoria.fetchLogsPorCliente(cliente[0].id).then((data) => {
				setLogsFiltrados(data);
			});
		} else {
			setLogsFiltrados(auditoria);
		}
	}, [cliente]);

	const handleLogClick = async (log) => {
		setLogSeleccionado(log);
		const infoLog = await Auditoria.fetchClienteOneLog(log._id);
		setClienteInfo(infoLog);
	};

	return (
		<div className="flex flex-col w-full">
			<div className="flex flex-row items-center gap-2 bg-slate-200 p-2">
				<SelectorClientes
					setSeleccionados={setCliente}
					maximo={1}
					titulo={"Filtrar por cliente"}
				/>
				{logSeleccionado && <ClienteInfo cliente={clienteSeleccionadoInfo} />}
			</div>
			<div className="flex flex-col w-full">
				<table className="w-full">
					<thead className={styles.thead}>
						<tr>
							<th>Cliente</th>
							<th>CUIT/CUIL</th>
							<th>Fecha</th>
							<th>Accion</th>
							<th>Usuario</th>
							<th>Rol</th>
						</tr>
					</thead>
					<tbody className={styles.tbody}>
						{logsFiltrados ? (
							logsFiltrados.map((log) => {
								let fecha =
									log.fecha
										.split("T")[1]
										.split(".")[0]
										.split(":")
										.map((e, i) => {
											if (i === 0) {
												return e - 3;
											}
											return e;
										})
										.join(":") +
									" " +
									fixedDate(log.fecha);
								return (
									<tr
										key={log.id}
										onClick={() => handleLogClick(log)}
										className={styles.tr}
									>
										<td className={styles.td}>{log.nombre_razon_social}</td>
										<td className={styles.td}>{formatearCuit(log.cuit)}</td>
										<td className={styles.td + " text-center"}>{fecha}</td>
										<td className={styles.td}>{log.accion}</td>
										<td className={styles.td}>{log.usuario?.nombre}</td>
										<td className={styles.td}>{log.usuario?.rol}</td>
									</tr>
								);
							})
						) : (
							<tr>
								<td colSpan="6" className="text-center text-red-500">
									No hay logs para mostrar
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
	thead: "text-center p-2 font-bold border-b-2 bg-gray-300",
	tr: "cursor-pointer hover:bg-gray-100 transition-all p-2 text-left divide-x divide-gray-200",
	td: "p-1",
	tbody: "divide-y divide-gray-200 divide-x divide-gray-200",
};
