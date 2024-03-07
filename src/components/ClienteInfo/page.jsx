import React from "react";
import NextImage from "next/image";
import { useRouter } from "next/navigation";

export default function InfoCliente({ cliente }) {
	const router = useRouter();
	if (!cliente) {
		return <div>Cargando...</div>;
	}

	return (
		<div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-[800px] w-2/3">
			<div className="flex justify-between mb-4">
				<h2 className="text-2xl font-bold mb-4">Información del Cliente</h2>
			</div>
			<div className="flex gap-4 items-start">
				<NextImage
					src="/images/user.jpg"
					alt={"user"}
					width={200}
					height={200}
					className="rounded-lg"
					style={{ objectFit: "cover" }}
				/>
				<div className="flex flex-wrap">
					<label className="block font-bold">Nombre:</label>
					<div className="mb-2 w-1/2">
						<span>{cliente.nombre_razon_social}</span>
					</div>
					<div className="mb-2 w-1/2">
						<label className="block font-bold">CUIT/CUIL:</label>
						<span>{cliente.cuit}</span>
					</div>
					<div className="mb-2 w-1/2">
						<label className="block font-bold">Domicilio:</label>
						<span>
							{(cliente.domicilio?.calle ?? "") +
								" " +
								(cliente.domicilio?.altura ?? "") +
								" " +
								(cliente.domicilio?.piso ?? "") +
								" " +
								(cliente.domicilio?.dpto ?? "")}
						</span>
					</div>
					<div className="mb-2 w-1/2">
						<label className="block font-bold">Localidad:</label>
						<span>{cliente.domicilio?.localidad}</span>
					</div>
					<div className="mb-2 w-1/2">
						<label className="block font-bold">Email:</label>
						<span>
							<a href={`mailto:${cliente.email}`} className="text-blue-500">
								{cliente.email}
							</a>
						</span>
					</div>
					<div className="mb-2 w-1/2">
						<label className="block font-bold">Celular:</label>
						<span>{cliente.celular}</span>
					</div>
					<div className="mb-2 w-1/2">
						<label className="block font-bold">Telefono:</label>
						<span>{cliente.telefono}</span>
					</div>
					<div className="mb-2 w-1/2">
						<label className="block font-bold">Condición frente al IVA:</label>
						<span>{cliente.condicion_iva}</span>
					</div>
				</div>
			</div>
			<hr className="my-4" />
			<table className="w-full mt-4">
				<thead>
					<tr className="bg-gray-200">
						<th>Tipo</th>
						<th>Propiedad</th>
						<th>Localidad</th>
						<th>Estado</th>
						<th>Rol</th>
					</tr>
				</thead>
				{
					<tbody className="divide-y divide-gray-200">
						{cliente.propiedades?.map((propiedad, index) => (
							<tr
								className="cursor-pointer hover:bg-gray-100 transition-all p-2 text-center"
								key={index}
								onDoubleClick={() =>
									router.push(`/propiedades/${propiedad.id._id}`)
								}
							>
								<td>{propiedad.id.tipo}</td>
								<td>
									{propiedad.id.domicilio.calle +
										" " +
										propiedad.id.domicilio.altura}
								</td>
								<td>{propiedad.id.domicilio.localidad}</td>
								<td>{propiedad.id.estado}</td>
								<td>{propiedad.rol}</td>
							</tr>
						))}
						{cliente.propiedades?.length === 0 && (
							<tr>
								<td colSpan="4" className="text-center text-red-500">
									No hay propiedades asociadas a este cliente
								</td>
							</tr>
						)}
					</tbody>
				}
			</table>
		</div>
	);
}
