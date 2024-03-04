import CredentialsProvider from "next-auth/providers/credentials";
import Usuario from "@/classes/Usuario";

export const options = {
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: {
					label: "Email",
					type: "text",
					placeholder: "@example.com",
				},
				password: {
					label: "Password",
					type: "password",
					placeholder: "*****",
				},
			},
			async authorize(credentials) {
				// Call the API to verify the credentials and get the user object
				try {
					const data = await Usuario.verifyCredentials(credentials);
					if (data.valid) {
						console.log("user data", data);
						// Return an object with the user's name, email, and role
						return {
							...data.user,
							name: data.user.nombre.split("@")[0],
							email: data.user.nombre,
							role: data.user.rol ?? "no role",
						};
					} else {
						return null;
					}
				} catch (e) {
					console.log(e);
					return null;
				}
			},
		}),
	],
	pages: {
		signIn: "/login",
		error: "/login",
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) token.role = user.role;
			return token;
		},
		async session({ session, token }) {
			if (session?.user) {
				session.user.role = token.role;
				session.user.name = token.name;
			}
			return session;
		},
	},
};
