import React from "react";
import { fixedDate } from "@/app/utils/utils";
import { Pencil, Trash } from "lucide-react";

const TasacionInfo = ({ tasacion, setEditar }) => {
	return (
		<div className="gap-2 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 hover:shadow-lg">
			<div className="flex justify-between">
				<h1 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-4">
					Tasación
				</h1>
				<div className="flex gap-2">
					<button
						onClick={() => setEditar(true)}
						className="flex gap-2 bg-blue-500 hover:bg-blue-600 transition-all text-white px-4 py-2 rounded-md items-center justify-center"
					>
						<Pencil size={20} />
					</button>
					<button
						onClick={() => console.log("Eliminar tasación")}
						className="flex gap-2 bg-red-500 hover:bg-red-600 transition-all text-white px-4 py-2 rounded-md items-center justify-center"
					>
						<Trash size={20} />
					</button>
				</div>
			</div>
			<div className="grid grid-cols-2 gap-4 py-2 ">
				<label className={styles.label}>
					Fecha de visita:
					<span className={styles.span}>
						{
							tasacion?.fecha_visita
							// fixedDate(tasacion?.fecha_visita)
						}
					</span>
				</label>
				<label className={styles.label}>
					Fecha de tasación:
					<span className={styles.span}>
						{
							tasacion?.fecha_tasacion
							// fixedDate(tasacion?.fecha_tasacion)
						}
					</span>
				</label>
				<label className={styles.label + " flex"}>
					Monto:
					<span className="font-medium">
						{tasacion?.moneda === "USD" ? "U$S" : "$"} {tasacion?.valor}
					</span>
				</label>
				<label className={styles.label}>
					Motivo:
					<span className={styles.span}>{tasacion?.motivo}</span>
				</label>
				<label className={styles.label}>
					Antiguedad:
					<span className={styles.span}>{tasacion?.antiguedad}</span>
				</label>
				<label className={styles.label}>
					Nombre del tasador:
					<span className={styles.span}>{tasacion?.nombre_tasador}</span>
				</label>
				<label className={styles.label}>
					Matrícula: <span className={styles.span}>{tasacion?.matricula}</span>
				</label>
			</div>
			<label className={styles.label + " flex flex-col"}>
				Observaciones:
				<p className={styles.span}>{tasacion?.observaciones}</p>
			</label>
		</div>
	);
};

export default TasacionInfo;

const styles = {
	label: "font-bold gap-1",
	span: "font-normal ml-1",
};
