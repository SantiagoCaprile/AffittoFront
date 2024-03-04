"use client";
import React, { useState, useEffect } from "react";
import { Check, Trash2 } from "lucide-react";
import Usuario from "@/classes/Usuario";

const GestionUsuariosPage = () => {
	const [users, setUsers] = useState([]);
	const [filteredUsers, setFilteredUsers] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [rol, setRol] = useState({
		loading: false,
		confirm: "",
		index: 0,
		rolSelected: "",
	});

	const filterUsers = () => {
		const filtered = users.filter((user) =>
			user.nombre.toLowerCase().includes(searchTerm.toLowerCase())
		);
		setFilteredUsers(filtered);
	};

	useEffect(() => {
		Usuario.fetchUsers().then((data) => {
			setUsers(data);
			setFilteredUsers(data);
		});
	}, []);

	const handleUpdateRol = async (user, index) => {
		setRol({ ...rol, loading: true });
		await Usuario.updateRole(user.nombre, rol.rolSelected).then((res) => {
			if (res) {
				setRol({ ...rol, confirm: false });
				setFilteredUsers((prev) => {
					const updated = [...prev];
					updated[index].rol = rol.rolSelected;
					return updated;
				});
				setUsers((prev) => {
					const updated = [...prev];
					updated[index].rol = rol.rolSelected;
					return updated;
				});
			}
		});
	};

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
							<th className={styles.th}>Acciones</th>
						</tr>
					</thead>
					<tbody>
						{filteredUsers ? (
							filteredUsers.map((user, index) => (
								<tr key={user._id} className={styles.tr}>
									<td>{user.nombre ?? "@example.com"}</td>
									<td className="flex gap-1">
										<select
											defaultValue={user.rol ?? ""}
											disabled={rol.loading}
											onChange={(e) => {
												setRol({
													confirm: true,
													index: index,
													loading: false,
													rolSelected: e.target.value,
												});
											}}
											value={
												rol.confirm && rol.index == index
													? rol.rolSelected
													: user.rol
											}
											className={
												styles.inputs + " " + (!user.rol && "text-red-500")
											}
										>
											{Object.values(Usuario.USUARIO_ROLES).map((rol) => (
												<option key={rol} value={rol}>
													{rol}
												</option>
											))}
											<option value="">No asignado</option>
										</select>
										{rol.confirm && rol.index == index && (
											<>
												<button
													onClick={() => handleUpdateRol(user, index)}
													className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
												>
													<Check />
												</button>
												<button
													onClick={() => {
														setRol({ ...rol, confirm: false, loading: false });
													}}
													className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
												>
													<Trash2 />
												</button>
											</>
										)}
									</td>
									<td>
										<button
											onClick={() => Usuario.resetPassword(user._id)}
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
