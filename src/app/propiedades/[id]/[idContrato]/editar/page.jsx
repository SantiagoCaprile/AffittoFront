"use client";
import React, { useEffect, useState } from "react";
import ContratoForm from "@/components/ContratoForm/page";

export default function EditarContratoPage() {
	const [id, setId] = useState("");
	useEffect(() => {
		setId(document.location.pathname.split("/")[3]);
	}, []);

	return (
		<div className="flex flex-1 justify-center items-center bg-[#E8EFFF] p-4">
			<ContratoForm contratoId={id} />
		</div>
	);
}
