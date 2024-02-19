"use client";
import React, { useEffect, useState } from "react";
import TasacionForm from "@/components/TasacionForm/page";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function TasacionPage() {
	const [propiedadId, setPropiedadId] = useState(null);

	useEffect(() => {
		const id = window.location.pathname.split("/")[2];
		setPropiedadId(id);
	}, []);

	return (
		<div className="flex flex-1 justify-center items-center bg-[#E8EFFF] pt-4 gap-2">
			<Link
				href={`/propiedades/${propiedadId}/tasaciones`}
				className="bg-blue-400 hover:bg-blue-600 transition-all text-white px-4 py-2 rounded-md cursor-pointer flex items-center gap-2"
			>
				<ChevronLeft size={20} />
				<span>Volver a tasaciones</span>
			</Link>
			<TasacionForm propiedadId={propiedadId} />
		</div>
	);
}
