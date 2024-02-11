"use client";
import React from "react";
import { useForm } from "react-hook-form";
import Propiedad from "@/classes/Propiedad";

const OperacionNueva = ({ operacion, idProp, fuerzaUpdate }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			tipo: operacion ? operacion.tipo : "Alquiler",
			monto: operacion ? operacion.monto : "",
			moneda: operacion ? operacion.moneda : "ARS",
			observaciones: operacion ? operacion.observaciones : "",
		},
	});

	const onSubmit = (data) => {
		console.log(data, idProp);
		if (operacion._id) {
			console.log("editar operacion", operacion);
			Propiedad.editarOperacion(idProp, operacion._id, data)
				.then((res) => {
					console.log(res);
				})
				.then(() => {
					fuerzaUpdate();
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			console.log("agregar operacion");
			Propiedad.agregarOperacion(idProp, data)
				.then((res) => {
					console.log(res);
				})
				.then(() => {
					fuerzaUpdate();
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	return (
		<div className="flex flex-col bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
			<h1 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-4">
				{operacion._id ? "Editar Operación" : "Cargar Operación"}
			</h1>
			<form
				className="flex justify-center items-center flex-col w-full"
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="tipo"
					>
						Tipo de Operación
					</label>
					<select
						className={styles.inputs}
						name="tipo"
						{...register("tipo", {
							required: true,
							message: "Este campo es requerido",
						})}
					>
						<option defaultValue value="Alquiler">
							Alquiler
						</option>
						<option value="Venta">Venta</option>
					</select>
					{errors.tipo && (
						<p className="text-red-500 text-xs italic">{errors.tipo.message}</p>
					)}
				</div>
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="monto"
					>
						Monto
					</label>
					<input
						className={styles.inputs}
						type="number"
						placeholder="Monto"
						name="monto"
						{...register("monto", {
							required: { value: true, message: "Este campo es requerido" },
							min: {
								value: 0,
								message: "El monto debe ser mayor a 0",
							},
						})}
					/>
					{errors.monto && (
						<p className="text-red-500 text-xs italic">
							{errors.monto.message}
						</p>
					)}
				</div>
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="moneda"
					>
						Moneda
					</label>
					<select
						className={styles.inputs}
						name="moneda"
						{...register("moneda", {
							required: true,
							message: "Este campo es requerido",
						})}
					>
						<option value="ARS">ARS</option>
						<option value="USD">USD</option>
						<option value="EUR">EUR</option>
					</select>
					{errors.moneda && (
						<p className="text-red-500 text-xs italic">
							{errors.moneda.message}
						</p>
					)}
				</div>
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="observaciones"
					>
						Observaciones
					</label>
					<textarea
						className={styles.inputs + " resize-none"}
						placeholder="Observaciones"
						name="observaciones"
						id="observaciones"
						rows={5}
						cols={25}
						{...register("observaciones", {
							maxLength: {
								value: 150,
								message:
									"Las observaciones no pueden superar los 150 caracteres",
							},
						})}
					/>
					{errors.observaciones && (
						<p className="text-red-500 text-xs italic">
							{errors.observaciones.message}
						</p>
					)}
				</div>
				<div className="flex gap-2 items-center justify-between">
					<button
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
						type="submit"
					>
						{operacion._id ? "Guardar Edición" : "Cargar Operación"}
					</button>
					{operacion._id && (
						<button
							className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
							type="button"
							onClick={() => {
								Propiedad.borrarOperacion(idProp, operacion._id)
									.then((res) => {
										console.log(res);
									})
									.then(() => {
										fuerzaUpdate();
									})
									.catch((err) => {
										console.log(err);
									});
							}}
						>
							Borrar Operación
						</button>
					)}
				</div>
			</form>
		</div>
	);
};

const styles = {
	inputs: "border-b-4 border-blue-500 bg-slate-200 rounded py-2 px-4",
};

export default OperacionNueva;
