class Usuario {
	static URL = "http://localhost:3000/usuarios";
	static USUARIO_ROLES = {
		ADMIN: "Administrador",
		EMPLEADO: "Empleado",
		JEFE: "Jefe",
		AUDITOR: "Auditor",
	};
	constructor(nombre, apellido, email, password) {
		this.nombre = nombre;
		this.apellido = apellido;
		this.email = email;
		this.password = password;
	}

	static async fetchUsers() {
		try {
			const response = await fetch(this.URL);
			const data = await response.json();
			return data.data;
		} catch (error) {
			console.error("Error fetching users:", error);
		}
	}

	static async resetPassword(userId) {
		fetch(`${this.URL}/restart`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ id: userId }),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.error) {
					alert(data.error);
					return;
				}
				alert("Contraseña reiniciada");
			})
			.catch((error) => {
				console.error("Error resetting password:", error);
				alert("Error al reiniciar contraseña");
			});
	}

	static async verifyCredentials(user) {
		const response = await fetch(this.URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				nombre: user.email,
				password: user.password,
			}),
		}).catch((err) => {
			console.log(err);
		});
		return await response.json();
	}

	static async updateRole(email, role) {
		const res = await fetch(`${this.URL}/${email}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ rol: role }),
		})
			.then(() => true)
			.catch((error) => {
				console.error("Error updating role:", error);
				alert("Error al actualizar rol");
				return false;
			});
		return res;
	}

	static async changeUserEstadoA(email, activo) {
		const res = await fetch(`${this.URL}/${email}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ activo: activo }),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.error) {
					alert(data.error);
					return false;
				}
				return true;
			})
			.catch((error) => {
				console.error("Error updating user:", error);
				alert("Error al actualizar usuario");
				return false;
			});
		return res;
	}
}

export default Usuario;
