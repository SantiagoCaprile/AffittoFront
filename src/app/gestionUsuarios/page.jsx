"use client";
import React, { useState, useEffect } from "react";

const GestionUsuariosPage = () => {
	const [users, setUsers] = useState([]);
	const [filteredUsers, setFilteredUsers] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");

	const fetchUsers = async () => {
		try {
			const response = await fetch("http://localhost:3000/usuarios");
			const data = await response.json();
			return data.data;
		} catch (error) {
			console.error("Error fetching users:", error);
		}
	};

	const filterUsers = () => {
		const filtered = users.filter((user) =>
			user.nombre.toLowerCase().includes(searchTerm.toLowerCase())
		);
		setFilteredUsers(filtered);
	};

	const resetPassword = (userId) => {
		fetch(`http://localhost:3000/usuarios/restart`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ id: userId }),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				alert("Contraseña reiniciada");
			})
			.catch((error) => {
				console.error("Error resetting password:", error);
				alert("Error al reiniciar contraseña");
			});
	};

	useEffect(() => {
		fetchUsers().then((data) => {
			setUsers(data);
			setFilteredUsers(data);
		});
	}, []);

	return (
		<div className="flex flex-1 justify-center items-center bg-[#E8EFFF]">
			<div className="flex flex-col justify-center shadow-md rounded px-8 py-8 mb-4 max-w-[1200px] w-4/5 bg-white">
				<h1 className="text-2xl font-bold">Administración de usuarios</h1>
				<div className="flex flex-1 gap-2 py-2">
					<input
						type="text"
						placeholder="Buscar por email"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						onKeyDown={(e) => (e.key == "Enter" ? filterUsers() : null)}
						className={styles.inputs}
					/>
					<button
						onClick={filterUsers}
						className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
					>
						Filtrar
					</button>
					<button
						onClick={() => {
							setSearchTerm("");
							setFilteredUsers(users);
						}}
						className="bg-blue-200 hover:bg-blue-300 text-blue-800 font-bold py-2 px-4 rounded"
					>
						Limpiar
					</button>
				</div>
				<table className={styles.table}>
					<thead className={styles.thead}>
						<tr>
							<th className={styles.th}>Email</th>
							<th className={styles.th}>Rol</th>
							<th className={styles.th}>Actions</th>
						</tr>
					</thead>
					<tbody>
						{filteredUsers ? (
							filteredUsers.map((user) => (
								<tr key={user._id} className={styles.tr}>
									<td>{user.nombre ?? "@example.com"}</td>
									<td>{user.rol ?? "No asignado"}</td>
									<td>
										<button
											onClick={() => resetPassword(user._id)}
											className="bg-blue-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
										>
											Resetear contraseña
										</button>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan="4">No hay usuarios</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};

const styles = {
	inputs: "border-b-4 border-blue-500 bg-slate-200 rounded py-2 px-4",
	selected: "bg-blue-500 text-white hover:bg-blue-300",
	table: "text-m text-left text-gray-500 dark:text-gray-400",
	thead:
		"text-m text-gray-700 p-1 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400",
	th: "py-3 px-5 uppercase",
	tr: "hover:bg-gray-100",
	selected: "bg-blue-500 text-white",
};

export default GestionUsuariosPage;
