"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import SelectorClientes from "@/components/SelectorClientes/page";
import Propiedad from "@/classes/Propiedad";
import { useRouter } from "next/navigation";
import Map from "@/components/Map";
import fetchGeocode from "../../app/utils/geocode";

export default function PropiedadForm({ propiedadId = null }) {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		getValues,
		setValue,
		formState: { errors },
	} = useForm();
	const [seleccionados, setSeleccionados] = useState([]);
	const [mapa, setMapa] = useState(false);
	const [ubicacion, setUbicacion] = useState({});

	useEffect(() => {
		if (propiedadId) {
			Propiedad.buscarPropiedad(propiedadId).then((data) => {
				setValue("tipo", data.tipo);
				setValue("m2", data.dimension);
				setValue("estado", data.estado);
				setValue("descripcion", data.descripcion);
				setValue("localidad", data.domicilio.localidad);
				setValue("calle", data.domicilio.calle);
				setValue("altura", data.domicilio.altura);
				setValue("piso", data.domicilio.piso);
				setValue("dpto", data.domicilio.dpto);
				setUbicacion(data.ubicacion);
				setMapa(true);
			});
		}
	}, [propiedadId, setValue]);

	const actualizarMapa = async () => {
		const direccion = `${getValues("calle")} ${getValues(
			"altura"
		)}, ${getValues("localidad")}, Argentina`;
		setMapa(false);
		const ubicacion = await fetchGeocode(direccion);
		setUbicacion(ubicacion);
		setMapa(true);
	};

	const onSubmit = async (data) => {
		if (ubicacion.lat === undefined || ubicacion.lng === undefined) {
			alert("Debe visualizar la ubicación en el mapa antes de continuar");
			return;
		}
		if (seleccionados.length !== 1 && !propiedadId) {
			alert("Debe seleccionar un cliente");
			return;
		}
		data = {
			...data,
			clientes: seleccionados.map((cliente) => cliente.id),
			ubicacion: {
				lat: ubicacion.lat,
				lng: ubicacion.lng,
			},
		};
		if (propiedadId) {
			data = {
				...data,
				_id: propiedadId,
			};
			Propiedad.editarPropiedad(propiedadId, data)
				.then(
					() => router.push(`/propiedades/${propiedadId}`),
					alert("Propiedad editada")
				)
				.catch((error) => console.error("Error:", error));
			return;
		} else {
			Propiedad.CrearPropiedad(data)
				.then(
					(data) => router.push(`/propiedades/${data.data._id}`),
					alert("Propiedad creada")
				)
				.catch((error) => console.error("Error:", error));
		}
	};

	return (
		<div className="flex flex-1 gap-2 justify-center items-start bg-[#E8EFFF] p-4">
			<div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-[600px] w-2/3">
				<h2 className="text-2xl font-bold mb-4">
					{!propiedadId
						? "Ingrese los datos de la nueva propiedad"
						: "Editar propiedad"}
				</h2>
				<form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
					<fieldset className={styles.fieldset}>
						<label htmlFor="tipo" className={styles.label}>
							Tipo vivienda *
						</label>
						<select
							name="tipo"
							id="tipo"
							className={styles.inputs + (errors.tipo && styles.inputError)}
							{...register("tipo", {
								required: {
									value: true,
									message: "Tipo de propiedad es requerido",
								},
							})}
						>
							<option value="">Seleccione</option>
							<option value="Casa">Casa</option>
							<option value="Departamento">Departamento</option>
							<option value="Local">Local</option>
							<option value="Oficina">Oficina</option>
							<option value="Terreno">Terreno</option>
							<option value="Otro">Otro</option>
						</select>
					</fieldset>
					<fieldset className={styles.fieldset}>
						<label htmlFor="m2" className={styles.label}>
							Dimensión (m²)
						</label>
						<input
							type="number"
							name="m2"
							min={0}
							id="m2"
							className={styles.inputs}
							{...register("m2")}
						/>
					</fieldset>
					<fieldset className={styles.fieldset}>
						<label htmlFor="estado" className={styles.label}>
							Estado *
						</label>
						<select
							name="estado"
							id="estado"
							className={styles.inputs + (errors.estado && styles.inputError)}
							{...register("estado", {
								required: {
									value: true,
									message: "Estado es requerido",
								},
							})}
						>
							<option value="">Seleccione</option>
							<option value="Disponible">Disponible</option>
							<option value="Alquilada">Alquilada</option>
							<option value="Reservada">Reservada</option>
						</select>
					</fieldset>
					<fieldset className="mb-4">
						<label htmlFor="descripcion" className={styles.label}>
							Descripción
						</label>
						<textarea
							name="descripcion"
							id="descripcion"
							cols="50"
							rows="10"
							placeholder="Condiciones de alquiler, cochera, expensas, etc."
							className={styles.inputs + " resize-none"}
							{...register("descripcion", {
								maxLength: {
									value: 500,
									message: "No puede superar los 200 caracteres",
								},
							})}
						></textarea>
					</fieldset>
					<div className="mb-4">
						<fieldset className={styles.fieldset}>
							<label htmlFor="localidad" className={styles.label}>
								Localidad *
							</label>
							<select
								name="localidad"
								id="localidad"
								className={
									styles.inputs + (errors.localidad && styles.inputError)
								}
								{...register("localidad", {
									required: {
										value: true,
										message: "Localidad es requerida",
									},
								})}
							>
								<option value="">Seleccione</option>
								<option value="Capital Federal">Capital Federal</option>
								<option value="Rosario">Rosario</option>
								<option value="Santa Fe de la Vera Cruz">Santa Fe</option>
							</select>
						</fieldset>
						<fieldset className={styles.fieldset}>
							<label htmlFor="calle" className={styles.label}>
								Calle *
							</label>
							<input
								type="text"
								name="calle"
								id="calle"
								className={
									styles.inputs + (errors.localidad && styles.inputError)
								}
								{...register("calle", {
									required: {
										value: true,
										message: "Calle es requerida",
									},
								})}
							/>
						</fieldset>
						<div className="flex">
							<fieldset className="mr-2">
								<label htmlFor="altura" className={styles.label}>
									Altura
								</label>
								<input
									type="text"
									name="altura"
									id="altura"
									className={styles.inputs}
									{...register("altura")}
								/>
							</fieldset>
							<fieldset className="mr-2">
								<label htmlFor="piso" className={styles.label}>
									Piso
								</label>
								<input
									type="text"
									name="piso"
									id="piso"
									placeholder="-"
									className={styles.inputs}
									{...register("piso")}
								/>
							</fieldset>
							<fieldset>
								<label htmlFor="dpto" className={styles.label}>
									Dpto
								</label>
								<input
									type="text"
									name="dpto"
									id="dpto"
									placeholder="-"
									className={styles.inputs}
									{...register("dpto")}
								/>
							</fieldset>
						</div>
					</div>
					<button
						className={styles.button}
						onClick={(e) => {
							e.preventDefault();
							actualizarMapa();
						}}
					>
						Ver Mapa
					</button>
					<button className={styles.button} type="submit">
						{!propiedadId ? "Crear Propiedad" : "Guardar cambios de propiedad"}
					</button>
				</form>
			</div>
			<div className="flex flex-col gap-2">
				<div className="w-full min-w-[500px] h-[300px] bg-slate-400">
					{mapa && ubicacion ? (
						<Map center={[ubicacion.lat, ubicacion.lng]} zoom={16}>
							{({ TileLayer, Marker }) => (
								<>
									<TileLayer
										url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
										attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
									/>
									<Marker
										position={[ubicacion.lat, ubicacion.lng]}
										draggable={true}
										eventHandlers={{
											dragend: (e) => {
												setUbicacion(e.target.getLatLng());
											},
										}}
									/>
								</>
							)}
						</Map>
					) : (
						<div className="flex justify-center items-center h-full">
							{!ubicacion && !mapa && (
								<h2 className="text-2xl font-bold text-white">
									Ingrese la dirección para ver el mapa
								</h2>
							)}
							{ubicacion && !mapa && (
								<h2 className="text-2xl font-bold text-white">
									Cargando Mapa...
								</h2>
							)}
						</div>
					)}
				</div>
				{!propiedadId ? (
					<SelectorClientes
						setSeleccionados={setSeleccionados}
						titulo={"Propietarios"}
						maximo={1}
					/>
				) : (
					<div className="bg-white shadow-md rounded text-center px-8 pt-6 pb-8 mb-4 max-w-[600px]">
						<p className={styles.errors}>
							No es posible modificar el propietario
						</p>
					</div>
				)}
			</div>
		</div>
	);
}

const styles = {
	inputError: "border border-red-500 text-red-500",
	fieldset: "flex justify-center items-center mb-4",
	label: "block text-gray-700 text-sm font-bold mr-2 w-1/3",
	inputs:
		"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
	errors: "text-red-500 mb-4",
	button:
		"bg-blue-900 text-white border-2 border-blue-500 px-16 py-2 rounded-full text-xl hover:bg-blue-700 transition-all active:translate-y-1",
};
