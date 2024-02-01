"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
const url = "http://localhost:4000/users";

const Register = () => {
	const router = useRouter();
	const [formData, setFormData] = useState({
		email: "",
		name: "",
		password: "",
	});
	const [errorMessage, setErrorMessage] = useState("");

	const handleFieldChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Validations
		if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(formData.email)) {
			setErrorMessage("Email inválido");
			return;
		}

		if (formData.email.trim() === "") {
			setErrorMessage("Email requerido");
			return;
		}

		if (formData.name.trim() === "") {
			setErrorMessage("Nombre completo requerido");
			return;
		}

		if (formData.password.length < 8) {
			setErrorMessage("La contraseña debe tener al menos 8 caracteres");
			return;
		}

		setErrorMessage("");

		// Send data to backend
		try {
			const response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				cors: true,
				body: JSON.stringify({
					email: formData.email,
					name: formData.name,
					password: formData.password,
				}),
			});

			if (response.ok) {
				// Registro exitoso, puedes hacer alguna acción aquí si lo deseas
				console.log("Registro exitoso");
				router.push("/login");
			} else {
				console.error("Error al registrar:", response.statusText);
			}
		} catch (error) {
			// Error al registrar
			console.error("Error al registrar:", error);
		}
	};

	return (
		<div className="flex flex-1 justify-center items-center bg-[#E8EFFF]">
			<form
				className="bg-white shadow-md rounded px-8 pb-8 mb-4 max-w-[600px] w-2/3"
				onSubmit={handleSubmit}
			>
				<h2 className="text-2xl font-bold py-4">Registro</h2>
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="email"
					>
						Email
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="email"
						type="email"
						name="email"
						placeholder="Email"
						onChange={handleFieldChange}
						value={formData.email}
					/>
				</div>
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="name"
					>
						Nombre Completo
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="name"
						type="text"
						name="name"
						placeholder="Nombre Completo"
						onChange={handleFieldChange}
						value={formData.name}
					/>
				</div>
				<div className="mb-6">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="password"
					>
						Contraseña
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="password"
						type="password"
						name="password"
						placeholder="Contraseña"
						onChange={handleFieldChange}
						value={formData.password}
					/>
				</div>
				<div className="flex flex-col items-center justify-center">
					{errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
					<button
						className="bg-blue-900 text-white border-2 border-blue-500 px-16 py-2 rounded-full text-xl hover:bg-blue-700 transition-all active:translate-y-1"
						type="submit"
					>
						Registrarse
					</button>
				</div>
			</form>
		</div>
	);
};

export default Register;
