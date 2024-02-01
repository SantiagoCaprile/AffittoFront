"use client";
import Nav from "../components/Nav/page";
import "./globals.css";
import { Inter } from "next/font/google";
import { Provider } from "react-redux";
import store from "./store/configureStore";
import { SessionProvider } from "next-auth/react";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
	return (
		<SessionProvider>
			<Provider store={store}>
				<html lang="es">
					<body className={inter.className + " flex flex-col min-h-screen"}>
						<Nav />
						<main className="flex flex-col flex-1">{children}</main>
						<footer className="flex flex-col  justify-evenly mt-auto bg-slate-700">
							<p className="text-center text-gray-500 text-xs p-1">
								&copy;{new Date().getFullYear()} Affitto &mdash; Todos los
								derechos reservados
							</p>
						</footer>
					</body>
				</html>
			</Provider>
		</SessionProvider>
	);
}
