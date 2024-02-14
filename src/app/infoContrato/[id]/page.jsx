"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Contrato from "@/classes/Contrato";
import Link from "next/link";
import {
	Pencil,
	ChevronLeft,
	CheckSquare,
	Ban,
	XSquare,
	DollarSign,
} from "lucide-react";
import { mostrarMontoSeparado } from "@/app/utils/utils";

const contratoEjemplo = {
	_id: "1234567890",
	destino: "Vivienda",
	fecha_inicio: "2021-10-01",
	fecha_fin: "2022-10-01",
	monto: 20000,
	moneda: "ARS",
	comision_celebracion: "200 ARS",
	observaciones:
		"Solo se aceptan pagos en efectivo, no se aceptan mascotas, no se aceptan niños. Solo se aceptan pagos en efectivo, no se aceptan mascotas, no se aceptan niños. Solo se aceptan pagos en efectivo, no se aceptan mascotas, no se aceptan niños.",
	estado: "Vigente", //Vigente, Caducado, Rescindido
	fecha_creacion: "2021-10-01",
	fecha_modificacion: "2021-10-01",
	propiedad: {
		_id: "1234567890",
		domicilio: "Calle Falsa 123",
		localidad: "Rosario",
		tipo_propiedad: "Casa",
		superficie: 100,
		descripcion: "Descripcion",
		precio: 20000,
		estado_actual: "Disponible",
	},
	locador: {
		_id: "1234567890",
		nombre_razon_social: "Esteban Quito",
		cuit: "20-12345678-9",
		celular: "1234567890",
		email: "example@gmail.com",
	},
	garantes: [
		{
			_id: "1234567890",
			nombre_razon_social: "Tuki Tuki",
			cuit: "16415555551",
			celular: "1234567890",
			email: "example@gmail.com",
		},
	],
	propietario: {
		_id: "1234567890",
		nombre_razon_social: "Tucson",
		cuit: "20-12345678-9",
		celular: "1234567890",
		email: "example@gmail.com",
	},
};

