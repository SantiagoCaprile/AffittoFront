"use client";
import React, { useEffect, useState } from "react";
import PropiedadForm from "@/components/PropiedadForm/page";

export default function EditarPropiedadPage() {
	const [id, setId] = useState("");
	useEffect(() => {
		setId(document.location.pathname.split("/")[2]);
	}, []);

	return (
		<div className="flex flex-1 justify-center items-center bg-[#E8EFFF] p-4">
			<PropiedadForm propiedadId={id} />
		</div>
	);
}
