"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Contrato from "@/classes/Contrato";
import { fixedDate } from "@/app/utils/utils";
import Link from "next/link";
import { Pencil, ChevronLeft, CheckSquare, Ban, XSquare } from "lucide-react";
import { mostrarMontoSeparado } from "@/app/utils/utils";
import CargarPago from "@/components/CargarPago/page";

export default function InfoContratoPage() {
	const router = useRouter();
	const [contrato, setContrato] = useState({});
	const [saldo, setSaldo] = useState(0.0);

	useEffect(() => {
		const _id = document.location.pathname.split("/")[3];
		async function fetchData() {
			const contrato = await Contrato.buscarContrato(_id);
			setContrato(contrato);
			setSaldo(
				contrato.pagos.reduce((acc, pago) => acc + pago.monto, 0) -
					contrato.comision_celebracion
			);
		}
		fetchData();
	}, [saldo]);

	const handleRescindir = () => {
		if (confirm("¿Está seguro que desea rescindir el contrato?")) {
			//Contrato.rescindir();
			alert("Contrato rescindido");
		}
	};

	if (!contrato?._id) {
		return <div>Cargando...</div>;
	}

	return (
		<div className="flex flex-1 justify-center items-center bg-[#E8EFFF] pt-4 gap-2">
			<div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-[1200px] w-2/3 flex flex-col gap-4">
				<div className="flex justify-between">
					<h2 className="text-2xl font-bold mb-4">Información de Contrato</h2>
					<div className="flex justify-end gap-2">
						<Link
							href={`/propiedades/${contrato.propiedad?._id}/${contrato._id}/editar`}
							className="flex gap-2 bg-blue-500 hover:bg-blue-600 transition-all text-white px-4 py-2 rounded-md items-center justify-center"
						>
							<Pencil size={20} />
							Editar
						</Link>
						<Link
							href={`/propiedades/${contrato.propiedad?._id}/contratos`}
							className="flex gap-2 bg-blue-300 hover:bg-blue-500 transition-all text-white px-4 py-2 rounded-md items-center justify-center"
						>
							<ChevronLeft size={20} />
							Volver a Contratos
						</Link>
					</div>
				</div>
				<div className="flex justify-around mb-2">
					{Object.entries(contrato.propiedad?.domicilio).map(([key, value]) => (
						<div key={key}>
							<span className="font-bold">
								{key[0].toUpperCase() + key.slice(1)}:{" "}
							</span>
							<span>{value}</span>
						</div>
					))}
				</div>
				<table className="w-full text-m text-left text-gray-500 dark:text-gray-400">
					<thead className="text-m text-gray-700 p-1 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
						<tr className=" bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
							<th className={styles.th}>Nombre/Razón Social</th>
							<th className={styles.th}>CUIT/CUIL</th>
							<th className={styles.th}>Celular</th>
							<th className={styles.th}>E-Mail</th>
							<th className={styles.th}>Condición</th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
						{contrato.locatario && (
							<tr
								key={contrato.locatario._id}
								className={styles.tr}
								onDoubleClick={() =>
									router.push(`/clientes/${contrato.locatario.cuit}`)
								}
							>
								<td className={styles.td}>
									{contrato.locatario.nombre_razon_social}
								</td>
								<td className={styles.td}>{contrato.locatario.cuit}</td>
								<td className={styles.td}>{contrato.locatario.celular}</td>
								<td className={styles.td}>{contrato.locatario.email}</td>
								<td className={styles.td}>Locatario</td>
							</tr>
						)}
						{contrato.propiedad.propietario && (
							<tr
								key={contrato.propiedad.propietario._id}
								className={styles.tr}
								onDoubleClick={() =>
									router.push(
										`/clientes/${contrato.propiedad.propietario.cuit}`
									)
								}
							>
								<td className={styles.td}>
									{contrato.propiedad.propietario.nombre_razon_social}
								</td>
								<td className={styles.td}>
									{contrato.propiedad.propietario.cuit}
								</td>
								<td className={styles.td}>
									{contrato.propiedad.propietario.celular}
								</td>
								<td className={styles.td}>
									{contrato.propiedad.propietario.email}
								</td>
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
					<div className="mb-2 grid">
						<span className="font-bold">Fecha Inicio: </span>
						<span>{fixedDate(contrato.fecha_inicio)}</span>
					</div>
					<div className="mb-2 grid">
						<span className="font-bold">Fecha Fin: </span>
						<span>{fixedDate(contrato.fecha_fin)}</span>
					</div>
					<div className="mb-2">
						<span className="font-bold">Comision Celebración: </span>
						<span>
							{contrato.comision_celebracion}
							{contrato.moneda}
						</span>
					</div>
					<div className="mb-2 grid">
						<span className="font-bold">Fecha de Creación: </span>
						<span>
							{fixedDate(contrato.createdAt) +
								" - " +
								contrato.createdAt.split("T")[1].split(".")[0]}
						</span>
					</div>
					<div className="mb-2 grid">
						<span className="font-bold">Fecha de Modificación: </span>
						<span>
							{fixedDate(contrato.updatedAt) +
								" - " +
								contrato.updatedAt.split("T")[1].split(".")[0]}
						</span>
					</div>
					<div className="mb-2">
						<span className="font-bold">Saldo: </span>
						{saldo && saldo >= 0 ? (
							<span className="text-green-500">
								{mostrarMontoSeparado(saldo)} {contrato.moneda}
							</span>
						) : (
							<span className="text-red-500">
								{mostrarMontoSeparado(saldo)} {contrato.moneda}
							</span>
						)}
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
				</div>
				<CargarPago
					forzarUpdate={(montoPago) => {
						setSaldo(saldo + montoPago);
					}}
				/>
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
