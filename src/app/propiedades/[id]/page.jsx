"use client";
import React from "react";
import NextImage from "next/image";
import { useState, useEffect } from "react";
import { Pencil, ChevronLeft } from "lucide-react";
import Link from "next/link";
import Propiedad from "@/classes/Propiedad";
import CargarPago from "@/components/CargarPago/page";
import SelectorClientes from "@/components/SelectorClientes/page";
import OperacionNueva from "@/components/OperacionNueva/page";
import OperacionInfo from "@/components/OperacionInfo/page";
import TasacionInfo from "@/components/TasacionInfo/page";
import PosiblesInteresados from "@/components/PosiblesInteresados/page";
import Map from "@/components/Map";

const images = [
	"/images/house1.webp",
	"/images/house2.webp",
	"/images/house3.webp",
];

const tasacion = {
	fecha_visita: "2021-10-12",
	fecha_tasacion: "2021-10-12",
	valor: 100000,
	moneda: "USD",
	observaciones: "El tasador dijo que estaba en buen estado",
	motivo: "Conocer el valor",
	id: "1",
	inmueble_id: "1",
	antiguedad: "10-20",
	nombre_tasador: "Juan Perez",
	matricula: "4444444",
	solicitante_id: "1",
};

const clientesInteresados = [
	{
		_id: "1",
		nombre_razon_social: "Juan Perez",
		celular: "3512345678",
		email: "pepe",
		cuit: "	20155555551",
		operacion: "Alquiler",
	},
	{
		_id: "2",
		nombre_razon_social: "Jose Gomez",
		celular: "3512345678",
		email: "pepe",
		cuit: "	20155555551",
		operacion: "Venta",
	},
	{
		_id: "3",
		nombre_razon_social: "Maria Rodriguez",
		celular: "3512345678",
		email: "pepe",
		cuit: "	20155555551",
		operacion: "Alquiler",
	},
];

//datos que debe tener
//domicilio, localidad, tipo de propiedad, superficie, descripcion
//precio, estado actual
//boton de alquilar, boton de vender, boton de editar, boton de señar, boton de volver

