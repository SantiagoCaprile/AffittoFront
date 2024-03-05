"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Cliente from "@/classes/Cliente";
import { useSession } from "next-auth/react";

export default function ClienteForm({ clienteCuit = null }) {
	const [cliente, setCliente] = useState(null);
	const { data: session } = useSession();

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm();

	useEffect(() => {
		if (clienteCuit) {
			Cliente.buscarCliente(clienteCuit).then((data) => {
				setCliente(data);
				console.log(data);
				setValue("nombre", data?.nombre_razon_social);
				setValue("cuit", data?.cuit);
				setValue("iva", data?.condicion_iva);
				setValue("mail", data?.email);
				setValue("celular", data?.celular);
				setValue("telefono", data?.telefono);
				setValue(
					"localidad",
					data?.domicilio.localidad === "Santa Fe"
						? "Santa Fe de la Vera Cruz"
						: data?.domicilio.localidad
				);
				setValue("calle", data?.domicilio.calle);
				setValue("altura", data?.domicilio.altura);
				setValue("piso", data?.domicilio.piso);
				setValue("dpto", data?.domicilio.dpto);
			});
		}
	}, [clienteCuit, setValue]);

	const onSubmit = (data) => {
		data = {
			...data,
			usuario: session.user.id,
		};
		if (!cliente) {
			Cliente.crearCliente(data).finally(() => {
				window.location.href = "/clientes";
			});
		} else {
			Cliente.editarCliente(cliente.cuit, data).finally(() => {
				window.location.href = "/clientes";
			});
		}
	};

	return (
		<div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-[700px] w-2/3">
			<h2 className="text-2xl font-bold mb-4">
				{!cliente ? "Ingrese los datos del nuevo cliente" : "Editar cliente"}
			</h2>
			<form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
				<fieldset className={styles.fieldset}>
					<label htmlFor="nombre" className={styles.label}>
						Nombre/Razón Social*
					</label>
					<input
						type="text"
						name="nombre"
						id="nombre"
						className={`${styles.inputs} ${errors.nombre && styles.inputError}`}
						placeholder="eg. Juan Perez"
						{...register("nombre", {
							required: {
								value: true,
								message: "Nombre/Razón Social es requerido",
							},
						})}
					/>
				</fieldset>
				<fieldset className={styles.fieldset}>
					<label htmlFor="cuit" className={styles.label}>
						CUIT/CUIL*
					</label>
					<input
						type="text"
						name="cuit"
						id="cuit"
						disabled={clienteCuit}
						placeholder="eg. 20-12345678-9"
						className={`${styles.inputs} ${errors.nombre && styles.inputError}`}
						{...register("cuit", {
							required: {
								value: true,
								message: "CUIT/CUIL es requerido",
							},
						})}
					/>
				</fieldset>
				<fieldset className={styles.fieldset}>
					<label htmlFor="iva" className={styles.label}>
						Condición frente al IVA*
					</label>
					<select
						name="iva"
						id="iva"
						className={`${styles.inputs} ${errors.iva && styles.inputError}`}
						{...register("iva", {
							required: {
								value: true,
								message: "La condición frente al iva es requerida",
							},
						})}
					>
						<option value="">Seleccione</option>
						<option value="Responsable inscripto">Responsable inscripto</option>
						<option value="Consumidor Final">Consumidor Final</option>
						<option value="Responsable no inscripto">
							Responsable no inscripto
						</option>
					</select>
				</fieldset>
				<hr className="mb-4" />
				<fieldset className={styles.fieldset}>
					<label htmlFor="mail" className={styles.label}>
						E-Mail
					</label>
					<input
						type="email"
						name="mail"
						id="mail"
						placeholder="eg. affitto@ejemplo.com"
						className={`${styles.inputs} ${errors.mail && styles.inputError}`}
						{...register("mail")}
					/>
				</fieldset>
				<fieldset className={styles.fieldset}>
					<label htmlFor="celular" className={styles.label}>
						Celular*
					</label>
					<input
						type="text"
						name="celular"
						id="celular"
						className={`${styles.inputs} ${
							errors.celular && styles.inputError
						}`}
						{...register("celular", {
							required: {
								value: true,
								message: "Celular es requerido",
							},
							pattern: {
								value: /^[0-9\-\(\)]+$/,
								message: "Solo se permiten números",
							},
						})}
					/>
				</fieldset>
				<fieldset className={styles.fieldset}>
					<label htmlFor="telefono" className={styles.label}>
						Teléfono
					</label>
					<input
						type="text"
						name="telefono"
						id="telefono"
						className={`${styles.inputs} ${
							errors.telefono && styles.inputError
						}`}
						{...register("telefono", {
							pattern: {
								value: /^[0-9\-\(\)]+$/,
								message: "Solo se permiten números",
							},
						})}
					/>
				</fieldset>
				<hr className="mb-4" />
				<div className="mb-4">
					<fieldset className={styles.fieldset}>
						<label htmlFor="localidad" className={styles.label}>
							Localidad*
						</label>
						<select
							name="localidad"
							id="localidad"
							className={`${styles.inputs} ${
								errors.localidad && styles.inputError
							}`}
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
							Calle*
						</label>
						<input
							type="text"
							name="calle"
							id="calle"
							className={`${styles.inputs} ${
								errors.calle && styles.inputError
							}`}
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
								className={`${styles.inputs} ${
									errors.altura && styles.inputError
								}`}
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
								className={`${styles.inputs} ${
									errors.piso && styles.inputError
								}`}
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
								className={`${styles.inputs} ${
									errors.dpto && styles.inputError
								}`}
								{...register("dpto")}
							/>
						</fieldset>
					</div>
				</div>
				<button id="boton-enviar" type="submit" className={styles.button}>
					{!cliente ? <span>Crear</span> : <span>Editar</span>}
				</button>
				{errors && (
					<p className={styles.errors}>
						<span>{errors.nombre?.message}</span>
						<span>{errors.cuit?.message}</span>
						<span>{errors.iva?.message}</span>
						<span>{errors.mail?.message}</span>
						<span>{errors.celular?.message}</span>
						<span>{errors.telefono?.message}</span>
						<span>{errors.localidad?.message}</span>
						<span>{errors.calle?.message}</span>
						<span>{errors.altura?.message}</span>
						<span>{errors.dpto?.message}</span>
					</p>
				)}
			</form>
		</div>
	);
}

const styles = {
	inputError: "border border-red-500 text-red-500",
	fieldset: "flex justify-center items-center mb-4",
	label: "block text-gray-700 text-sm font-bold mr-2 w-1/3",
	inputs:
		"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ",
	errors: "text-red-500 mb-4 flex flex-col w-full pl-4",
	button:
		"bg-blue-900 text-white border-2 border-blue-500 px-16 py-2 rounded-full text-xl hover:bg-blue-700 transition-all active:translate-y-1",
};
