"use client";
import React from "react";
import NextImage from "next/image";
import { useState } from "react";
import { Pencil, ChevronLeft } from "lucide-react";
import Link from "next/link";

const images = [
	"/images/house1.webp",
	"/images/house2.webp",
	"/images/house3.webp",
];

//datos que debe tener
//domicilio, localidad, tipo de propiedad, superficie, descripcion
//precio, estado actual
//boton de alquilar, boton de vender, boton de editar, boton de señar, boton de volver

const InfoPropiedadPage = () => {
	const [imagenSeleccionada, setImagenSeleccionada] = useState(0);

	const handleImageClick = (index) => {
		setImagenSeleccionada(index);
	};

	return (
		<div className="flex flex-1 justify-center items-center bg-[#E8EFFF] p-4">
			<div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-3/4">
				<div className="flex justify-between mb-4">
					<h2 className="text-2xl font-bold mb-4">Información de Propiedad</h2>
					<Link
						href={"/propiedades/editar"}
						className="flex gap-2 bg-blue-500 hover:bg-blue-600 transition-all text-white px-4 py-2 rounded-md items-center justify-center"
					>
						<Pencil size={20} />
						Editar
					</Link>
					<Link
						href="/propiedades"
						className="flex gap-2 bg-blue-300 hover:bg-blue-500 transition-all text-white px-4 py-2 rounded-md items-center justify-center"
					>
						<ChevronLeft size={20} />
						Volver
					</Link>
				</div>
				<div className="flex items-center">
					<div className="flex flex-col gap-2">
						<div className="m-2 flex flex-col gap-2">
							<div className="min-w-[616px] h-[400px] pb-2 flex justify-start">
								<NextImage
									src={
										imagenSeleccionada ? images[imagenSeleccionada] : images[0]
									}
									alt={"house"}
									key={0}
									width={616}
									height={500}
									className="rounded-lg cursor-pointer transition-all ease-in-out duration-300"
									style={{ objectFit: "cover" }}
								/>
							</div>
							<div className="flex flex-wrap mt-2 gap-2">
								{images.map((image, index) => (
									<NextImage
										src={image}
										alt={"house"}
										key={index}
										width={200}
										height={250}
										className={
											"rounded-lg cursor-pointer transition-opacity duration-300 " +
											(imagenSeleccionada == index
												? "opacity-100"
												: "opacity-50")
										}
										style={{ objectFit: "cover" }}
										onClick={() => handleImageClick(index)}
									/>
								))}
							</div>
						</div>
					</div>
					<div className="flex flex-wrap justify-center items-end">
						<div className="mb-2 w-1/2">
							<label className="block font-bold">Domicilio:</label>
							<span>Calle Falsa 123</span>
						</div>
						<div className="mb-2 w-1/2">
							<label className="block font-bold">Localidad:</label>
							<span>Springfield</span>
						</div>
						<div className="mb-2 w-1/2">
							<label className="block font-bold">Tipo de Propiedad:</label>
							<span>Casa</span>
						</div>
						<div className="mb-2 w-1/2">
							<label className="block font-bold">Superficie:</label>
							<span>200 m2</span>
						</div>
						<div className="mb-2 w-1/2">
							<label className="block font-bold">Precio:</label>
							<span>$ 200.000</span>
						</div>
						<div className="mb-2 w-1/2">
							<label className="block font-bold">Estado:</label>
							<span>Disponible</span>
						</div>
						<div className="mb-2 w-full">
							<label className="block font-bold">Descripción:</label>
							<span>Esta es una casa muy linda</span>
						</div>
						<div className="flex gap-4 items-center pb-4">
							<button className="bg-green-500 hover:bg-green-600 transition-all text-white px-4 py-2 rounded-md">
								Alquilar
							</button>
							<button className="bg-blue-500 hover:bg-blue-600 transition-all text-white px-4 py-2 rounded-md">
								Vender
							</button>
							<button className="bg-yellow-500 hover:bg-yellow-600 transition-all text-white px-4 py-2 rounded-md">
								Señar
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default InfoPropiedadPage;
