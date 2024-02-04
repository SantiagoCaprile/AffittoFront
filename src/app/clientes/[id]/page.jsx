"use client";
import React from "react";
import NextImage from "next/image";
import { Pencil, ChevronLeft } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

const buscarCliente = async (cuit) => {
	const response = await fetch(`http://localhost:3000/api/v1/clientes/${cuit}`)
		.then((response) => response.json())
		.then((data) => data.data);
	return response;
};

const InfoClientePage = () => {
	const [cliente, setCliente] = useState({});

	useEffect(() => {
		const cuit = document.location.pathname.split("/")[2];
		async function fetchData() {
			const cliente = await buscarCliente(cuit);
			setCliente(cliente);
		}
		fetchData();
	}, []);

	return (
		<div className="flex flex-1 justify-center items-center bg-[#E8EFFF] p-4">
			<div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-[800px] w-2/3">
				<div className="flex justify-between mb-4">
					<h2 className="text-2xl font-bold mb-4">Información del Cliente</h2>
					<button className="flex gap-2 bg-blue-500 hover:bg-blue-600 transition-all text-white px-4 py-2 rounded-md items-center justify-center">
						<Pencil size={20} />
						Actualizar Datos
					</button>
					<Link
						href="/clientes"
						className="flex gap-2 bg-blue-300 hover:bg-blue-500 transition-all text-white px-4 py-2 rounded-md items-center justify-center"
					>
						<ChevronLeft size={20} />
						Volver
					</Link>
				</div>
				<div className="flex gap-4 items-start">
					<NextImage
						src="/images/user.jpg"
						alt={"user"}
						width={200}
						height={200}
						className="rounded-lg"
						style={{ objectFit: "cover" }}
					/>
					<div className="flex flex-wrap">
						<label className="block font-bold">Nombre:</label>
						<div className="mb-2 w-1/2">
							<span>{cliente.nombre_razon_social}</span>
						</div>
						<div className="mb-2 w-1/2">
							<label className="block font-bold">CUIT/CUIL:</label>
							<span>{cliente.cuit}</span>
						</div>
						<div className="mb-2 w-1/2">
							<label className="block font-bold">Domicilio:</label>
							<span>
								{cliente.domicilio?.calle +
									" " +
									cliente.domicilio?.altura +
									" " +
									cliente.domicilio?.piso +
									" " +
									cliente.domicilio?.dpto}
							</span>
						</div>
						<div className="mb-2 w-1/2">
							<label className="block font-bold">Localidad:</label>
							<span>{cliente.domicilio?.localidad}</span>
						</div>
						<div className="mb-2 w-1/2">
							<label className="block font-bold">Email:</label>
							<span>
								<a href="mailto:john@affitto.com" className="text-blue-500">
									{cliente.email}
								</a>
							</span>
						</div>
						<div className="mb-2 w-1/2">
							<label className="block font-bold">Celular:</label>
							<span>{cliente.celular}</span>
						</div>
						<div className="mb-2 w-1/2">
							<label className="block font-bold">Telefono:</label>
							<span>{cliente.telefono}</span>
						</div>
						<div className="mb-2 w-1/2">
							<label className="block font-bold">
								Condición frente al IVA:
							</label>
							<span>{cliente.condicion_iva}</span>
						</div>
					</div>
				</div>
				<hr className="my-4" />
				<table className="w-full mt-4">
					<thead>
						<tr>
							<th>Propiedad</th>
							<th>Localidad</th>
							<th>Operación</th>
							<th>Estado</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Casa 3 dormitorios</td>
							<td>Springfield</td>
							<td>Alquiler</td>
							<td>Disponible</td>
						</tr>
						<tr>
							<td>Departamento 2 dormitorios</td>
							<td>Shelbyville</td>
							<td>Venta</td>
							<td>Reservada</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default InfoClientePage;
