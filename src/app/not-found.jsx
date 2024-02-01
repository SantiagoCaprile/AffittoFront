import Image from "next/image";
import React from "react";

export default function NotFound() {
	return (
		<div className="flex flex-col flex-1 justify-center items-center">
			<h2 className="text-5xl font-mono font-medium z-10">
				Oops! No encontramos lo que buscabas
			</h2>
			<Image
				src={"/images/404.svg"}
				alt="404"
				width={500}
				height={500}
				className="p-5"
			/>
			<a
				href="/"
				className="bg-blue-900 text-white border-2 border-blue-500 px-16 py-2 rounded-full text-xl hover:bg-blue-700 transition-all active:translate-y-1"
			>
				Volver al inicio
			</a>
		</div>
	);
}
