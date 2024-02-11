"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

//este componente es para cargar un pago
//debe tener un campo monto, un select de monedas, un campo fecha con la fecha de hoy seleccionada por defecto
//y un campo observaciones

const CargarPago = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => console.log(data, errors);

	return (
		<div className="flex flex-col bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
			<h1 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-4">
				Cargar Pago
			</h1>
			<form
				className="flex justify-center items-center flex-col w-full"
				onSubmit={handleSubmit(onSubmit)}
			>
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
						<option value="ars">ARS</option>
						<option value="usd">USD</option>
						<option value="eur">EUR</option>
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
						htmlFor="fecha"
					>
						Fecha
					</label>
					<input
						className={styles.inputs}
						defaultValue={new Date().toISOString().split("T")[0]}
						type="date"
						name="fecha"
						{...register("fecha", {
							required: {
								value: true,
								message: "La fecha de pago es requerida",
							},
							max: {
								value: new Date().toISOString().split("T")[0],
								message: "No puede ser mayor a la fecha actual",
							},
						})}
					/>
					{errors.fecha && (
						<p className="text-red-500 text-xs italic">
							{errors.fecha.message}
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
				<div className="flex items-center justify-between">
					<button
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
						type="submit"
					>
						Cargar
					</button>
				</div>
			</form>
		</div>
	);
};

const styles = {
	inputs: "border-b-4 border-blue-500 bg-slate-200 rounded py-2 px-4",
};

export default CargarPago;