export default function InfoContratoPage() {
	const router = useRouter();
	const [contrato, setContrato] = useState({});

	useEffect(() => {
		const _id = document.location.pathname.split("/")[2];
		async function fetchData() {
			//const contrato = await Contrato.buscarContrato(_id);
			setContrato(contratoEjemplo);
		}
		fetchData();
	}, []);

	const handleRescindir = () => {
		if (confirm("¿Está seguro que desea rescindir el contrato?")) {
			//Contrato.rescindir();
			alert("Contrato rescindido");
		}
	};

	const handlePagarCelebracion = () => {
		if (confirm("¿Está seguro que desea pagar la comisión de celebración?")) {
			//Contrato.pagarCelebracion();
			alert("Comisión de celebración pagada");
		}
	};

	return (
		<div className="flex flex-1 justify-center items-center bg-[#E8EFFF] pt-4 gap-2">
			<div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-[1200px] w-2/3 flex flex-col gap-4">
				<div className="flex justify-between">
					<h2 className="text-2xl font-bold mb-4">Información de Contrato</h2>
					<div className="flex justify-end gap-2">
						<Link
							href={"/contratos/editar"}
							className="flex gap-2 bg-blue-500 hover:bg-blue-600 transition-all text-white px-4 py-2 rounded-md items-center justify-center"
						>
							<Pencil size={20} />
							Editar
						</Link>
						<Link
							href={`/propiedades/${contrato.propiedad?._id}`}
							className="flex gap-2 bg-blue-300 hover:bg-blue-500 transition-all text-white px-4 py-2 rounded-md items-center justify-center"
						>
							<ChevronLeft size={20} />
							Volver a Propiedad
						</Link>
					</div>
				</div>
				<div className="flex justify-around mb-2">
					<div>
						<span className="font-bold">Domicilio: </span>
						<span>{contrato.propiedad?.domicilio}</span>
					</div>
					<div>
						<span className="font-bold">Localidad: </span>
						<span>{contrato.propiedad?.localidad}</span>
					</div>
					<div>
						<span className="font-bold">Tipo de Propiedad: </span>
						<span>{contrato.propiedad?.tipo_propiedad}</span>
					</div>
				</div>
				<table className="w-full text-m text-left text-gray-500 dark:text-gray-400">
					<thead className="text-m text-gray-700 p-1 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
						<tr className=" bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
							<th className={styles.th}>Nombre/Razon Social</th>
							<th className={styles.th}>CUIT/CUIL</th>
							<th className={styles.th}>Celular</th>
							<th className={styles.th}>E-Mail</th>
							<th className={styles.th}>Condicion</th>{" "}
						</tr>
					</thead>
					<tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
						{contrato.locador && (
							<tr
								key={contrato.locador._id}
								className={styles.tr}
								onDoubleClick={() =>
									router.push(`/clientes/${contrato.locador.cuit}`)
								}
							>
								<td className={styles.td}>
									{contrato.locador.nombre_razon_social}
								</td>
								<td className={styles.td}>{contrato.locador.cuit}</td>
								<td className={styles.td}>{contrato.locador.celular}</td>
								<td className={styles.td}>{contrato.locador.email}</td>
								<td className={styles.td}>Locador</td>
							</tr>
						)}
						{contrato.propietario && (
							<tr
								key={contrato.propietario._id}
								className={styles.tr}
								onDoubleClick={() =>
									router.push(`/clientes/${contrato.propietario.cuit}`)
								}
							>
								<td className={styles.td}>
									{contrato.propietario.nombre_razon_social}
								</td>
								<td className={styles.td}>{contrato.propietario.cuit}</td>
								<td className={styles.td}>{contrato.propietario.celular}</td>
								<td className={styles.td}>{contrato.propietario.email}</td>
								<td className={styles.td}>Propietario</td>
							</tr>
						)}
						{contrato.garantes &&
							contrato.garantes.map((garante) => (
								<tr
									key={garante._id}
									className={styles.tr}
									onDoubleClick={() => router.push(`/clientes/${garante.cuit}`)}
								>
									<td className={styles.td}>{garante.nombre_razon_social}</td>
									<td className={styles.td}>{garante.cuit}</td>
									<td className={styles.td}>{garante.celular}</td>
									<td className={styles.td}>{garante.email}</td>
									<td className={styles.td}>Garante</td>
								</tr>
							))}
					</tbody>
				</table>
				<div className="grid grid-cols-3 gap-3">
					<div className="mb-2">
						<span className="font-bold">Destino: </span>
						<span>{contrato.destino}</span>
					</div>
					<div className="mb-2">
						<span className="font-bold">Monto: </span>
						<span>
							{mostrarMontoSeparado(contrato.monto) + " " + contrato.moneda}
						</span>
					</div>
					<div className="mb-2 flex gap-1">
						<span className="font-bold">Estado: </span>
						{contrato.estado === "Vigente" && (
							<span className="flex gap-1">
								Vigente
								<CheckSquare size={20} color="green" />
							</span>
						)}
						{contrato.estado === "Caducado" && (
							<span className="flex gap-1">
								Caducado
								<XSquare size={20} color="red" />
							</span>
						)}
						{contrato.estado === "Rescindido" && (
							<span className="flex gap-1">
								Rescindido
								<Ban size={20} color="red" />
							</span>
						)}
					</div>
					<div className="mb-2">
						<span className="font-bold">Fecha Inicio: </span>
						<span>{contrato.fecha_inicio}</span>
					</div>
					<div className="mb-2">
						<span className="font-bold">Fecha Fin: </span>
						<span>{contrato.fecha_fin}</span>
					</div>
					<div className="mb-2">
						<span className="font-bold">Comision Celebracion: </span>
						<span>{contrato.comision_celebracion}</span>
					</div>
					<div className="mb-2">
						<span className="font-bold">Fecha de Creacion: </span>
						<span>{contrato.fecha_creacion}</span>
					</div>
					<div className="mb-2">
						<span className="font-bold">Fecha de Modificacion: </span>
						<span>{contrato.fecha_modificacion}</span>
					</div>
				</div>
				<div className="mb-2">
					<span className="font-bold">Observaciones: </span>
					<p>{contrato.observaciones}</p>
				</div>
				<div className="flex justify-end gap-2">
					<button
						disabled={contrato.estado !== "Vigente"}
						onClick={handleRescindir}
						className={
							"flex gap-2 transition-all text-white px-4 py-2 rounded-md items-center justify-center" +
							(contrato.estado !== "Vigente"
								? styles.disabledBtn
								: " bg-red-500 hover:bg-red-600")
						}
					>
						<Ban size={20} />
						Rescindir
					</button>
					<button
						disabled={contrato.estado !== "Vigente"}
						onClick={handlePagarCelebracion}
						className={
							"flex gap-2 transition-all text-white px-4 py-2 rounded-md items-center justify-center" +
							(contrato.estado !== "Vigente"
								? styles.disabledBtn
								: " bg-green-500 hover:bg-green-600")
						}
					>
						<DollarSign size={20} />
						Pagar Celebracion
					</button>
				</div>
			</div>
		</div>
	);
}

const styles = {
	tr: "hover:bg-gray-100",
	th: "py-3 px-5 uppercase",
	td: "w-4 p-4",
	disabledBtn: "cursor-not-allowed bg-gray-400",
};
