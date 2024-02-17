import React from "react";
import { fixedDate } from "@/app/utils/utils";
import { Trash } from "lucide-react";

const BusquedaInfo = ({ busqueda }) => {
	return (
		<div className="gap-2 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 hover:shadow-lg">
			<div className="flex justify-between gap-2">
				<h1 className="text-xl font-bold text-gray-700 dark:text-gray-200 mb-4">
					Interesado en {busqueda.operacion} de {busqueda.tipo} en{" "}
					{busqueda.localidad}
				</h1>
				<button
					onClick={() => console.log("Eliminar busqueda")}
					className="flex gap-2 bg-red-500 hover:bg-red-600 transition-all text-white px-4 py-2 rounded-md items-center justify-center"
				>
					<Trash size={20} />
				</button>
			</div>
			<div className="flex flex-col gap-4 py-2 ">
				<label className={styles.label}>
					Dimensiones:
					<span className={styles.span}>
						Entre {busqueda.dimension.min}m2 - {busqueda.dimension.max}m2
					</span>
				</label>
				<label className={styles.label}>
					Precio:
					<span className={styles.span}>
						{busqueda.precio.min} - {busqueda.precio.max} {busqueda.moneda}
					</span>
				</label>
				<label className={styles.label}>
					Ambientes:
					<span className={styles.span}>{busqueda.ambientes}</span>
				</label>
			</div>
		</div>
	);
};

export default BusquedaInfo;

const styles = {
	label: "font-bold gap-1",
	span: "font-normal ml-1",
};
