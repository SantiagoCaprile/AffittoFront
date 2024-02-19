"use client";
import React, { useState } from "react";
import { fixedDate } from "@/app/utils/utils";
import { Pencil, Trash, X, Check } from "lucide-react";
import Tasacion from "@classes/Tasacion";

export default function TasacionInfo({ tasacion, setEditar, editandoEste }) {
	const [eliminando, setEliminando] = useState({
		confirming: false,
		success: false,
	});

	const handleEliminar = async () => {
		Tasacion.borrarTasacion(tasacion._id)
			.then((response) => {
				setEliminando({ confirming: false, success: true });
			})
			.catch((error) => {
				setEliminando({ confirming: false, success: false });
				console.error(error);
			});
	};

	if (eliminando.success) {
		return null;
	}

	return (
		<div
			className={
				"gap-2 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 hover:shadow-lg" +
				(editandoEste && " animate-pulse border-2 border-blue-500")
			}
		>
			<div className="flex justify-between">
				<h1 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-4">
					Tasación
				</h1>
				<div className="flex gap-2">
					{!editandoEste && (
						<button
							onClick={() => setEditar(tasacion)}
							className="flex gap-2 bg-blue-500 hover:bg-blue-600 transition-all text-white px-4 py-2 rounded-md items-center justify-center"
						>
							<Pencil size={20} />
						</button>
					)}
					{editandoEste && (
						<button
							onClick={() => setEditar(null)}
							className="flex gap-2 bg-orange-500 hover:bg-orange-600 transition-all text-white px-4 py-2 rounded-md items-center justify-center"
						>
							<X size={20} />
						</button>
					)}
					{!eliminando.confirming && (
						<button
							onClick={() =>
								setEliminando({ confirming: true, success: false })
							}
							className="flex gap-2 bg-red-500 hover:bg-red-600 transition-all text-white px-4 py-2 rounded-md items-center justify-center"
						>
							<Trash size={20} />
						</button>
					)}
					{eliminando.confirming && (
						<div className="flex gap-2">
							<button
								onClick={() =>
									setEliminando({ confirming: false, success: false })
								}
								className="flex gap-2 bg-red-500 hover:bg-red-600 transition-all text-white px-4 py-2 rounded-md items-center justify-center"
							>
								<X size={20} />
								Cancelar
							</button>
							<button
								onClick={handleEliminar}
								className="flex gap-2 bg-green-500 hover:bg-green-600 transition-all text-white px-4 py-2 rounded-md items-center justify-center"
							>
								<Check size={20} />
								Borrar
							</button>
						</div>
					)}
				</div>
			</div>
			<div className="grid grid-cols-2 gap-4 py-2 ">
				{tasacion.motivo && (
					<label className={styles.label}>
						Motivo:
						<span className={styles.span}>
							{tasacion?.motivo.toUpperCase()}
						</span>
					</label>
				)}
				{tasacion.fecha_visita && (
					<label className={styles.label}>
						Fecha de visita:
						<span className={styles.span}>
							{fixedDate(tasacion?.fecha_visita)}
						</span>
					</label>
				)}
				{tasacion.fecha_tasacion && (
					<label className={styles.label}>
						Fecha de tasación:
						<span className={styles.span}>
							{fixedDate(tasacion?.fecha_tasacion)}
						</span>
					</label>
				)}
				{tasacion.moneda && (
					<label className={styles.label + " flex"}>
						Monto:
						<span className="font-medium">
							{tasacion?.moneda === "USD" ? "U$S" : "$"} {tasacion?.valor}
						</span>
					</label>
				)}
				{tasacion.antiguedad && (
					<label className={styles.label}>
						Antiguedad:
						<span className={styles.span}>
							{tasacion?.antiguedad}
							{tasacion.antiguedad != "A estrenar" && " años"}
						</span>
					</label>
				)}
				{tasacion.tasador_nombre && (
					<label className={styles.label}>
						Nombre del tasador:
						<span className={styles.span}>{tasacion?.tasador_nombre}</span>
					</label>
				)}
				{tasacion.tasador_matricula && (
					<label className={styles.label}>
						Matrícula:
						<span className={styles.span}>{tasacion?.tasador_matricula}</span>
					</label>
				)}
				{tasacion.tasador_telefono && (
					<label className={styles.label}>
						Teléfono del tasador:
						<span className={styles.span}>{tasacion?.tasador_telefono}</span>
					</label>
				)}
			</div>
			<label className={styles.label + " flex flex-col"}>
				Observaciones:
				<p className={styles.span}>{tasacion?.observaciones}</p>
			</label>
		</div>
	);
}

const styles = {
	label: "font-bold gap-1",
	span: "font-normal ml-1",
};
