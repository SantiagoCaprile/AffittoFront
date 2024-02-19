"use client";
import SelectorClientes from "@/components/SelectorClientes/page";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Tasacion from "@/classes/Tasacion";
import { fixedDate } from "@/app/utils/utils";

export default function TasacionForm({ propiedadId, tasacion }) {
	if (tasacion == {}) tasacion = null;
	const router = useRouter();
	const {
		register,
		handleSubmit,
		getValues,
		setValue,
		formState: { errors },
	} = useForm();
	const [solicitante, setSolicitante] = useState([]);
	const [envio, setEnvio] = useState({
		loading: false,
		error: false,
		sent: false,
	});

	useEffect(() => {
		if (tasacion) {
			setValue(
				"fecha_visita",
				tasacion.fecha_visita &&
					new Date(tasacion.fecha_visita).toISOString().split("T")[0]
			);
			setValue(
				"fecha_tasacion",
				tasacion.fecha_tasacion &&
					new Date(tasacion.fecha_tasacion).toISOString().split("T")[0]
			);
			setValue("motivo", tasacion.motivo);
			setValue("valor", tasacion.valor);
			setValue("moneda", tasacion.moneda);
			setValue("antiguedad", tasacion.antiguedad);
			setValue("observaciones", tasacion.observaciones);
			setValue("tasador_nombre", tasacion.tasador_nombre);
			setValue("tasador_matricula", tasacion.tasador_matricula);
			setValue("tasador_telefono", tasacion.tasador_telefono);
		}
	}, [tasacion, setValue]);

	const onSubmit = async (data) => {
		if (!tasacion && solicitante.length === 0) {
			alert("Debe seleccionar un solicitante");
			return;
		}
		if (tasacion) {
			data = { ...data, _id: tasacion._id };
			console.log(data);
			Tasacion.editarTasacion(data, setEnvio);
		} else {
			console.log(solicitante);
			data = {
				...data,
				solicitante: solicitante[0].id,
				propiedad: propiedadId,
			};
			console.log(data);
			Tasacion.crearTasacion(data, setEnvio);
		}
	};

	if (envio.loading) {
		return <p>Enviando...</p>;
	}

	if (envio.sent && tasacion) {
		router.push(`/propiedades/${propiedadId}`);
	}
	if (envio.sent && !tasacion) {
		router.push(`/propiedades/${propiedadId}/tasaciones`);
	}

	return (
		<div className="flex flex-1 justify-center items-center bg-[#E8EFFF] pt-4 gap-2">
			<div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
				<h2 className="text-2xl font-bold mb-4">
					{tasacion ? "Editar" : "Crear"} Tasación
				</h2>
				<form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
					<fieldset className={styles.fieldset}>
						<label htmlFor="motivo" className={styles.label}>
							Motivo de la tasación*
						</label>
						<select
							name="motivo"
							id="motivo"
							className={styles.inputs + (errors.motivo && styles.inputError)}
							{...register("motivo", {
								required: {
									value: true,
									message: "Motivo es requerido",
								},
							})}
						>
							<option value="">Seleccione</option>
							{motivoOpciones.map((opcion, index) => (
								<option key={index} value={opcion}>
									{opcion.charAt(0).toUpperCase() + opcion.slice(1)}
								</option>
							))}
						</select>
					</fieldset>
					<fieldset className={styles.fieldset}>
						<label htmlFor="fecha_visita" className={styles.label}>
							Fecha de visita del inmueble
						</label>
						<input
							type="date"
							name="fecha_visita"
							id="fecha_visita"
							className={
								styles.inputs + (errors["fecha_visita"] && styles.inputError)
							}
							{...register("fecha_visita")}
						/>
					</fieldset>
					<fieldset className={styles.fieldset}>
						<label htmlFor="fecha_tasacion" className={styles.label}>
							Fecha de tasación
						</label>
						<input
							type="date"
							name="fecha_tasacion"
							id="fecha_tasacion"
							className={
								styles.inputs + (errors["fecha_tasacion"] && styles.inputError)
							}
							{...register("fecha_tasacion")}
						/>
					</fieldset>
					<div className="flex flex-1 gap-4 justify-end">
						<fieldset className={styles.fieldset + " w-full flex flex-end"}>
							<label htmlFor="valor" className={styles.label}>
								Valor
							</label>
							<input
								type="number"
								name="valor"
								id="valor"
								min={0}
								className={styles.inputs + (errors.valor && styles.inputError)}
								{...register("valor", {
									min: {
										value: 0,
										message: "Valor debe ser mayor a 0",
									},
									validate: {
										valorRequired: (value) => {
											if (getValues("moneda") !== "" && value === "") {
												return "Valor es requerido";
											}
										},
									},
								})}
							/>
						</fieldset>
						<fieldset className={styles.fieldset + " min-w-fit"}>
							<label htmlFor="moneda" className={styles.label}>
								Moneda
							</label>
							<select
								name="moneda"
								id="moneda"
								className={styles.inputs + (errors.moneda && styles.inputError)}
								{...register("moneda", {
									validate: {
										monedaRequired: (value) => {
											if (getValues("valor") !== "" && value === "") {
												return "Moneda es requerida";
											}
										},
									},
								})}
							>
								<option value="">Seleccione</option>
								<option value="ARS">ARS</option>
								<option value="USD">USD</option>
								<option value="EUR">EUR</option>
							</select>
						</fieldset>
					</div>
					<fieldset className={styles.fieldset}>
						<label htmlFor="antiguedad" className={styles.label}>
							Antiguedad de la propiedad
						</label>
						<select
							name="antiguedad"
							id="antiguedad"
							className={
								styles.inputs + (errors.antiguedad && styles.inputError)
							}
							{...register("antiguedad")}
						>
							<option value="">Seleccione</option>
							{antiguedadOpciones.map((opcion, index) => (
								<option key={index} value={opcion}>
									{opcion}
								</option>
							))}
						</select>
					</fieldset>
					<hr className="mb-4" />
					<fieldset className={styles.fieldset}>
						<label htmlFor="tasador_nombre" className={styles.label}>
							Tasador
						</label>
						<input
							type="text"
							name="tasador_nombre"
							id="tasador_nombre"
							placeholder="Nombre del tasador"
							className={styles.inputs}
							{...register("tasador_nombre")}
						/>
					</fieldset>
					<fieldset className={styles.fieldset}>
						<label htmlFor="tasador_matricula" className={styles.label}>
							Matrícula
						</label>
						<input
							type="text"
							name="tasador_matricula"
							id="tasador_matricula"
							placeholder="Matrícula del tasador"
							className={styles.inputs}
							{...register("tasador_matricula")}
						/>
					</fieldset>
					<fieldset className={styles.fieldset}>
						<label htmlFor="tasador_telefono" className={styles.label}>
							Teléfono
						</label>
						<input
							type="text"
							name="tasador_telefono"
							id="tasador_telefono"
							placeholder="Teléfono del tasador"
							className={styles.inputs}
							{...register("tasador_telefono")}
						/>
					</fieldset>
					<hr className="mb-4" />
					<fieldset className={styles.fieldset}>
						<label htmlFor="observaciones" className={styles.label}>
							Observaciones
						</label>
						<textarea
							name="observaciones"
							id="observaciones"
							cols="30"
							rows="10"
							placeholder="Notas del tasador, observaciones sobre la propiedad, etc."
							className={
								styles.inputs +
								" resize-none " +
								(errors.observaciones && styles.inputError)
							}
							{...register("observaciones", {
								maxLength: { value: 3000, message: "Máximo 3000 caracteres" },
							})}
						></textarea>
					</fieldset>
					{errors.solicitante && (
						<p className={styles.errors}>{errors.solicitante.message}</p>
					)}
					<button
						type="submit"
						className={styles.button}
						disabled={envio.loading || envio.sent}
					>
						{envio.loading ? (
							<p>Espere por favor</p>
						) : (
							<p>{tasacion ? "Guardar cambios de la " : "Crear"} tasación</p>
						)}
					</button>
					{Object.values(errors)
						.map((error) => error?.message)
						.filter(Boolean)
						.map((error, index) => (
							<p
								key={index}
								className={styles.errors + " w-full flex flex-1 justify-center"}
							>
								*{error}
							</p>
						))}
					{envio.error && (
						<p className={styles.errors}>
							Error al enviar, verifique los datos o intentelo más tarde
						</p>
					)}
				</form>
			</div>
			{!tasacion && (
				<div className="flex flex-col gap-2 w-1/2">
					<SelectorClientes
						setSeleccionados={setSolicitante}
						titulo="Seleccione al solicitante de la tasación"
						maximo={1}
					/>
				</div>
			)}
			{tasacion && tasacion.solicitante && (
				<div className="flex flex-col gap-2 w-1/3">
					<div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-fit">
						<h2 className="text-2xl font-bold mb-4">Solicitante</h2>
						<p>
							<span className="font-bold">Nombre: </span>
							{tasacion.solicitante.nombre_razon_social}
						</p>
						<p>
							<span className="font-bold">Celular: </span>
							{tasacion.solicitante.celular}
						</p>
						<p>
							<span className="font-bold">Email: </span>
							{tasacion.solicitante.email}
						</p>
						<p className={styles.errors}>* No se puede editar el solicitante</p>
					</div>
				</div>
			)}
		</div>
	);
}

const styles = {
	inputError: "border border-red-500 text-red-500",
	fieldset: "flex justify-center items-center mb-4 w-full ",
	label: "block text-gray-700 text-sm font-bold mr-2 w-1/3",
	inputs:
		"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
	errors: "text-red-500",
	button:
		"bg-blue-900 text-white border-2 border-blue-500 px-16 py-2 rounded-full text-xl hover:bg-blue-700 transition-all active:translate-y-1",
};

const antiguedadOpciones = [
	"A estrenar",
	"0-5",
	"5-10",
	"10-20",
	"20-30",
	"30-40",
	"40-50",
	"50-60",
	"60-70",
	"70-80",
	"80-90",
	"90-100",
	"100+",
];

const motivoOpciones = [
	"hipoteca",
	"donacion/herencia",
	"seguro",
	"catastro",
	"expropiacion",
	"disolucion condominio",
	"conoce el valor de mercado",
	"otro",
];