const InfoPropiedadPage = () => {
	const [imagenSeleccionada, setImagenSeleccionada] = useState(0);
	const [propiedad, setPropiedad] = useState({});
	const [agregarPago, setAgregarPago] = useState(false);
	const [verOperaciones, setverOperaciones] = useState(false);
	const [operacionSeleccionada, setOperacionSeleccionada] = useState(null);
	const [operaciones, setOperaciones] = useState([]);

	useEffect(() => {
		const _id = document.location.pathname.split("/")[2];
		async function fetchData() {
			const propiedad = await Propiedad.buscarPropiedad(_id);
			setPropiedad(propiedad);
			setOperaciones(propiedad.operaciones);
			console.log(propiedad);
		}
		fetchData();
	}, []);

	const handleImageClick = (index) => {
		setImagenSeleccionada(index);
	};

	const toggleOperacionSeleccionada = (operacion) => {
		operacionSeleccionada === operacion
			? setOperacionSeleccionada(null)
			: setOperacionSeleccionada(operacion);
	};

	return (
		<div className="flex flex-1 flex-col justify-center items-center bg-[#E8EFFF] p-4">
			<div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-3/4">
				<div className="flex justify-between mb-4">
					<h2 className="text-2xl font-bold mb-4">Información de Propiedad</h2>
					<div className="flex gap-2">
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
							<span>
								{propiedad.domicilio?.calle ? propiedad.domicilio?.calle : ""}{" "}
								{propiedad.domicilio?.altura ? propiedad.domicilio?.altura : ""}{" "}
								{propiedad.domicilio?.piso ? propiedad.domicilio?.piso : ""}{" "}
								{propiedad.domicilio?.dpto ? propiedad.domicilio?.dpto : ""}
							</span>
						</div>
						<div className="mb-2 w-1/2">
							<label className="block font-bold">Localidad:</label>
							<span>{propiedad.domicilio?.localidad}</span>
						</div>
						<div className="mb-2 w-1/2">
							<label className="block font-bold">Tipo de Propiedad:</label>
							<span>{propiedad.tipo}</span>
						</div>
						<div className="mb-2 w-1/2">
							<label className="block font-bold">Superficie:</label>
							<span>{propiedad.dimension} m2</span>
						</div>
						<div className="mb-2 w-1/2">
							<label className="block font-bold">Operaciones:</label>
							{
								operaciones?.filter((op) => op.tipo === "Venta").length
							} Ventas,{" "}
							{operaciones?.filter((op) => op.tipo === "Alquiler").length}{" "}
							Alquileres
						</div>
						<div className="mb-2 w-1/2">
							<label className="block font-bold">Estado:</label>
							<span>{propiedad.estado}</span>
						</div>
						<div className="mb-2 w-full">
							<label className="block font-bold">Descripción:</label>
							<span>{propiedad.descripcion}</span>
						</div>
						<div className="flex gap-4 items-center pb-4">
							<button
								className="bg-orange-500 hover:bg-orange-600 transition-all text-white px-4 py-2 rounded-md"
								onClick={() => setverOperaciones(!verOperaciones)}
							>
								{verOperaciones ? "Ocultar Operaciones" : "Ver Operaciones"}
							</button>
							<button
								disabled={propiedad.estado !== "Disponible"}
								className={
									styles.button +
									(propiedad.estado !== "Disponible"
										? styles.disabled
										: "bg-green-500 hover:bg-green-600")
								}
								onClick={() =>
									window.location.replace(`/crearContrato/${propiedad._id}`)
								}
							>
								Nuevo Contrato
							</button>
							<button className="bg-blue-500 hover:bg-blue-600 transition-all text-white px-4 py-2 rounded-md">
								Vender
							</button>
							<button
								disabled={propiedad.estado !== "Disponible"}
								className={
									styles.button +
									(propiedad.estado !== "Disponible"
										? styles.disabled
										: "bg-yellow-500 hover:bg-yellow-600")
								}
								onClick={() => setAgregarPago(!agregarPago)}
							>
								Señar
							</button>
						</div>
					</div>
				</div>
			</div>
			{verOperaciones && (
				<div className="flex flex-1 justify-center px-8 pt-6 pb-8 mb-4 gap-2">
					{operacionSeleccionada && (
						<OperacionNueva
							operacion={operacionSeleccionada}
							idProp={propiedad._id}
							fuerzaUpdate={() => {
								Propiedad.buscarPropiedad(propiedad._id).then((prop) => {
									setOperaciones(prop.operaciones);
									setOperacionSeleccionada(null);
								});
							}}
						/>
					)}
					<div className="flex gap-1 flex-wrap justify-center h-fit w-2/3">
						{operaciones?.map((operacion, index) => (
							<OperacionInfo
								key={index}
								onClick={
									operacionSeleccionada
										? () => setOperacionSeleccionada(null)
										: () => toggleOperacionSeleccionada(operacion)
								}
								operacion={operacion}
							/>
						))}
						<button
							className="bg-green-500 hover:bg-green-600 text-clip h-[250px] w-[270px] transition-all text-white px-4 py-4	 rounded-md"
							onClick={() => {
								operacionSeleccionada
									? setOperacionSeleccionada(null)
									: setOperacionSeleccionada({});
							}}
						>
							Agregar Operación
						</button>
					</div>
				</div>
			)}
			{agregarPago && (
				<div className={`flex flex-1 px-8 pt-6 pb-8 mb-4 gap-2`}>
					<SelectorClientes />
					<CargarPago />
				</div>
			)}
			<div className="w-2/3 h-[400px] bg-black">
				{propiedad.ubicacion?.lat ? (
					<Map
						center={[propiedad.ubicacion.lat, propiedad.ubicacion.lng]}
						zoom={16}
					>
						{({ TileLayer, Marker, Popup }) => (
							<>
								<TileLayer
									url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
									attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
								/>
								<Marker
									position={[propiedad.ubicacion.lat, propiedad.ubicacion.lng]}
								>
									<Popup>
										{propiedad.domicilio?.calle} {propiedad.domicilio?.altura},{" "}
										{propiedad.domicilio?.localidad}
									</Popup>
								</Marker>
							</>
						)}
					</Map>
				) : (
					<div className="flex justify-center items-center h-full">
						<h2 className="text-2xl font-bold text-white">Cargando Mapa...</h2>
					</div>
				)}
			</div>
			<div className="flex flex-col gap-2 p-2">
				{propiedad.tasaciones?.map((tasacion, index) => (
					<TasacionInfo key={index} tasacion={tasacion} />
				))}
				<TasacionInfo tasacion={tasacion} />

				<button
					className="bg-green-500 hover:bg-green-600 transition-all text-white px-4 py-2 rounded-md"
					onClick={() =>
						window.location.replace(`/crearTasacion/${propiedad._id}`)
					}
				>
					Agregar Tasación
				</button>
			</div>
			<PosiblesInteresados clientes={clientesInteresados} />
		</div>
	);
};

const styles = {
	button: "transition-all text-white px-4 py-2 rounded-md ",
	disabled: "bg-gray-500 cursor-not-allowed",
};

export default InfoPropiedadPage;
