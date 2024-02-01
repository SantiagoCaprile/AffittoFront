// export { default } from "next-auth/middleware";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
	function middleware(req) {
		// if (
		//   req.nextUrl.pathname.startsWith("/createUser") &&
		//   req.nextauth.token.role !== "admin"
		// ) {
		//   console.log("no es admin, no puede crear users");
		//   return NextResponse.rewrite(new URL("/denied", req.url));
		// }
		if (
			req.nextUrl.pathname.startsWith("/propiedades") &&
			!req.nextauth.token.role.includes("user")
		) {
			console.log("no es user");
			return NextResponse.rewrite(new URL("/api/auth/signin", req.url));
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
	matcher: ["/propiedades", "/clientes"],
};
