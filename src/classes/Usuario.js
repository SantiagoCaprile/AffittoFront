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
		fetch(`${this.URL}/resetPassword`, {
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
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				return true;
			})
			.catch((error) => {
				console.error("Error updating role:", error);
				alert("Error al actualizar rol");
				return false;
			});
		return res;
	}
}

export default Usuario;
