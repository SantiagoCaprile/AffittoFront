"use client";
import React, { useEffect, useState } from "react";
import { ChevronRight, Search } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import Propiedad from "@/classes/Propiedad";
import { mostrarMontoSeparado } from "@/app/utils/utils";

//columnas que tiene que tener la tabla
//tipo, dimension, domicilio.calle+ domicilio.altura, domicilio.localidad, precio + moneda, ver mas
export default function PropiedadesPage() {
	const [props, setProps] = useState([]);
	const [filtradas, setFiltradas] = useState([]);
	const {
		register,
		handleSubmit,
		getValues,
		setValue,
		formState: { errors },
	} = useForm({
		defaultValues: {
			operacion: "Alquiler",
		},
	});

	useEffect(() => {
		async function fetchData() {
			const propiedades = await Propiedad.fetchPropiedades();
			setProps(propiedades);
			setFiltradas(
				propiedades.filter((prop) =>
					prop.operaciones.some((op) => op.tipo === "Alquiler")
				)
			);
		}
		fetchData();
	}, []);

	const filtrarPropiedades = async (data) => {
		const listaFiltrada = props.filter((prop) => {
			if (
				data?.operacion !== "" &&
				!prop.operaciones.some((op) => op.tipo === data.operacion)
			)
				return false;
			if (data?.tipo !== "" && data.tipo !== prop.tipo) return false;
			if (
				prop.operaciones.filter((op) => {
					if (data?.moneda !== "" && data.moneda !== op.moneda) return false;
					if (data?.min !== "" && data.min > op.monto) return false;
					if (data?.max !== "" && data.max < op.monto) return false;
					return true;
				}).length === 0
			)
				return false;
			return true;
		});
		setFiltradas(listaFiltrada);
	};

	const limpiarFiltros = () => {
		setFiltradas(
			props.filter((prop) =>
				prop.operaciones.some((op) => op.tipo === "Alquiler")
			)
		);
		setValue("operacion", "Alquiler");
		setValue("tipo", "");
		setValue("moneda", "");
		setValue("min", "");
		setValue("max", "");
	};

	const mostrarSoloAlquiladas = () => {
		const alquiladas = props.filter((prop) => prop.estado === "Alquilada");
		setFiltradas(alquiladas);
	};

	return (
		<div className="flex flex-1 justify-center items-center bg-[#E8EFFF]">
			<div className="shadow-md rounded px-8 pb-8 mb-4 max-w-[1300px] w-4/5 bg-white">
				<div className="p-4">
					<div className="flex justify-between items-center">
						<h1 className="text-2xl font-bold py-4">Propiedades</h1>
						<div>
							<Link href="/propiedades/crearPropiedad">
								<button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
									Nueva +
								</button>
							</Link>
							<button
								className="bg-blue-200 hover:bg-blue-300 text-blue-800 font-bold py-2 px-4 rounded ml-2"
								onClick={mostrarSoloAlquiladas}
							>
								Alquiladas
							</button>
							<button
								className="bg-blue-200 hover:bg-blue-300 text-blue-800 font-bold py-2 px-4 rounded ml-2"
								onClick={() => {
									setFiltradas(props);
									{
										setValue("operacion", "");
									}
								}}
							>
								Ver Todas
							</button>
						</div>
					</div>
					<div className="flex py-4 justify-between">
						<select
							className="border-x-4 border-blue-500 bg-slate-200 rounded py-2 px-4"
							name="operacion"
							id="operacion"
							{...register("operacion")}
						>
							<option value="">Operación</option>
							<option value="Alquiler" defaultValue>
								Alquiler
							</option>
							<option value="Venta">Venta</option>
						</select>
						<select
							className="border-x-4 border-blue-500 bg-slate-200 rounded py-2 px-4"
							name="tipo"
							id="tipo"
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
							className="border-b-4 border-blue-500 bg-slate-200 rounded py-2 px-4"
							type="number"
							min={0}
							placeholder="Monto Min"
							{...register("min")}
						/>
						<input
							className="border-b-4 border-blue-500 bg-slate-200 rounded py-2 px-4"
							type="number"
							min={0}
							placeholder="Monto Max"
							{...register("max")}
						/>
						<button
							onClick={handleSubmit(filtrarPropiedades)}
							className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
						>
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
				<table className="w-full text-m text-left text-gray-500 dark:text-gray-400">
					<thead className="text-m text-gray-700 p-1 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
						<tr className={styles.tr}>
							<th className={styles.th}>Tipo</th>
							<th className={styles.th}>Dimensión</th>
							<th className={styles.th}>Domicilio</th>
							<th className={styles.th}>Localidad</th>
							<th className={styles.th}>Precio</th>
							<th className={styles.th}>Ver Más</th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
						{filtradas.length === 0 ? (
							<tr>
								<td colSpan="6" className="text-center text-red-500">
									No hay resultados
								</td>
							</tr>
						) : (
							filtradas.map((prop, index) => (
								<tr
									key={index}
									className={
										styles.tr +
										(prop.estado === "Alquilada" ? " bg-red-100" : "") +
										(prop.estado === "Reservada" ? " bg-yellow-100" : "")
									}
								>
									<td className={styles.td}>{prop.tipo}</td>
									<td className={styles.td}>
										{prop.dimension} m<sup>2</sup>
									</td>
									<td className={styles.td}>
										{prop.domicilio.calle} {prop.domicilio.altura}
									</td>
									<td className={styles.td}>{prop.domicilio.localidad}</td>
									<td className={styles.td}>
										{prop.operaciones.map((op, index) =>
											getValues("operacion") === "" ? (
												<p key={index} className="flex">
													{mostrarMontoSeparado(op.monto) +
														" " +
														op.moneda +
														" " +
														op.tipo}
												</p>
											) : (
												getValues("operacion") === op.tipo && (
													<p key={index} className="flex">
														{mostrarMontoSeparado(op.monto) +
															" " +
															op.moneda +
															" " +
															op.tipo}
													</p>
												)
											)
										)}
									</td>
									<td className={styles.td}>
										<Link
											href={`/propiedades/${prop._id}`}
											className={styles.button}
										>
											<ChevronRight color="white" />
										</Link>
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}

const styles = {
	th: "py-3 px-4 uppercase",
	td: "w-4 p-4",
	tr: "hover:bg-gray-100",
	button: "flex justify-center w-1/2 bg-blue-500 rounded-xl",
	input:
		"w-2/5 border-black border-b-2 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
};
