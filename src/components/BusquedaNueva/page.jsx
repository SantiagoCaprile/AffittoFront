"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import BusquedaInteligente from "@/classes/BusquedaIntelegente";

const BusquedaNueva = ({ clienteId, updateBusquedas }) => {
	const [envio, setEnvio] = useState({
		loading: false,
		error: false,
		sent: false,
	});

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm();

	const guardarBusqueda = (data) => {
		console.log("data:", data);
		data = { ...data, cliente: clienteId };
		BusquedaInteligente.crearBusqueda(data, setEnvio)
			.then((data) => {
				console.log("Data:", data);
			})
			.catch((error) => console.error("Error:", error));
	};

	console.log("errores:", errors);

	const limpiarFiltros = () => {
		setValue("operacion", "");
		setValue("localidad", "");
		setValue("tipo", "");
		setValue("ambientes", "");
		setValue("moneda", "");
		setValue("monto_min", "");
		setValue("monto_max", "");
		setValue("observaciones", "");
		setValue("dimension_min", "");
		setValue("dimension_max", "");
	};

	if (envio.loading) {
		return <p>Enviando...</p>;
	}

	if (envio.sent) {
		updateBusquedas();
		return null;
	}

	return (
		<div className="shadow-md rounded px-8 pb-8 mb-4 min-h-[500px] bg-white flex flex-col justify-around">
			<h1 className="text-2xl font-bold pt-4">Nueva Busqueda</h1>
			<p className="text-left">
				Complete los campos para recibir notificaciones de propiedades que
				cumplan con sus intereses.
			</p>
			<form
				className="p-4 flex flex-col items-center gap-4"
				onSubmit={handleSubmit(guardarBusqueda)}
			>
				<div className="flex items-center gap-4 bg-slate-200 rounded p-4 shadow-md ">
					<span className={"font-bold " + (errors.operacion && styles.error)}>
						Operación: *
					</span>
					<span>Alquiler</span>
					<input
						{...register("operacion", {
							required: true,
						})}
						type="radio"
						value="Alquiler"
						className="h-5 w-5 cursor-pointer"
						name="operacion"
					/>
					<span>Venta</span>
					<input
						{...register("operacion", {
							required: true,
						})}
						type="radio"
						value="Venta"
						className="h-5 w-5 cursor-pointer"
						name="operacion"
					/>
				</div>
				<div className="flex gap-8 py-4">
					<select
						className={styles.select + " " + (errors.localidad && styles.error)}
						name="localidad"
						id="localidad"
						{...register("localidad", { required: true })}
					>
						<option value="" defaultValue>
							Localidad *
						</option>
						<option value="Rosario">Rosario</option>
						<option value="Capital Federal">Capital Federal</option>
						<option value="Santa Fe">Santa Fe</option>
					</select>
					<select
						className={styles.select + " " + (errors.tipo && styles.error)}
						name="tipo"
						{...register("tipo", { required: true })}
					>
						<option value="" defaultValue>
							Tipo *
						</option>
						<option value="Casa">Casa</option>
						<option value="Departamento">Departamento</option>
						<option value="Galpón">Galpón</option>
						<option value="Oficina">Oficina</option>
						<option value="Terreno">Terreno</option>
						<option value="Local">Local</option>
						<option value="Otros">Otro</option>
					</select>
					<input
						className={styles.input}
						type="number"
						name="ambientes"
						min={0}
						placeholder="Ambientes"
						{...register("ambientes")}
					/>
				</div>
				<div className="flex justify-center items-center gap-4 py-4">
					<label className="text-center font-bold">
						Dimensiones (m&sup2;):
					</label>
					<input
						className={styles.input}
						type="number"
						name="min"
						min={0}
						placeholder="Dimensión Mínima"
						{...register("dimension_min")}
					/>
					<input
						className={styles.input}
						type="number"
						name="max"
						min={0}
						placeholder="Dimensión Máxima"
						{...register("dimension_max")}
					/>
				</div>
				<div className="flex justify-center gap-4 py-4">
					<select className={styles.select} {...register("moneda")}>
						<option value="" defaultValue>
							Moneda
						</option>
						<option value="ARS">Pesos</option>
						<option value="USD">Dólares</option>
					</select>
					<input
						className={styles.input}
						type="number"
						name="monto_min"
						min={0}
						placeholder="Monto Min"
						{...register("monto_min")}
					/>
					<input
						className={styles.input}
						type="number"
						name="monto_max"
						min={0}
						placeholder="Monto Max"
						{...register("monto_max")}
					/>
				</div>
				<textarea
					placeholder="Observaciones"
					className={
						"border-x-4 border-blue-500 bg-slate-200 rounded py-2 px-4 w-full h-32 resize-none "
					}
					maxLength={300}
					{...register("observaciones")}
				></textarea>
			</form>
			<div className="flex justify-end gap-2">
				<button
					onClick={handleSubmit(guardarBusqueda)}
					className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex gap-2"
				>
					<span>Enviar Busqueda</span>
					<Search />
				</button>
				<button
					onClick={limpiarFiltros}
					className="bg-blue-200 hover:bg-blue-300 text-blue-800 font-bold py-2 px-4 rounded"
				>
					Limpiar
				</button>
			</div>
		</div>
	);
};

const styles = {
	select: "border-x-4 border-blue-500 bg-slate-200 rounded py-2 px-4",
	input:
		"border-b-4 border-blue-500 bg-slate-200 rounded py-2 px-4 text-center",
	inputError: "bg-red-200",
	error: " text-red-500",
};

export default BusquedaNueva;
