"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Usuario from "@/classes/Usuario";

const formatEmail = (nombre, apellido) => {
	if (!nombre || !apellido) return "";
	const formattedNombre = nombre
		.replace(/\s/g, "")
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "");
	const formattedApellido = apellido
		.replace(/\s/g, "")
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "");
	return `${formattedNombre.toLowerCase()}.${formattedApellido.toLowerCase()}@affitto.com`;
};

const Register = () => {
	const [envio, setEnvio] = useState(false);
	const router = useRouter();
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	const nombre = watch("nombre");
	const apellido = watch("apellido");

	const onSubmit = async (data) => {
		const email = formatEmail(data.nombre, data.apellido);
		data = {
			nombre: email,
			rol: data.role,
		};
		console.log(data);
		Usuario.createUser(data).then((res) => {
			if (res) {
				setEnvio(true);
			}
		});
	};

	if (envio) {
		router.push("/gestionUsuarios");
	}

	return (
		<div className="flex flex-1 justify-center items-center bg-[#E8EFFF]">
			<form
				className="bg-white shadow-md rounded px-8 pb-8 mb-4 max-w-[600px] w-2/3"
				onSubmit={handleSubmit(onSubmit)}
			>
				<h2 className="text-2xl font-bold py-4">Creación de nuevo usuario</h2>
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="nombre"
					>
						Nombre
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="nombre"
						type="text"
						{...register("nombre", {
							required: { value: true, message: "Este campo es requerido" },
						})}
						placeholder="Nombre Completo"
					/>
				</div>
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="apellido"
					>
						Apellido
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="apellido"
						type="text"
						{...register("apellido", {
							required: { value: true, message: "Este campo es requerido" },
						})}
						placeholder="Perez"
					/>
				</div>
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="email"
					>
						Email
					</label>
					<input
						disabled
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="email"
						type="email"
						value={formatEmail(nombre, apellido)}
						placeholder="nombre.apellido@affitto.com"
					/>
				</div>
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="role"
					>
						Rol
					</label>
					<select
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="role"
						type="text"
						defaultValue={Usuario.USUARIO_ROLES.EMPLEADO}
						{...register("role", {
							required: true,
						})}
					>
						{Object.values(Usuario.USUARIO_ROLES).map((rol, index) => (
							<option key={index} value={rol}>
								{rol}
							</option>
						))}
					</select>
				</div>
				<p className="text-slate-500 text-sm italic">
					Será cargado con la contraseña por defecto: 1234
				</p>
				<p className="text-slate-500 text-sm italic">
					El usuario deberá cambiarla en su primer inicio de sesión
				</p>
				<div className="flex flex-col items-center justify-center">
					<button
						className="bg-blue-900 text-white border-2 border-blue-500 px-16 py-2 rounded-full text-xl hover:bg-blue-700 transition-all active:translate-y-1"
						type="submit"
					>
						Registrar Usuario
					</button>
				</div>
			</form>
		</div>
	);
};

export default Register;
