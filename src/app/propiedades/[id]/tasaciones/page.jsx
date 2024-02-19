"use client";
import React, { useState, useEffect } from "react";
import TasacionInfo from "@/components/TasacionInfo/page";
import TasacionForm from "@/components/TasacionForm/page";
import Tasacion from "@/classes/Tasacion";
import Link from "next/link";
import { PlusCircle, ChevronLeft } from "lucide-react";

export default function TasacionInfoPage() {
	const [propiedadId, setPropiedadId] = useState(null);
	const [tasaciones, setTasaciones] = useState([]);
	const [tasacionEditar, setTasacionEditar] = useState(null);

	useEffect(() => {
		const id = window.location.pathname.split("/")[2];
		Tasacion.obtenerTasacionesPorPropiedad(id)
			.then((tasaciones) => {
				console.log(tasaciones);
				setTasaciones(tasaciones);
			})
			.catch((error) => {
				console.error(error);
			});
		setPropiedadId(id);
	}, []);

	return (
		<div className="flex flex-1 flex-col justify-center items-center bg-[#E8EFFF] pt-4 gap-2 h-full">
			<div
				className={
					"grid grid-cols-2 gap-2 " +
					(tasaciones.length === 0 && " h-32 font-bold")
				}
			>
				<Link
					href={`/propiedades/${propiedadId}/tasaciones/crear`}
					className={
						"bg-green-500 hover:bg-green-600 transition-all text-white px-4 py-2 rounded-md cursor-pointer flex justify-center items-center gap-2 " +
						(!tasaciones && " animate-pulse")
					}
				>
					<PlusCircle size={20} />
					<span>Crear tasación</span>
				</Link>
				<Link
					href={`/propiedades/${propiedadId}`}
					className="bg-blue-400 hover:bg-blue-600 transition-all text-white px-4 py-2 rounded-md cursor-pointer flex justify-center items-center gap-2"
				>
					<ChevronLeft size={20} />
					<span>Volver a propiedad</span>
				</Link>
			</div>
			<div className="grid grid-cols-2 gap-2">
				{tasaciones &&
					tasaciones.map((tasacion) => {
						return (
							<TasacionInfo
								key={tasacion._id}
								tasacion={tasacion}
								setEditar={setTasacionEditar}
								editandoEste={tasacionEditar?._id === tasacion._id}
							/>
						);
					})}
			</div>
			{tasacionEditar && (
				<TasacionForm propiedadId={propiedadId} tasacion={tasacionEditar} />
			)}
		</div>
	);
}
