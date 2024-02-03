"use client";
import React from "react";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";

//esta pagina es para que un cliente pueda dejar sus intereses y la inmobiliaria le
//envie propiedades que se vayan agregando que cumplan con esos intereses
//los campos que tiene que tener el formulario son:
//operacion (venta o alquiler), tipo de propiedad, rango de dimension, rango de precio, moneda, localidad, cant de ambientes
export default function BusquedaInteligentePage() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const guardarBusqueda = (data) => {
		//verificar que el min sea menor que el max sino agregar error a max
		console.log("data:", data);
	};
	console.log("errroes:", errors);

	const limpiarFiltros = () => {
		document.getElementsByName("tipo")[0].value = "";
		document.getElementsByName("moneda")[0].value = "";
		document.getElementsByName("min")[0].value = "";
		document.getElementsByName("max")[0].value = "";
		document.getElementsByName("localidad")[0].value = "";
		document.getElementsByName("Operación")[0].checked = false;
		document.getElementsByName("Operación")[1].checked = false;
		document.getElementsByName("ambientes")[0].value = "";
	};

	return (
		<div className="flex flex-1 justify-center items-center bg-[#E8EFFF]">
			<div className="shadow-md rounded px-8 pb-8 mb-4 max-w-[1200px] w-3/5 min-h-[500px] bg-white flex flex-col justify-around">
				<h1 className="text-2xl font-bold pt-4">Busqueda Inteligente</h1>
				<p className="text-left">
					Complete los campos para recibir notificaciones de propiedades que
					cumplan con sus intereses.
				</p>
				<form
					className="p-4 flex flex-col items-center gap-4"
					onSubmit={handleSubmit(guardarBusqueda)}
				>
					<div className="flex items-center gap-4 bg-slate-200 rounded p-4 shadow-md">
						<span>Alquiler</span>
						<input
							{...register("Operación", {
								required: true,
							})}
							type="radio"
							value="Alquiler"
							className="h-5 w-5 cursor-pointer"
							name="Operación"
						/>
						<span>Venta</span>
						<input
							{...register("Operación", {
								required: true,
							})}
							type="radio"
							value=" Venta"
							className="h-5 w-5 cursor-pointer"
							name="Operación"
						/>
					</div>
					<div className="flex gap-8 py-4">
						<select
							className={styles.select}
							name="localidad"
							id="localidad"
							{...register("localidad")}
						>
							<option value="" defaultValue>
								Localidad
							</option>
							<option value="Rosario">Rosario</option>
							<option value="CABA">CABA</option>
							<option value="Santa Fe">Santa Fe</option>
						</select>
						<select
							className="border-x-4 border-blue-500 bg-slate-200 rounded py-2 px-4"
							name="tipo"
							{...register("tipo")}
						>
							<option value="" defaultValue>
								Tipo
							</option>
							<option value="Casa">Casa</option>
							<option value="Departamento">Departamento</option>
							<option value="Galpon">Galpón</option>
							<option value="Oficina">Oficina</option>
							<option value="Terreno">Terreno</option>
							<option value="Local">Local</option>
							<option value="Otros">Otro</option>
						</select>
						<input
							className={styles.input}
							type="number"
							name="ambientes"
							min={1}
							placeholder="Ambientes"
							{...register("ambientes")}
						/>
					</div>
					<div className="flex justify-center gap-4 py-4">
						<select
							className="border-x-4 border-blue-500 bg-slate-200 rounded py-2 px-4"
							{...register("moneda")}
						>
							<option value="" defaultValue>
								Moneda
							</option>
							<option value="ARS">Pesos</option>
							<option value="USD">Dólares</option>
						</select>
						<input
							className={styles.input}
							type="number"
							name="min"
							min={0}
							placeholder="Monto Min"
							{...register("min")}
						/>
						<input
							className={styles.input}
							type="number"
							name="max"
							min={0}
							placeholder="Monto Max"
							{...register("max")}
						/>
					</div>
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
		</div>
	);
}

const styles = {
	select: "border-x-4 border-blue-500 bg-slate-200 rounded py-2 px-4",
	input:
		"border-b-4 border-blue-500 bg-slate-200 rounded py-2 px-4 text-center",
};

const mostrarMontoSeparado = (monto) => {
	const montoString = monto.toString();
	const largo = montoString.length;
	if (largo <= 3) return montoString;
	const resto = montoString.slice(largo - 3, largo);
	const parteEntera = montoString.slice(0, largo - 3);
	return `${mostrarMontoSeparado(parteEntera)}.${resto}`;
};
