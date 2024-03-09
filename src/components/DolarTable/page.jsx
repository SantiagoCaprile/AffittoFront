import React from "react";
import { useState, useEffect } from "react";
import { fixedDate } from "@/app/utils/utils";

export default function DolarTable() {
	const [dolar, setDolar] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const dolar = await fetch("https://dolarapi.com/v1/dolares").then((res) =>
				res.json()
			);
			setDolar(dolar);
		}
		fetchData();
	}, []);

	if (!dolar || !dolar?.length) return <p>Cotizaciones no disponibles</p>;

	return (
		<div className="min-w-[500px]">
			<table className="table-auto w-full">
				<thead className="font-bold">
					<tr className="bg-blue-500 text-white">
						<th>Nombre</th>
						<th>Compra</th>
						<th>Venta</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-gray-200 pt-4">
					{dolar &&
						dolar.map((dolar) => (
							<tr key={dolar.casa} className="hover:bg-gray-100 p-2">
								<td className="p-2">
									{dolar.nombre === "Contado con liquidación"
										? "CCL"
										: dolar.nombre}
								</td>
								<td className="text-center p-2">$ {dolar.compra}</td>
								<td className="text-center p-2">$ {dolar.venta}</td>
							</tr>
						))}
				</tbody>
			</table>
			<p className="pt-4 italic text-xs">
				Última actualización:
				{dolar?.length &&
					" " +
						fixedDate(dolar[0].fechaActualizacion) +
						" " +
						new Date(dolar[0].fechaActualizacion).toLocaleTimeString()}
			</p>
			<p className="italic text-xs">
				Fuente:{" "}
				<a
					href="https://dolarhoy.com"
					target="_blank"
					rel="noreferrer"
					className="text-blue-500"
				>
					DolarHoy.com
				</a>
			</p>
		</div>
	);
}
