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
					const user = await Usuario.verifyCredentials(credentials);
					if (user.user || user.valid) {
						console.log(user);
						// Return an object with the user's name, email, and role
						return {
							...user,
							id: user.id ?? "1234",
							name: user.user,
							email: credentials.email,
							role: user.role ?? "user",
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
			if (session?.user) session.user.role = token.role;
			return session;
		},
	},
};
