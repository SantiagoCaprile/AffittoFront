// export { default } from "next-auth/middleware";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const USUARIO_ROLES = {
	ADMIN: "Administrador",
	EMPLEADO: "Empleado",
	JEFE: "Jefe",
	AUDITOR: "Auditor",
};

export default withAuth(
	function middleware(req) {
		if (
			req.nextUrl.pathname.startsWith("/gestionUsuarios") &&
			req.nextauth.token.role !== USUARIO_ROLES.ADMIN
		) {
			return NextResponse.rewrite(
				new URL("/api/auth/signin", req.nextUrl.origin)
			);
		}
		if (
			req.nextUrl.pathname.startsWith("/reportes") &&
			![USUARIO_ROLES.JEFE, USUARIO_ROLES.ADMIN].includes(
				req.nextauth.token.role
			)
		) {
			return NextResponse.rewrite(
				new URL("/api/auth/signin", req.nextUrl.origin)
			);
		}
		if (
			req.nextUrl.pathname.startsWith("/auditoria") &&
			![
				USUARIO_ROLES.AUDITOR,
				USUARIO_ROLES.ADMIN,
				USUARIO_ROLES.JEFE,
			].includes(req.nextauth.token.role)
		) {
			return NextResponse.rewrite(
				new URL("/api/auth/signin", req.nextUrl.origin)
			);
		}
	},
	{
		callbacks: {
			authorized: ({ token }) => {
				console.log("authorized", token);
				return !!token;
			},
		},
	}
);

// Applies next-auth only to matching routes - can be regex
export const config = {
	matcher: [
		"/propiedades",
		"/clientes",
		"/gestionUsuarios",
		"/reportes",
		"/auditoria",
	],
};
