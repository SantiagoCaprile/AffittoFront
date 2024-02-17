"use client";
import SelectorClientes from "@/components/SelectorClientes/page";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Contrato from "@/classes/Contrato";

export default function CrearContratoPage() {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const [garantes, setGarantes] = useState([]);
	const [locatario, setlocatario] = useState([]);
	const [propiedadId, setPropiedadId] = useState("");
	const [envio, setEnvio] = useState({
		loading: false,
		error: false,
		sent: false,
	});

	useEffect(() => {
		setPropiedadId(window.location.pathname.split("/")[2]);
	}, []);

	const onSubmit = async (data) => {
		console.log(propiedadId);
		const contrato = new Contrato({
			...data,
			locatario: locatario[0].id,
			garantes: garantes.map((garante) => garante.id),
			propiedad: propiedadId,
		});
		await contrato
			.crearContrato(setEnvio)
			.then((data) => {
				console.log(data);
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	};

	if (envio.sent) {
		router.push(`/propiedades/${propiedadId}`);
	}

	return (
		<div className="flex flex-1 justify-center items-center bg-[#E8EFFF] pt-4 gap-2">
			<div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-[700px] w-1/2">
				<h2 className="text-2xl font-bold mb-4">
					Ingrese los datos del contrato de alquiler
				</h2>
				<form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
					<fieldset className={styles.fieldset}>
						<label htmlFor="destino" className={styles.label}>
							Destino *
						</label>
						<select
							name="destino"
							id="destino"
							className={styles.inputs + (errors.destino && styles.inputError)}
							{...register("destino", {
								required: {
									value: true,
									message: "Destino es requerido",
								},
							})}
						>
							<option value="">Seleccione</option>
							<option value="Vivienda">Vivienda</option>
							<option value="Comercial">Comercial</option>
							<option value="Industrial">Industrial</option>
						</select>
					</fieldset>
					<fieldset className={styles.fieldset}>
						<label htmlFor="fecha-inicio" className={styles.label}>
							Fecha de inicio *
						</label>
						<input
							type="date"
							name="fecha-inicio"
							id="fecha-inicio"
							className={
								styles.inputs + (errors["fecha-inicio"] && styles.inputError)
							}
							{...register("fecha_inicio", {
								required: {
									value: true,
									message: "Fecha de inicio es requerida",
								},
							})}
						/>
					</fieldset>
					<fieldset className={styles.fieldset}>
						<label htmlFor="fecha-fin" className={styles.label}>
							Fecha de fin *
						</label>
						<input
							type="date"
							name="fecha-fin"
							id="fecha-fin"
							className={
								styles.inputs + (errors["fecha-fin"] && styles.inputError)
							}
							{...register("fecha_fin", {
								required: {
									value: true,
									message: "Fecha de fin es requerida",
								},
								validate: {
									fechaMayor: (value) => {
										const fechaInicio = new Date(
											document.getElementById("fecha-inicio").value
										);
										const fechaFin = new Date(value);
										if (fechaFin < fechaInicio) {
											return "Fecha de fin debe ser mayor a fecha de inicio";
										}
									},
								},
							})}
						/>
					</fieldset>
					<hr className="mb-4" />
					<div className="flex justify-around my-4">
						<fieldset className={styles.fieldset}>
							<label htmlFor="monto" className={styles.label}>
								Monto*
							</label>
							<input
								type="number"
								name="monto"
								id="monto"
								className={styles.inputs + (errors.monto && styles.inputError)}
								{...register("monto", {
									required: {
										value: true,
										message: "Monto es requerido",
									},
								})}
							/>
						</fieldset>
						<fieldset className={styles.fieldset}>
							<label htmlFor="moneda" className={styles.label}>
								Moneda*
							</label>
							<select
								name="moneda"
								id="moneda"
								className={styles.inputs + (errors.moneda && styles.inputError)}
								{...register("moneda", {
									required: {
										value: true,
										message: "Moneda es requerida",
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
						<label htmlFor="comision-celebracion" className={styles.label}>
							% comisión celebración contrato
						</label>
						<input
							type="number"
							min={0}
							name="comision-celebracion"
							id="comision-celebracion"
							className={
								styles.inputs +
								(errors["comision_celebracion"] && styles.inputError)
							}
							{...register("comision_celebracion")}
						/>
					</fieldset>
					<hr className="mb-4" />
					<fieldset className="flex flex-col">
						<label htmlFor="observaciones" className={styles.label}>
							Observaciones
						</label>
						<textarea
							name="observaciones"
							id="observaciones"
							cols="30"
							rows="10"
							placeholder="Objetos que se entregan con la propiedad, condiciones de entrega, cláusulas especiales, actualizaciones según que índice etc."
							className={
								styles.inputs +
								" resize-none " +
								(errors.observaciones && styles.inputError)
							}
							{...register("observaciones", {
								maxLength: { value: 700, message: "Máximo 500 caracteres" },
							})}
						></textarea>
					</fieldset>
					<button
						type="submit"
						className={styles.button}
						disabled={envio.loading || envio.sent}
					>
						{envio.loading ? <p>Espere por favor</p> : <p>Crear Contrato</p>}
					</button>
					{envio.error && (
						<p className={styles.errors}>
							Error al enviar, verifique los datos o intentelo más tarde
						</p>
					)}
				</form>
			</div>
			<div className="flex flex-col gap-2 w-1/2">
				<SelectorClientes
					setSeleccionados={setlocatario}
					titulo="Locatario"
					maximo={1}
				/>
				<SelectorClientes
					setSeleccionados={setGarantes}
					titulo="Garantes"
					maximo={5}
				/>
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
