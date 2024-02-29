import React from "react";
import { CheckSquare, XSquare } from "lucide-react";
import { fixedDate } from "@/app/utils/utils";
import { useState } from "react";
import Propiedad from "@/classes/Propiedad";

export default function SeniaInfo({ senia }) {
	const [confirmar, setConfirmar] = useState(false);
	const [envio, setEnvio] = useState({
		loading: false,
		error: false,
		sent: false,
	});
	const arrepentirse = async () => {
		console.log(senia._id);
		await Propiedad.arrepentirseSenia(senia._id, setEnvio);
	};

	if (envio.sent) {
		return (
			<div className="flex justify-center items-center flex-col w-full">
				<h2 className="text-2xl font-bold text-green-700">
					Seña cancelada con éxito
				</h2>
			</div>
		);
	}
	return (
		<div
			className={
				"bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-[800px] w-2/3 flex flex-col justify-center gap-4" +
				(!senia.vigente && " opacity-80 bg-slate-500 pointer-events-none w-fit")
			}
		>
			<h2 className="text-2xl font-bold">Seña</h2>
			<div className="grid grid-cols-2 gap-4">
				<div className="flex flex-col">
					<label className="text-sm font-bold">Fecha</label>
					<p>{fixedDate(senia.fecha)}</p>
				</div>
				<div className="flex flex-col">
					<label className="text-sm font-bold">Monto</label>
					<p>
						{senia.monto} {senia.moneda}
					</p>
				</div>
				<div className="flex flex-col">
					<label className="text-sm font-bold">Estado</label>
					<div className="flex items-center gap-1">
						{senia.vigente ? (
							<CheckSquare size={20} color="green" />
						) : (
							<XSquare size={20} color="red" />
						)}
						<p>{senia.vigente ? "Vigente" : "Vencida/Cancelada"}</p>
					</div>
				</div>
				<div className="flex flex-col">
					<label className="text-sm font-bold">Valida hasta</label>
					<p>{fixedDate(senia.validaHasta)}</p>
				</div>
				<div className="flex flex-col">
					<label className="text-sm font-bold">Cliente</label>
					<p>{senia.cliente.nombre_razon_social}</p>
				</div>
				<div className="flex flex-col">
					<label className="text-sm font-bold">CUIT</label>
					<p>{senia.cliente.cuit}</p>
				</div>
			</div>
			{!confirmar ? (
				<button
					className="bg-red-500 hover:bg-red-600 transition-all text-white px-4 py-2 rounded-md items-center justify-center"
					onClick={() => setConfirmar(true)}
				>
					Arrepentirse
				</button>
			) : (
				<div className="flex gap-2 items-center justify-center w-full">
					<p className="font-bold">¿Confirmar acción?</p>
					<button
						className="bg-red-500 hover:bg-red-600 transition-all text-white px-4 py-2 rounded-md items-center justify-center"
						onClick={() => arrepentirse(senia._id)}
					>
						Sí
						<CheckSquare size={20} color="white" />
					</button>
					<button
						className="bg-green-500 hover:bg-green-600 transition-all text-white px-4 py-2 rounded-md items-center justify-center"
						onClick={() => setConfirmar(false)}
					>
						No
						<XSquare size={20} color="white" />
					</button>
				</div>
			)}
			{envio.error && (
				<p className="text-red-500">
					Error al cancelar la seña, intentelo mas tarde
				</p>
			)}
			{envio.loading && <p className="text-green-500">Cargando...</p>}
		</div>
	);
}
