import React, { useState } from "react";
import { fixedDate } from "@/app/utils/utils";
import { Trash, X, Check } from "lucide-react";
import BusquedaInteligente from "@/classes/BusquedaIntelegente";

const BusquedaInfo = ({ busqueda }) => {
	const [confirmar, setConfirmar] = useState(false);
	const [envio, setEnvio] = useState({
		loading: false,
		error: false,
		sent: false,
	});
	console.log("Busqueda:", busqueda);

	const handleDelete = () => {
		BusquedaInteligente.eliminarBusqueda(busqueda._id, setEnvio).finally(() => {
			console.log("Busqueda eliminada");
		});
	};

	if (envio.loading) {
		return <p>Eliminando...</p>;
	}

	if (envio.sent) {
		return null;
	}

	if (busqueda === undefined) return null;

	return (
		<div className="gap-2 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 hover:shadow-lg">
			<div className="flex justify-between gap-2">
				<h1 className="text-xl font-bold text-gray-700 dark:text-gray-200 mb-4">
					{`Interesado en `}
					<span className=" underline underline-offset-2">
						{busqueda?.operacion}
					</span>
					{` de `}
					<span className=" underline underline-offset-2">
						{busqueda?.tipo_propiedad}
					</span>
					{` en `}
					<span className=" underline underline-offset-2">
						{busqueda?.localidad}
					</span>
				</h1>
				{!confirmar && (
					<button
						onClick={() => setConfirmar(true)}
						className="flex gap-2 bg-red-500 hover:bg-red-600 transition-all text-white px-4 py-2 rounded-md items-center justify-center"
					>
						<Trash size={20} />
					</button>
				)}
				{confirmar && (
					<div className="flex gap-2">
						<button
							onClick={() => setConfirmar(false)}
							className="flex gap-2 bg-red-500 hover:bg-red-600 transition-all text-white px-4 py-2 rounded-md items-center justify-center"
						>
							<X size={20} />
						</button>
						<button
							onClick={handleDelete}
							className="flex gap-2 bg-green-500 hover:bg-green-600 transition-all text-white px-4 py-2 rounded-md items-center justify-center"
						>
							<Check size={20} />
							Borrar
						</button>
					</div>
				)}
			</div>
			<div className="grid grid-cols-2 gap-4 py-2 ">
				<label className={styles.label}>
					Creada:
					<span className={styles.span}>{fixedDate(busqueda.createdAt)}</span>
				</label>
				{busqueda?.dimension_min && busqueda?.dimension_max && (
					<label className={styles.label}>
						Dimensiones:
						<span className={styles.span}>
							Entre {busqueda?.dimension_min}m&sup2; - {busqueda?.dimension_max}
							m&sup2;
						</span>
					</label>
				)}
				{busqueda?.monto_max && busqueda?.monto_min && busqueda?.moneda && (
					<label className={styles.label}>
						Precio:
						<span className={styles.span}>
							{busqueda?.monto_min} - {busqueda?.monto_max} {busqueda?.moneda}
						</span>
					</label>
				)}
				{busqueda?.ambientes && (
					<label className={styles.label}>
						Ambientes:
						<span className={styles.span}>{busqueda?.ambientes}</span>
					</label>
				)}
			</div>
			{busqueda?.observaciones && (
				<>
					<p className={styles.label}>Observaciones: </p>
					<p className={styles.span}>{busqueda?.observaciones}</p>
				</>
			)}
		</div>
	);
};

export default BusquedaInfo;

const styles = {
	label: "font-bold gap-1",
	span: "font-normal ml-1",
};
