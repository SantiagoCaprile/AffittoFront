"use client";
import React, { useEffect, useState } from "react";
import { ChevronRight, Search } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";

async function listarPropiedades() {
	const listaPropiedades = await fetch("http://localhost:3000/propiedades")
		.then((response) => response.json())
		.then((data) => data.data)
		.then((datosPropiedades) =>
			datosPropiedades.map((prop) => {
				return {
					tipo: prop.tipo,
					dimension: prop.dimension,
					domicilio: prop.domicilio, //calle, altura, localidad
					precio: prop.precio,
					moneda: prop.moneda,
					estado: prop.estado,
					_id: prop._id,
				};
			})
		);
	return listaPropiedades;
}

//columnas que tiene que tener la tabla
//tipo, dimension, domicilio.calle+ domicilio.altura, domicilio.localidad, precio + moneda, ver mas
export default function PropiedadesPage() {
	const [props, setProps] = useState([]);
	const [filtradas, setFiltradas] = useState([]);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	useEffect(() => {
		async function fetchData() {
			const propiedades = await listarPropiedades();
			setProps(propiedades);
			setFiltradas(propiedades);
		}
		fetchData();
	}, []);

	const filtrarPropiedades = async (data) => {
		const listaFiltrada = props.filter((prop) => {
			if (data.tipo !== "" && data.tipo !== prop.tipo) return false;
			if (data.moneda !== "" && data.moneda !== prop.moneda) return false;
			if (data.min && data.min > prop.precio) return false;
			if (data.max && data.max < prop.precio) return false;
			return true;
		});
		setFiltradas(listaFiltrada);
	};

	const limpiarFiltros = () => {
		setFiltradas(props);
		document.getElementsByName("tipo")[0].value = "";
		document.getElementsByName("moneda")[0].value = "";
		document.getElementsByName("min")[0].value = "";
		document.getElementsByName("max")[0].value = "";
	};

	return (
		<div className="flex flex-1 justify-center items-center bg-[#E8EFFF]">
			<div className="shadow-md rounded px-8 pb-8 mb-4 max-w-[1200px] w-4/5 bg-white">
				<h1 className="text-2xl font-bold py-4">Propiedades</h1>
				<div className="p-4">
					<div>
						<div className="flex justify-between">
							<div>
								<button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2">
									Alquileres
								</button>
								<button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
									Ventas
								</button>
							</div>
							<div>
								<Link href="/crearPropiedad">
									<button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
										Nueva +
									</button>
								</Link>
								<button className="bg-blue-200 hover:bg-blue-300 text-blue-800 font-bold py-2 px-4 rounded ml-2">
									Alquiladas
								</button>
							</div>
						</div>
					</div>
					<div className="flex py-4 justify-between">
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
								<tr key={index} className={styles.tr}>
									<td className={styles.td}>{prop.tipo}</td>
									<td className={styles.td}>
										{prop.dimension} m<sup>2</sup>
									</td>
									<td className={styles.td}>
										{prop.domicilio.calle} {prop.domicilio.altura}
									</td>
									<td className={styles.td}>{prop.domicilio.localidad}</td>
									<td className={styles.td}>
										{mostrarMontoSeparado(prop.precio)} {prop.moneda}
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

const mostrarMontoSeparado = (monto) => {
	const montoString = monto.toString();
	const largo = montoString.length;
	if (largo <= 3) return montoString;
	const resto = montoString.slice(largo - 3, largo);
	const parteEntera = montoString.slice(0, largo - 3);
	return `${mostrarMontoSeparado(parteEntera)}.${resto}`;
};
