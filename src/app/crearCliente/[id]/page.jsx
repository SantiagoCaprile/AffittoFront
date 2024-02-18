"use client";
import React, { useEffect, useState } from "react";
import ClienteForm from "@/components/ClienteForm/page";

export default function EditarClientePage() {
	const [id, setId] = useState("");
	useEffect(() => {
		setId(document.location.pathname.split("/")[2]);
	}, []);

	return (
		<div className="flex flex-1 justify-center items-center bg-[#E8EFFF] p-4">
			<ClienteForm clienteCuit={id} />
		</div>
	);
}
