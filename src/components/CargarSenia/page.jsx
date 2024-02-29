"use client";
import React, { useState } from "react";
import SelectorClientes from "../SelectorClientes/page";
import { useForm } from "react-hook-form";
import Propiedad from "@/classes/Propiedad";

const CargarSenia = ({ propiedadId, update }) => {
	const [cliente, setCliente] = useState([]);
	const [envio, setEnvio] = useState({
		loading: false,
		error: false,
		sent: false,
	});
	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		data = { ...data, cliente: cliente[0].id, propiedad: propiedadId };
		Propiedad.seniarPropiedad(data, setEnvio);
	};

	if (envio.sent) {
		update(true);
		return (
			<div className="flex justify-center items-center flex-col w-full">
				<h2 className="text-2xl font-bold text-green-500">
					Seña cargada con éxito
				</h2>
			</div>
		);
	}

	return (
		<div className="flex flex-col bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
			<h1 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-4">
				Cargar Seña
			</h1>
			<div className="flex">
				<SelectorClientes
					setSeleccionados={setCliente}
					maximo={1}
					titulo={"Seleccione un cliente"}
				/>
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
							type="float"
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
							<option value="ARS">Pesos</option>
							<option value="USD">Dólares</option>
							<option value="EUR">Euros</option>
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
							Fecha de pago
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
							htmlFor="fecha"
						>
							Fecha valida hasta
						</label>
						<input
							className={styles.inputs}
							defaultValue={
								new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
									.toISOString()
									.split("T")[0]
							}
							type="date"
							name="validaHasta"
							{...register("validaHasta", {
								required: {
									value: true,
									message: "La fecha de validez máxima es requerida",
								},
								min: {
									value:
										getValues("fecha") &&
										new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
											.toISOString()
											.split("T")[0],
									message: "No puede ser menor a la fecha de pago",
								},
							})}
						/>
					</div>
					{errors.validaHasta && (
						<p className="text-red-500 text-xs italic">
							{errors.validaHasta.message}
						</p>
					)}
					<div className="flex items-center justify-between">
						{envio.loading ? (
							<p className="text-green-500 italic">Cargando...</p>
						) : envio.error ? (
							<p className="text-red-500 italic text-center text-sm">
								No se pudo cargar la seña, intentelo mas tarde
							</p>
						) : (
							<button
								className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
								type="submit"
							>
								Cargar Seña
							</button>
						)}
					</div>
				</form>
			</div>
		</div>
	);
};

const styles = {
	inputs: "border-b-4 border-blue-500 bg-slate-200 rounded py-2 px-4",
};

export default CargarSenia;
