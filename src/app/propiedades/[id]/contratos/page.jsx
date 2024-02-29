"use client";
import React, { useEffect, useState } from "react";
import Propiedad from "@/classes/Propiedad";
import { fixedDate } from "@/app/utils/utils";
import { ChevronLeft, CheckSquare, Ban, CircleDollarSign } from "lucide-react";
import { useRouter } from "next/navigation";
import Router from "next/router";
import Link from "next/link";

//muestra una tabla con los contratos de la propiedad
export default function Contratos() {
	const [contratos, setContratos] = useState([]);
	const router = useRouter();
	const [idPropiedad, setId] = useState("");
	useEffect(() => {
		const id = window.location.pathname.split("/")[2];
		setId(id);
		Propiedad.buscarContratos(id)
			.then((contratos) => {
				console.log(contratos);
				contratos.map((contrato) => {
					if (contrato.saldo === undefined) {
						contrato.saldo = 0;
						if (contrato.pagos.length > 0) {
							contrato.saldo = contrato.pagos.reduce(
								(acc, pago) => acc + pago.monto,
								0
							);
						}
						contrato.saldo -= contrato.comision_celebracion;
					}
				});
				setContratos(contratos);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	return (
		<div className="flex flex-1 flex-col justify-center items-center bg-[#E8EFFF] p-4">
			<div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-[800px] w-2/3">
				<div className="flex justify-between mb-4">
					<div className="flex flex-col">
						<h2 className="text-2xl font-bold">Contratos</h2>
						<p className="text-sm font-bold text-gray-400">
							Haga doble click en un contrato para ver más detalles
						</p>
					</div>
					<Link
						href={`/propiedades/${idPropiedad}`}
						className="flex gap-2 bg-blue-300 hover:bg-blue-500 transition-all text-white px-4 py-2 rounded-md items-center justify-center"
					>
						<ChevronLeft size={20} />
						Volver
					</Link>
				</div>
				<table className="w-full">
					<thead>
						<tr>
							<th>Fecha Inicio</th>
							<th>Fecha Fin</th>
							<th>Destino</th>
							<th>Estado</th>
							<th>Pago de comisión</th>
						</tr>
					</thead>
					<tbody className="text-center">
						{contratos && contratos.length > 0 ? (
							contratos.map((contrato, index) => {
								return (
									<tr
										key={contrato._id}
										onDoubleClick={() =>
											router.push(`/propiedades/${idPropiedad}/${contrato._id}`)
										}
										className="hover:bg-gray-100 transition-all cursor-pointer border-t-2 border-gray-200 p-2 text-center"
									>
										<td className={styles.td}>
											{fixedDate(contrato.fecha_inicio)}
										</td>
										<td className={styles.td}>
											{fixedDate(contrato.fecha_fin)}
										</td>
										<td className={styles.td}>{contrato.destino}</td>
										<td className={styles.td}>
											{contrato.estado == "Vigente" ? (
												<span className="flex gap-1 justify-center text-green-500 font-bold">
													Vigente
													<CheckSquare size={20} color="green" />
												</span>
											) : (
												<span className="flex gap-1 justify-center">
													{contrato.estado}
													<Ban size={20} />
												</span>
											)}
										</td>
										<td className={styles.td}>
											{contrato.saldo == 0 ? (
												<span className="text-green-500 font-bold flex justify-center gap-1">
													Todo pago
													<CircleDollarSign size={20} color="green" />
												</span>
											) : (
												<span className="text-red-500 font-bold flex justify-center gap-1">
													{parseFloat(contrato.saldo).toFixed(2)}
													{" " + contrato.moneda}
													<CircleDollarSign size={20} color="red" />
												</span>
											)}
										</td>
									</tr>
								);
							})
						) : (
							<tr>
								<td colSpan="5" className="text-red-500">
									No hay contratos
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
	td: "p-2",
	label: "block font-bold",
};
