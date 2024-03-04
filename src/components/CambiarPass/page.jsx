"use client";
import React from "react";
import { useForm } from "react-hook-form";
import Usuario from "@/classes/Usuario";

export const CambiarPass = ({ user }) => {
	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		console.log(data, user);
		Usuario.changePassword(user.email, data.password).then((res) => {
			if (res) {
				alert("Contraseña actualizada");
			}
		});
	};

	return (
		<form
			className="border-t border-black pt-2 flex flex-col gap-1"
			onSubmit={handleSubmit(onSubmit)}
		>
			<span className="text-gray-700">Contraseña nueva:</span>
			<input
				type="password"
				className={styles.input}
				id="password"
				{...register("password", { required: true })}
			/>
			<span className="text-gray-700">Repita la nueva contraseña:</span>
			<input
				type="password"
				className={styles.input}
				id="password2"
				{...register("password2", {
					required: true,
					validate: {
						matchesPreviousPassword: (value) => {
							const { password } = getValues();
							return password === value;
						},
					},
				})}
			/>
			{errors.password2 && (
				<span className="text-red-500">
					Verifique que las dos contraseñas coincidan
				</span>
			)}
			<button className={styles.button} type="submit">
				Cambiar contraseña
			</button>
		</form>
	);
};

const styles = {
	input: "border-2 border-blue-500 rounded-md p-1",
	button:
		"bg-blue-500 hover:bg-blue-600 transition-all text-white px-4 py-2 rounded-md",
};
