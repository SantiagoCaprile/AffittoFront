"use client";
import React from "react";
import NextImage from "next/image";
import { Pencil, ChevronLeft, CalendarPlus, X } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Cliente from "@/classes/Cliente";
import BusquedaInteligente from "@/classes/BusquedaIntelegente";
import BusquedaInfo from "@/components/BusquedaInfo/page";
import BusquedaNueva from "@/components/BusquedaNueva/page";
import { useRouter } from "next/navigation";
import { formatearCuit } from "@/app/utils/utils";

const InfoClientePage = () => {
	const router = useRouter();
	const [cliente, setCliente] = useState({});
	const [busquedas, setBusquedas] = useState([]);
	const [nuevaBusqueda, setNuevaBusqueda] = useState(false);
	useEffect(() => {
		const cuit = document.location.pathname.split("/")[2];
		async function fetchData() {
			const cliente = await Cliente.buscarCliente(cuit);
			const busquedasDelCliente =
				await BusquedaInteligente.obtenerBusquedasDelCliente(cliente._id);
			setBusquedas(busquedasDelCliente);
			setCliente(cliente);
		}
		fetchData();
	}, []);

	const updateBusquedas = async () => {
		const busquedasDelCliente =
			await BusquedaInteligente.obtenerBusquedasDelCliente(cliente._id);
		setBusquedas(busquedasDelCliente);
		setNuevaBusqueda(false);
	};

	return (
		<div className="flex flex-1 flex-col justify-center items-center bg-[#E8EFFF] p-4">
			<div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-[800px] w-2/3">
				<div className="flex justify-between mb-4">
					<h2 className="text-2xl font-bold mb-4">Información del Cliente</h2>
					<button
						className="flex gap-2 bg-blue-500 hover:bg-blue-600 transition-all text-white px-4 py-2 rounded-md items-center justify-center"
						onClick={() => {
							router.push(`/crearCliente/${cliente.cuit}`);
						}}
					>
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
						<label className="block font-bold">Nombre: </label>
						<div className="mb-2 w-1/2">
							<span>{cliente.nombre_razon_social}</span>
						</div>
						<div className="mb-2 w-1/2">
							<label className="block font-bold">CUIT/CUIL:</label>
							<span>{formatearCuit(cliente.cuit)}</span>
						</div>
						<div className="mb-2 w-1/2">
							<label className="block font-bold">Domicilio:</label>
							<span>
								{(cliente.domicilio?.calle ?? "") +
									" " +
									(cliente.domicilio?.altura ?? "") +
									" " +
									(cliente.domicilio?.piso ?? "") +
									" " +
									(cliente.domicilio?.dpto ?? "")}
							</span>
						</div>
						<div className="mb-2 w-1/2">
							<label className="block font-bold">Localidad:</label>
							<span>{cliente.domicilio?.localidad}</span>
						</div>
						<div className="mb-2 w-1/2">
							<label className="block font-bold">Email:</label>
							<span>
								<a href={`mailto:${cliente.email}`} className="text-blue-500">
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
						<tr className="bg-gray-200">
							<th>Tipo</th>
							<th>Propiedad</th>
							<th>Localidad</th>
							<th>Estado</th>
							<th>Rol</th>
						</tr>
					</thead>
					{
						<tbody className="divide-y divide-gray-200">
							{cliente.propiedades?.map((propiedad, index) => (
								<tr
									className="cursor-pointer hover:bg-gray-100 transition-all p-2 text-center"
									key={index}
									onDoubleClick={() =>
										router.push(`/propiedades/${propiedad.id._id}`)
									}
								>
									<td>{propiedad.id.tipo}</td>
									<td>
										{propiedad.id.domicilio.calle +
											" " +
											propiedad.id.domicilio.altura}
									</td>
									<td>{propiedad.id.domicilio.localidad}</td>
									<td>{propiedad.id.estado}</td>
									<td>{propiedad.rol}</td>
								</tr>
							))}
							{cliente.propiedades?.length === 0 && (
								<tr>
									<td colSpan="4" className="text-center text-red-500">
										No hay propiedades asociadas a este cliente
									</td>
								</tr>
							)}
						</tbody>
					}
				</table>
			</div>
			<div className="shadow-md rounded px-8 pb-8 mb-4 max-w-[1000px] w-fit bg-white">
				<h1 className="text-2xl font-bold pt-4 w-fit">
					Busquedas Inteligentes
				</h1>
				{busquedas &&
					busquedas.map((busqueda, index) => (
						<BusquedaInfo key={index} busqueda={busqueda} />
					))}
				<div
					className={
						!nuevaBusqueda ? "flex justify-center " : "flex justify-end"
					}
				>
					{!nuevaBusqueda && (
						<button
							onClick={() => setNuevaBusqueda(true)}
							className="bg-blue-500 hover:bg-blue-600 transition-all text-white px-4 py-2 rounded-md items-center justify-center"
						>
							<CalendarPlus size={20} />
							Nueva Busqueda
						</button>
					)}
					{nuevaBusqueda && (
						<button
							onClick={() => setNuevaBusqueda(false)}
							className="bg-red-500 hover:bg-red-600 transition-all text-white px-4 py-2 rounded-md items-center justify-center"
						>
							<X size={20} />
						</button>
					)}
				</div>
				{nuevaBusqueda && (
					<BusquedaNueva
						clienteId={cliente._id}
						updateBusquedas={() => updateBusquedas()}
					/>
				)}
			</div>
		</div>
	);
};

export default InfoClientePage;
