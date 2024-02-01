import React from "react";
import NextImage from "next/image";
import { Pencil, ChevronLeft } from "lucide-react";
import Link from "next/link";

const InfoClientePage = () => {
	return (
		<div className="flex flex-1 justify-center items-center bg-[#E8EFFF] p-4">
			<div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-[800px] w-2/3">
				<div className="flex justify-between mb-4">
					<h2 className="text-2xl font-bold mb-4">Información del Cliente</h2>
					<button className="flex gap-2 bg-blue-500 hover:bg-blue-600 transition-all text-white px-4 py-2 rounded-md items-center justify-center">
						<Pencil size={20} />
						Actualizar Datos
					</button>
					<Link
						href="/clientes"
						className="flex gap-2 bg-blue-300 hover:bg-blue-500 transition-all text-white px-4 py-2 rounded-md items-center justify-center"
					>
						<ChevronLeft size={20} />
						Volver
					</Link>
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
						<div className="mb-2 w-1/2">
							<label className="block font-bold">Nombre:</label>
							<span>John Doe</span>
						</div>
						<div className="mb-2 w-1/2">
							<label className="block font-bold">CUIT/CUIL:</label>
							<span>20-12345678-9</span>
						</div>
						<div className="mb-2 w-1/2">
							<label className="block font-bold">Domicilio:</label>
							<span>Calle Falsa 123</span>
						</div>
						<div className="mb-2 w-1/2">
							<label className="block font-bold">Localidad:</label>
							<span>Springfield</span>
						</div>
						<div className="mb-2 w-1/2">
							<label className="block font-bold">Email:</label>
							<span>
								<a href="mailto:john@affitto.com" className="text-blue-500">
									john@affitto.com
								</a>
							</span>
						</div>
						<div className="mb-2 w-1/2">
							<label className="block font-bold">Celular:</label>
							<span>123-456-7890</span>
						</div>
						<div className="mb-2 w-1/2">
							<label className="block font-bold">Telefono:</label>
							<span>123-456-7890</span>
						</div>
						<div className="mb-2 w-1/2">
							<label className="block font-bold">
								Condición frente al IVA:
							</label>
							<span>Responsable Inscripto</span>
						</div>
					</div>
				</div>
				<hr className="my-4" />
				<table className="w-full mt-4">
					<thead>
						<tr>
							<th>Propiedad</th>
							<th>Localidad</th>
							<th>Operación</th>
							<th>Estado</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Casa 3 dormitorios</td>
							<td>Springfield</td>
							<td>Alquiler</td>
							<td>Disponible</td>
						</tr>
						<tr>
							<td>Departamento 2 dormitorios</td>
							<td>Shelbyville</td>
							<td>Venta</td>
							<td>Reservada</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default InfoClientePage;
