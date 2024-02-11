import React from "react";
import { fixedDate } from "@/app/utils/utils";

const OperacionInfo = ({ operacion, onClick }) => {
	return (
		<button
			className="flex flex-col justify-center items-center gap-2 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 hover:shadow-lg"
			onClick={onClick ? onClick : () => {}}
		>
			<h1 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-4">
				{operacion?.tipo}
			</h1>
			<div>
				<label className="font-bold">Monto:</label>
				<span className="flex">
					{operacion?.moneda === "USD" ? "U$S" : "$"} {operacion?.monto}
				</span>
			</div>
			<div>
				<label className="block font-bold">Observaciones:</label>
				<span>{operacion?.observaciones}</span>
			</div>
			<div>
				<label className="block font-bold">Fecha:</label>
				<span>{fixedDate(operacion?.fecha)}</span>
			</div>
		</button>
	);
};

export default OperacionInfo;
